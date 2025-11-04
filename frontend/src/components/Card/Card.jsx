import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ImagePopup from "../Popup/ImagePopup/ImagePopup";

export default function Card({
  card,
  handleOpenPopup,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link } = card;

  const imageComponent = {
    children: <ImagePopup card={card} />,
  };

  const isLiked = card.likes?.some((userId) => userId === currentUser?._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <div className="card__elements">
        <button
          className="card__delete-button"
          onClick={handleDeleteClick}
        ></button>
        <img
          className="card__image"
          src={link}
          alt=""
          onClick={() => handleOpenPopup(imageComponent)}
        />
        <div className="card__description">
          <p className="card__title">{name}</p>
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
        </div>
      </div>
    </li>
  );
}
