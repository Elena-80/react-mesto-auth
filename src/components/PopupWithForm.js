

function PopupWithForm({props}) {
     return  (
        <div className= {`${props.isOpen ? `popup popup-${props.name} popup_opened` : `popup popup-${props.name}`}`}>
        <div className = "popup__container">
            <button  type="button" aria-label="Закрытие окна" className="popup__close-button" onClick={props.onClose}></button>
            <h2 className = "popup__title">{props.title}</h2>
            <form className = "popup__form" name = {`popup-${props.name}__form`} onSubmit = {props.onSubmit}>
                <fieldset className = "popup__fieldset">
                    {props.children}
                </fieldset>
                <button type="submit" className="popup__submit-button popup-edit__submit-button">{props.buttonTitle}</button>
            </form>
        </div>
        </div>
        )
}

export default PopupWithForm;