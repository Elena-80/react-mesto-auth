import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/auth.js";
import api from "../utils/api";


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLogged] = useState(false);
  const [infoMessage, setInfoMessage] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

 useEffect(() => {
  document.body.style.backgroundColor = "black";
    api.getInitialCards()
      .then((items) => {
        setCards(items);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  useEffect(() => {
      api.getUserInfo()
        .then((info) => {
            setCurrentUser(info);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);          
        });
  }, []);


useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    auth.checkToken(token)
      .then((res) => {
        setEmail(res.data.email);
        setLogged(true);
        navigate("/");
      })
      .catch(console.error);
  }
}, []);


function onLogin(email) {
  setLogged(true);
  setEmail(email);
}

function onSignOut() {
  localStorage.removeItem("token");
  setLogged(false);
}

function handleErrorMessage(message) { 
    setInfoMessage(message);
}

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
         });
    } 

function handleCardDelete(card) {
  api.deleteCard(card._id)
      .then((info) => {
        setCards((state) => state.filter((c) => {return c._id != card._id}))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
       });    
  } 

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    for (var key in selectedCard) console.log(key + ": " + selectedCard[key]);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoMessage(null);
  }

  function handleUpdateUser(data) {
    api.sendUserInfo(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
       });
  }

  function handleUpdateAvatar(avatarLink) {
    api.sendNewAvatar(avatarLink)
    .then((info) => {
      setCurrentUser(info);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
     });
  }
 
  function handleAddPlaceSubmit(data) {
    api.sendPictureInfo(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">

    <Header 
      location = {location}
      email = {email}
      onSignOut = {onSignOut}
      />
       
        <Routes>
       
          <Route path="/" element = {
              <ProtectedRoute 
                  component = {Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  email={email}
                  onSignOut = {onSignOut}
                  onEditProfile = {handleEditProfileClick}
                  onAddPlace = {handleAddPlaceClick}
                  onEditAvatar = {handleEditAvatarClick}
                  onCardClick = {handleCardClick}
                  onCardLike = {handleCardLike}
                  onCardDelete = {handleCardDelete}
                  />
             }
          />
            
          <Route path='/sign-up' element={
                <Register  handleErrorMessage={handleErrorMessage}/>
            } />

          <Route
            path="/sign-in" element={
              <Login
                handleErrorMessage={handleErrorMessage}
                onLogin={onLogin}
              />
            }
          />

          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />

      </Routes> 

      <Footer />
      <ImagePopup />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser = {handleUpdateUser}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace = {handleAddPlaceSubmit}/>

      <PopupWithForm
        props={{
          title: "Вы уверены?",
          name: "delete",
          isOpen: false,
          onClose: closeAllPopups,
          buttonTitle: 'Да',
          children: (
            <>
            </>
          ),
        }}
      />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar = {handleUpdateAvatar}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip message={infoMessage} onClose={closeAllPopups} />

      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
