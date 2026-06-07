
export class Card {
    constructor(data, CardSelector, handleCardClick){
        this._name = data.name;
        this._link = data.link;
        this._CardSelector = CardSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate(){
const cardElement = document.querySelector(this._CardSelector).content.cloneNode(true);
return cardElement;
    }
    _fillCardData(){
        
        this._cardTitle = this._element.querySelector(".card__title");
        this._cardImage = this._element.querySelector(".card__image");
  
     if (this._name == null || this._name === "") {
    this._cardTitle.textContent = "Lugar sem nome";
  } else {
    this._cardTitle.textContent = this._name;
  }
  if (this._link == null || this._link === "") {
    this._cardImage.src = "./images/placeholder.jpg";
  } else {
    this._cardImage.src = this._link ;
    this._cardImage.alt = this._name;
  }
    }
    _setEventListeners(){
       
this._deleteCardBtn = this._element.querySelector(".card__delete-button");
this._likeCardBtn = this._element.querySelector(".card__like-button");
this._imageCard = this._element.querySelector(".card__image");

this._deleteCardBtn.addEventListener("click", (dlt) => {
    dlt.target.closest(".card").remove();
});
this._likeCardBtn.addEventListener("click", (like) => {
    like.target.classList.toggle("card__like-button_is-active");
  });

  this._popupImage = document.querySelector("#image-popup");
  this._contentPopupImage = this._popupImage.querySelector(".popup__image");
  this._popupImageCloseBtn = this._popupImage.querySelector(".popup__close");
  this._contentPopupCaption = this._popupImage.querySelector(".popup__caption");

  this._imageCard.addEventListener("click", () => {
this._handleCardClick(this._link, this._name);
  });
    }
    generateCard(){
        this._element = this._getTemplate();
        this._fillCardData();
        this._setEventListeners();

     return this._element;
    }
}