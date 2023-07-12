import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup( props ) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); 

      function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({name, about: description});
      } 

      function handleChangeName(e) {
        setName(e.target.value);
      }

      function handleChangeDescription(e) {
        setDescription(e.target.value);
      }

   return( 
    <PopupWithForm
          props={{
            title: "Редактировать профиль",
            name: "edit",
            isOpen: props.isOpen,
            onClose: props.onClose,
            onSubmit: handleSubmit,
            buttonTitle: 'Сохранить',
            children: (
              <>
                <input
                  type="text"
                  className="popup__input popup__input_type_name"
                  id="name"
                  name="name"
                  placeholder="Имя"
                  required
                  minLength="2"
                  maxLength="40"
                  onChange={handleChangeName}
                  value={name || ''}
                />
                <span className="popup__input-error name-error"></span>
                <input
                  type="text"
                  className="popup__input popup__input_type_profession"
                  id="profession"
                  name="about"
                  placeholder="Профессия"
                  required
                  minLength="2"
                  maxLength="200"
                  onChange={handleChangeDescription}
                  value={description || ''}
                />
                <span className="popup__input-error profession-error"></span>
              </>
            ),
          }}
        />    
   )
        }

export default EditProfilePopup;