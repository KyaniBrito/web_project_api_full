export default function ImagePopup(props) {
  const { card } = props;

  return (
    <div className="popup__image-container">
      <img className="popup__image" src={card.link} alt={card.name} />
      <p className="popup__caption ">{card.name}</p>
    </div>
  );
}
