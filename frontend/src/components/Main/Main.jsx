import iconEditImage from "../../images/Vector.png";
import iconEditProfile from "../../images/Edit Button.png";
import iconAddButton from "../../images/add button.png";
import { useContext } from "react";
import Popup from "../Popup/Popup";
import NewCard from "../Popup/NewCard/NewCard";
import EditAvatar from "../Popup/EditAvatar/EditAvatar";
import EditProfile from "../Popup/EditProfile/EditProfile";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main({
  cards,
  onCardLike,
  onCardDelete,
  popup,
  handleOpenPopup,
  handleClosePopup,
  handleAddPlaceSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const newCardPopup = {
    title: "Adicionar card",
    children: (
      <NewCard
        onAddPlaceSubmit={handleAddPlaceSubmit}
        handleClosePopup={handleClosePopup}
      />
    ),
  };
  const editAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar handleClosePopup={handleClosePopup} />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile handleClosePopup={handleClosePopup} />,
  };

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={currentUser?.avatar}
            alt={currentUser?.name || "Avatar"}
          />
          <button
            className="profile__avatar-edit"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          >
            <img
              className="profile__avatar-edit-icon"
              src={iconEditImage}
              alt="sinal de edição do avatar"
            />
          </button>
        </div>

        <div className="profile__info">
          <div className="profile__info-line">
            <h4 className="profile__info-name">{currentUser?.name}</h4>
            <button
              className="profile__info-edit"
              onClick={() => handleOpenPopup(editProfilePopup)}
            >
              <img src={iconEditProfile} alt="sinal de edição" />
            </button>
          </div>
          <h6 className="profile__info-occupation">{currentUser?.about}</h6>
        </div>
        <button
          className="profile__add-button"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img
            className="profile__add-button-icon"
            src={iconAddButton}
            alt="sinal de soma"
          />
        </button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
