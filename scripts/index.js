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
const profileEditSubmitBtn =
  formEditProfile.querySelector("#edit-profile-form");
const cardTemplate = document.querySelector("#cards-template");
const cardsContainer = document.querySelector(".cards__list");
const card = cardsContainer.querySelector(".card");
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

const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
};
const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
};
profileEditBtn.addEventListener("click", () => {
  hanldeOpenEditModal(profileEditModal);
});
profileCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal);
});

const fillProfileForm = () => {
  profileEditNameInput.value = profileName.textContent;
  profileEditDescriptionInput.value = profileDescription.textContent;
};
const hanldeOpenEditModal = (modal) => {
  fillProfileForm();
  openModal(modal);
};
handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  let nameInput = profileEditNameInput.value;
  let jobInput = profileEditDescriptionInput.value;
  profileName.textContent = nameInput;
  profileDescription.textContent = jobInput;
  closeModal(profileEditModal);
};
formEditProfile.addEventListener("submit", handleProfileFormSubmit);
const getCardElement = (cardName, cardLink) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  console.log(cardElement);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  if (cardName == null || cardName === "") {
    cardTitle.textContent = "Lugar sem nome";
  } else {
    cardTitle.textContent = cardName;
  }
  if (cardLink == null || cardLink === "") {
    cardImage.src = "./images/placeholder.jpg";
  } else {
    cardImage.src = cardLink;
    cardImage.alt = cardName;
  }
  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardLikeBtn.addEventListener("click", (like) => {
    like.target.classList.toggle("card__like-button_is-active");
  });
  cardDeleteBtn.addEventListener("click", function (dlt) {
    dlt.target.closest(".card").remove();
  });
  const cardImagePopup = cardElement.querySelector(".card__image");
  const popupImage = document.querySelector("#image-popup");
  const contentPopupImage = popupImage.querySelector(".popup__image");
  const popupImageCloseBtn = popupImage.querySelector(".popup__close");
  const contentPopupCaption = popupImage.querySelector(".popup__caption");
  cardImagePopup.addEventListener("click", () => {
    contentPopupImage.src = cardLink;
    contentPopupCaption.textContent = cardName;
    contentPopupImage.alt = cardName;
    openModal(popupImage);
  });
  popupImageCloseBtn.addEventListener("click", () => {
    closeModal(popupImage);
  });
  return cardElement;
};
const renderCard = (cardName, cardLink, cardsContainer) => {
  const newCardElement = getCardElement(cardName, cardLink);
  cardsContainer.prepend(newCardElement);
};
newCardOpenBtn.addEventListener("click", () => {
  openModal(newCardModal);
});
newCardCloseBtn.addEventListener("click", () => {
  closeModal(newCardModal);
});
handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  let cardName = newCardNameInput.value;
  let cardLink = newCardLinkInput.value;
  renderCard(cardName, cardLink, cardsContainer);
  closeModal(newCardModal);
  console.log("Informações recebidas");
};
newCardSubmitBtn.addEventListener("click", handleCardFormSubmit);
initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsContainer);
  return console.log(
    `O nome do cartão é: ${card.name}, e seu link é ${card.link} e foi inserido no ${cardsContainer}`,
  );
});
