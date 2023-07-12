import React from "react";
import PopupWithForm from "./PopupWithForm";



function EditAvatarPopup( props ) {
    const avatarRef = React.useRef(); 

    React.useEffect(() => {
        avatarRef.current.value = '';
      }, [props.isOpen]); 

    function handleSubmit (evt) {
        evt.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
      }


   return( 

<PopupWithForm
            props={{
                title: "Обновить аватар",
                name: "avatar",
                isOpen: props.isOpen,
                onClose: props.onClose,
                onSubmit: handleSubmit,
                buttonTitle: 'Сохранить',
                children: (
                <>
                    <input
                    ref={avatarRef}
                    type="url"
                    className="popup__input popup__input_type_avatar"
                    id="avatar"
                    name="avatar"
                    placeholder="Ссылка на картинку профиля"
                    required
                    />
                    <span className="popup__input-error avatar-error"></span>
                </>
                ),
            }}
            /> )

        }

export default EditAvatarPopup;