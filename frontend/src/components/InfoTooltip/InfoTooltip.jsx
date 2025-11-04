import React, { useEffect } from "react";
import successIcon from "../../images/Union.svg";
import errorIcon from "../../images/Error.svg";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  function handleOverlayClick(evt) {
    if (evt.target.classList.contains("tooltip_opened")) {
      onClose();
    }
  }
  return (
    <div
      className={`tooltip ${isOpen ? "tooltip_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="tooltip__container">
        <button
          className="tooltip__close"
          type="button"
          onClick={onClose}
          aria-label="Fechar"
        />
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Sucesso" : "Erro"}
          className="tooltip__icon"
        />
        <p className="tooltip__text">
          {isSuccess
            ? "Cadastro realizado com sucesso!"
            : "Ops! Algo deu errado, tente novamente."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
