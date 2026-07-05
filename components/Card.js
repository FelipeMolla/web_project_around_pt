
export class Card {
    constructor(data, CardSelector, handleCardClick, handleTrashClick, handleLikeClick){
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._like = data.isLiked;
        this._CardSelector = CardSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
    }
    _getTemplate(){
      const cardElement = document.querySelector(this._CardSelector).content.cloneNode(true);
      return cardElement;
    }
    _fillCardData(){
        
        this._cardTitle = this._element.querySelector(".card__title");
        this._cardImage = this._element.querySelector(".card__image");
        this._card = this._element.querySelector(".card");
  
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
    this._card.id = this._id
    }
    if (this._like === true){
          this._likeCardBtn = this._element.querySelector(".card__like-button");
          this._likeCardBtn.classList.add("card__like-button_is-active");
        };
    }
    _setEventListeners(){
       
     this._deleteCardBtn = this._element.querySelector(".card__delete-button");
     this._likeCardBtn = this._element.querySelector(".card__like-button");
     this._imageCard = this._element.querySelector(".card__image");

     this._deleteCardBtn.addEventListener("click", (evt) => {
      const cardElement = evt.target.closest(".card");
     this._handleTrashClick(cardElement);
});
     this._likeCardBtn.addEventListener("click", (like) => {
    const cardElement = like.target.closest(".card");
     this._handleLikeClick(cardElement);
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