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
initialCards.forEach(function (card) {
  return console.log(
    `O nome do cartão é: ${card.name}, e seu link é ${card.link}`,
  );
});

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
