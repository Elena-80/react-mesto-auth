import React from "react";
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ cards, email, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>

    <main>
      <section className="profile">
       <div className="profile__avatar-container"> 
          <img
            className="profile__avatar"
            alt ='Аватар пользователя'
            src = {currentUser.avatar}
          />

          <button
            className="profile__avatar-edit"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__block">
           <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              aria-label="Редактирование профиля пользователя"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
          </div>
          <h2 className="profile__profession">{currentUser.about}</h2>
        </div>
        <button
          type="button"
          aria-label="Добавление новых фотографий"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>

      <section className="photo-grid">
        <ul className="photo-grid__container">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                onCardClick={onCardClick}
                card={card}
                onCardLike={onCardLike}
                onCardDelete = {onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
   </> 
  );
}

export default Main;
