import React from "react";

function InfoTooltip({ message, onClose }) {

return (
    <div className={`popup popup-info` + (message ? " popup_opened" : "")}>
        <div className="popup__container content__element">
        <p
            className={
            "popup-info__message" +
            (message
                ? message.isSuccess
                ? " popup-info__message_success"
                : " popup-info__message_fail"
                : "")
            }
        >
            {message ? message.text : " "}
        </p>
        
        <button
            type="button"
            aria-label="Закрытие окна информации о регистрации"
            className="popup__close-button"
            onClick={onClose}
        >  
        </button>
        </div>
    </div>    
    
    );
}

export default InfoTooltip;
