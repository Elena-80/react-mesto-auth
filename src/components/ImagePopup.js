import React from "react";

function ImagePopup({ card, onClose }) {

  return (
    <div
      className={`${
        card?.link ? "popup popup-zoom popup_opened" : "popup popup-zoom"
      }`}
    >
      <div className="popup__picture">
        <button
          type="button"
          aria-label="Закрытие окна увеличения картинки"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img
          className="popup-zoom__image"
          src={`${card?.link}`}
          alt={`изображение: ${card?.name}`}
        />
        <h2 className="popup-zoom__title">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
