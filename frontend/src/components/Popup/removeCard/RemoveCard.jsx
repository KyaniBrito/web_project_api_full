export default function RemoveCard({ onConfirm, cardToDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm(cardToDelete);
  }

  return (
    <form className="popup__form" name="confirm-form">
      <button onClick={handleSubmit} className="popup__form-save" type="submit">
        Sim
      </button>
    </form>
  );
}
