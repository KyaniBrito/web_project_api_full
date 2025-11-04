import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function EditProfile({ handleClosePopup }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
    handleClosePopup();
  };

  return (
    <form
      noValidate
      id="user__form"
      name="form"
      className="popup__form"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-fieldset">
        <label htmlFor="username" className="popup__form-first-label">
          <input
            className="popup__form-input"
            placeholder="Nome de usuário"
            type="text"
            id="username"
            name="name"
            minLength="2"
            maxLength="40"
            required
            value={name}
            onChange={handleNameChange}
          />
          <p className="error-message"></p>
        </label>
        <label htmlFor="bio" className="popup__form-second-label">
          <input
            className="popup__form-input"
            placeholder="Sobre mim"
            type="text"
            id="bio"
            name="about"
            minLength="2"
            maxLength="200"
            required
            value={description}
            onChange={handleDescriptionChange}
          />
          <p className="error-message"></p>
        </label>
      </fieldset>
      <button className="popup__form-save" type="submit">
        Salvar
      </button>
    </form>
  );
}
