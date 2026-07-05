import {Popup} from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, yesButton, handleDeleteCard){
      super(popupSelector);
      this._yesButton = yesButton;
      this._handleDeleteCard = handleDeleteCard;
    }
    setEventListeners(){
        super.setEventListeners();
        this._yesButton.addEventListener("click", () => {
            this._handleDeleteCard(this._card);
        })
    }
    setCard(card){
        this._card = card;
    }
}