import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Popup} from "../components/Popup.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
const profileEditModal = document.querySelector("#edit-popup");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileCloseBtn = profileEditModal.querySelector(".popup__close");
const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__title");
const profileDescription = profileInfo.querySelector(".profile__description");
const profileEditNameInput = document.querySelector(".popup__input_type_name");
const profileEditDescriptionInput = document.querySelector(
  ".popup__input_type_description",
);
const formEditProfile = document.querySelector("#edit-profile-form");
const profileEditSubmitBtn = formEditProfile.querySelector(".popup__button");
const cardTemplate = document.querySelector("#cards-template");
const cardsContainer = document.querySelector(".cards__list");
const cardBody = document.querySelector(".card");
const newCardModal = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const newCardOpenBtn = document.querySelector(".profile__add-button");
const newCardCloseBtn = newCardModal.querySelector(".popup__close");
const newCardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name",
);
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const newCardSubmitBtn = newCardForm.querySelector(".popup__button");
const cardImage= document.querySelector(".card__image");



let initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__error_visible",

}
  const formEditProfileValidator  = new FormValidator(validationConfig, formEditProfile);
  formEditProfileValidator.enableValidation();

const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.enableValidation();

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#cards-template", handleCardClick);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
});
const userInfo =  new UserInfo({nameSelector: '.profile__title', jobSelector: '.profile__description'});
const popupWithImage = new PopupWithImage("#image-popup");
function handleCardClick(link, name){
  popupWithImage.open(link, name);
};

newCardOpenBtn.addEventListener("click", () => {
  const handleOpenEditModal = (evt) => {
    fillProfileForm();
  };
  const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const cardData = {
      name: newCardNameInput.value,
      link: newCardLinkInput.value
    };
    const card = new Card(cardData, "#cards-template", handleCardClick);
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
    evt.target.closest(".popup").querySelector("form").reset();
  };
  newCardFormValidator.resetValidation();
  new PopupWithForm(`#${newCardModal.id}`, (evt) => handleCardFormSubmit(evt, newCardNameInput, newCardLinkInput, newCardModal, cardsContainer)).open();
});
profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    userInfo.setUserInfo({name: profileEditNameInput.value, job: profileEditDescriptionInput.value});
  }
  const fillProfileForm = (evt)=>{
    profileEditNameInput.value = currentUserInfo.name;
    profileEditDescriptionInput.value = currentUserInfo.job;
  }
  fillProfileForm();
  formEditProfileValidator.resetValidation();
  new PopupWithForm(`#${profileEditModal.id}`, (evt)=> handleProfileFormSubmit(evt, profileName, profileDescription, profileEditNameInput, profileEditDescriptionInput)).open();
  
});