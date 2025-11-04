import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

export default function NewCard({ onAddPlaceSubmit, handleClosePopup }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
    setName("");
    setLink("");
  };

  return (
    <form
      noValidate
      id="card__form"
      name="form"
      className="popup__form"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__form-fieldset">
        <label className="addpopup__form-first-label" htmlFor="title">
          <input
            className="popup__form-input"
            placeholder="Título"
            type="text"
            name="name"
            id="title"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="error-message"></p>
        </label>
        <label className="addpopup__form-second-label" htmlFor="link">
          <input
            className="popup__form-input"
            placeholder="Link de imagem"
            type="url"
            name="link"
            id="link"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <p className="error-message"></p>
        </label>
      </fieldset>
      <button className="popup__form-save" type="submit">
        Crie
      </button>
    </form>
  );
}
