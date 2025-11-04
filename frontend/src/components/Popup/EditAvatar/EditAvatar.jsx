import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function EditAvatar({ handleClosePopup }) {
  const avatarInputRef = useRef(); // cria a referência do input
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarInputRef.current.value, // pega o valor diretamente do input
    });

    handleClosePopup(); // fecha o popup
  };

  return (
    <form
      className="popup__form"
      id="avatar__form"
      name="form-avatar"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-fieldset">
        <input
          id="avatar-link"
          type="url"
          name="avatar"
          className="popup__form-input"
          placeholder="Link da imagem"
          required
          ref={avatarInputRef}
        />
        <span className="error-message" id="avatar-link-error"></span>
      </fieldset>
      <button className="popup__form-save" type="submit">
        Salvar
      </button>
    </form>
  );
}
