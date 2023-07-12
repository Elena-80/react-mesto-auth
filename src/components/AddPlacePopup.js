import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup (props) {
    const nameRef = React.useRef(); 
    const linkRef = React.useRef(); 

    React.useEffect(() => {
        nameRef.current.value = '';
        linkRef.current.value = '';
      }, [props.isOpen]); 


    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({name: nameRef.current.value, link: linkRef.current.value});
      } 


    return (

        <PopupWithForm
          props={{
            title: "Новое место",
            name: "photo",
            isOpen: props.isOpen,
            onClose: props.onClose,
            onSubmit: handleSubmit,
            buttonTitle: 'Создать',
            children: (
              <>
                <input
                  ref = {nameRef}
                  type="text"
                  className="popup__input popup__input_type_title"
                  id="title"
                  name="name"
                  placeholder="Название"
                  required
                  minLength="2"
                  maxLength="30"
                />
                <span className="popup__input-error title-error"></span>
                <input
                  ref = {linkRef}
                  type="url"
                  className="popup__input popup__input_type_link"
                  id="link"
                  name="link"
                  placeholder="Ссылка на картинку"
                  required
                />
                <span className="popup__input-error link-error"></span>
              </>
            ),
          }}
        />

    )
}

export default AddPlacePopup;