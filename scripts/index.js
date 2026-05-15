import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {openModal, closeModal, handleOpenEditModal, handleProfileFormSubmit, handleCardFormSubmit} from "./utils.js";
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
const cardBody = cardsContainer.querySelector(".card");
const newCardModal = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const newCardOpenBtn = document.querySelector(".profile__add-button");
const newCardCloseBtn = newCardModal.querySelector(".popup__close");
const newCardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name",
);
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const newCardSubmitBtn = newCardForm.querySelector(".popup__button");


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
  inactiveButtonClass: ".popup__button_disabled",
  inputErrorClass: ".popup__input-error",
  errorClass: ".popup__error_visible",

}
const formEditProfileValidator  = new FormValidator(validationConfig, formEditProfile);
formEditProfileValidator.enableValidation();
const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.enableValidation();

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#cards-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  return console.log(
    `O nome do cartão é: ${cardData.name}, e seu link é ${cardData.link} e foi inserido no ${cardsContainer}`,
  );
});
newCardSubmitBtn.addEventListener("click", (evt) => {
  handleCardFormSubmit(evt, newCardNameInput, newCardLinkInput, newCardModal, cardsContainer);
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
});
formEditProfile.addEventListener("submit", (evt) => {
  handleProfileFormSubmit(evt, profileName, profileDescription, profileEditNameInput, profileEditDescriptionInput,  profileEditModal);
});

newCardOpenBtn.addEventListener("click", () => {
  openModal(newCardModal);
});
newCardCloseBtn.addEventListener("click", () => {
  closeModal(newCardModal);
});
profileEditBtn.addEventListener("click", () => {
  handleOpenEditModal(profileEditModal, profileName, profileDescription, profileEditNameInput, profileEditDescriptionInput);
});
profileCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});
