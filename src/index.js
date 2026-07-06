import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Popup} from "../components/Popup.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {Section} from "../components/Section.js";
import {Api} from "../components/Api.js";
import {PopupWithConfirmation} from "../components/PopupWithConfirmation.js";
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
const avatarSelector = document.querySelector(".profile__image");
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const newCardSubmitButton = newCardForm.querySelector(".popup__button");
const cardImage= document.querySelector(".card__image");
const confirmModal = document.querySelector("#confirm-popup");
const confirmYesButton = confirmModal.querySelector(".popup__button");
const updateAvatarModal = document.getElementById("update_avatar-popup");
const updateAvatarForm = document.getElementById("update-avatar-form")
const avatarLinkInput = updateAvatarModal.querySelector(".popup__input");
const updateAvatarSubmitButton = updateAvatarForm.querySelector(".popup__button");  
const profileImage = document.querySelector(".profile__image");

const api = new Api({baseUrl:`https://around-api.pt-br.tripleten-services.com/v1`, 
  headers: {
    authorization: "",
    "Content-Type": ""  }}
);

const handleCardFormSubmit = (evt) => {
    evt.preventDefault();
    const cardData = {
      name: newCardNameInput.value,
      link: newCardLinkInput.value
    };
    loadSubmitButton(newCardSubmitButton, "Criando...");
    api.newCard({cardName: cardData.name, cardLink: cardData.link}).then((res) => {
    const card = new Card(res, "#cards-template", handleCardClick, handleTrashClick, handleLikeClick);
    cardsContainer.append(card.generateCard());
    }).then((res) => {
      newCardPopup.close();
      loadSubmitButton(newCardSubmitButton, "Criar");
    }).catch((err)=>{
      loadSubmitButton(newCardSubmitButton, err.message);
    })
  };
        
const userInfo =  new UserInfo({nameSelector: profileName, aboutSelector:profileDescription, avatarSelector:avatarSelector});

api.loadInitialData().then((res) => {
  userInfo.setUserInfo(res[0]);
  const cardSection = new Section({items: res[1], renderer: (item) => {
  const card = new Card(item, "#cards-template", handleCardClick, handleTrashClick, handleLikeClick);
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
}
}, ".cards__list");
return cardSection.renderItems();
})

 const loadSubmitButton = (button, text) => {
  button.textContent = text;
 }
 const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    loadSubmitButton(profileEditSubmitBtn, "Salvando...");
    api.updateUserInfo(profileEditNameInput.value, profileEditDescriptionInput.value).then((res) =>{
      userInfo.setUserInfo(res)
    }).then((res) =>{
      newProfileEditPopup.close();
      loadSubmitButton(profileEditSubmitBtn, "Salvar");
    }).catch((err) =>{
      loadSubmitButton(profileEditSubmitBtn, err.message);
    })

  };

 const handleUpdateAvatarSubmit = (evt) =>{
    evt.preventDefault();
    loadSubmitButton(updateAvatarSubmitButton, "Salvando...");
    api.updateAvatar(avatarLinkInput.value).then((res) => {
      userInfo.setUserInfo(res)
    }).then((res) =>{
      updateAvatarPopup.close();
      loadSubmitButton(updateAvatarSubmitButton, "Salvar");
    }).catch((err) =>{
      loadSubmitButton(updateAvatarSubmitButton, err.message);
    })
 }


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

  const updateAvatarFormValidator = new FormValidator(validationConfig, updateAvatarForm);
  updateAvatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage("#image-popup");
function handleCardClick(link, name){
  popupWithImage.open(link, name);
};
const handleOpenEditModal = (evt) => {
    fillProfileForm();
  };
 
const handleDeleteCard = (card) => {
  loadSubmitButton(confirmYesButton, "Excluindo...");
  api.deleteCard(card.id).then((res)=>{
    confirmPopup.close();
    loadSubmitButton(confirmYesButton, "Sim");
  }).catch((err) => {
    loadSubmitButton(confirmYesButton, err.message);
  })
  card.remove();
  }

const confirmPopup = new PopupWithConfirmation(`#${confirmModal.id}`, confirmYesButton, handleDeleteCard, );

const handleLikeClick = (card) =>{
  const cardLikeButton = card.querySelector(".card__like-button");
  if(cardLikeButton.classList.contains("card__like-button_is-active")){
  cardLikeButton.classList.remove("card__like-button_is-active");
  return api.removeLike(card.id);
} else {
  cardLikeButton.classList.add("card__like-button_is-active");
  return api.putLike(card.id);
}
}

const handleTrashClick = (card) =>{
  confirmPopup.open();
  confirmPopup.setCard(card);
}

const updateAvatarPopup = new PopupWithForm(`#${updateAvatarModal.id}`, (evt)=> handleUpdateAvatarSubmit(evt, avatarLinkInput), updateAvatarSubmitButton);
profileImage.addEventListener("click",() => {
  const fillAvatarSrc = () =>{
    avatarLinkInput.value = profileImage.src;
  }
  fillAvatarSrc();
  updateAvatarFormValidator.resetValidation();
  updateAvatarPopup.open();
});

const newCardPopup = new PopupWithForm(`#${newCardModal.id}`, (evt) => handleCardFormSubmit(evt, newCardNameInput, newCardLinkInput, newCardModal, cardsContainer), newCardSubmitButton);
  newCardOpenBtn.addEventListener("click", () => {
  newCardFormValidator.resetValidation();
  newCardPopup.open();
});

const newProfileEditPopup = new PopupWithForm(`#${profileEditModal.id}`, (evt)=> handleProfileFormSubmit(evt, profileName, profileDescription, profileEditNameInput, profileEditDescriptionInput), profileEditSubmitBtn);
profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  const fillProfileForm = (evt)=>{
    profileEditNameInput.value = currentUserInfo.name;
    profileEditDescriptionInput.value = currentUserInfo.about;
  }
  fillProfileForm();
  formEditProfileValidator.resetValidation();
  newProfileEditPopup.open();
  
})