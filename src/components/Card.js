import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`photo-grid__button ${isLiked && 'photo-grid__button_active'}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo-grid__grid-element">
      <img
        className="photo-grid__image"
        onClick={handleClick}
        src = {card.link}
        alt = {card.name}
        /*style={{ backgroundImage: `url(${card.link})` }}*/
      />
      {isOwn && <button className='photo-grid__trash' onClick={handleDeleteClick} />}
      <div className="photo-grid__title">
        <h2 className="photo-grid__text">{card.name}</h2>
        <div className="photo-grid__like">
          <button type="button" className = {cardLikeButtonClassName} onClick = {handleLikeClick}></button>
          <div className="photo-grid__count">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
