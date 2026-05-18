import {Card} from "./Card.js";
const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
};
const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
};

const fillProfileForm = (profileName, profileDescription, nameInput, descriptionInput) => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
};
const handleOpenEditModal = (modal,profileName, profileDescription, nameInput, descriptionInput, profileFormValidator) => {
  fillProfileForm(profileName, profileDescription, nameInput, descriptionInput);
  profileFormValidator.resetValidation();
  openModal(modal);
};
const handleProfileFormSubmit = (evt, profileName, profileDescription, nameInput, descriptionInput,  modal) => {
  evt.preventDefault();
 profileName.textContent = nameInput.value;
 profileDescription.textContent = descriptionInput.value;
  closeModal(modal);
};
const handleCardFormSubmit = (evt, newCardNameInput, newCardLinkInput, modal, cardsContainer) => {
  evt.preventDefault();
  const cardName = newCardNameInput.value;
  const cardLink = newCardLinkInput.value;
  
  const card = new Card({ name: cardName, link: cardLink }, "#cards-template");
  cardsContainer.prepend(card.generateCard());
  closeModal(modal);
  console.log( `O nome do cartão é: ${card._name}, e seu link é ${card._link} `);
  
};

export {openModal, closeModal, handleOpenEditModal, handleProfileFormSubmit, handleCardFormSubmit};