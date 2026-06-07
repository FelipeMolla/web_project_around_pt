import {Popup} from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
    }
    open(imageUrl, imageCaption){
        super.open();
        const imageElement = this._popupSelector.querySelector(".popup__image");
        const captionElement = this._popupSelector.querySelector(".popup__caption");
        imageElement.src = imageUrl;
        captionElement.textContent = imageCaption;
        imageElement.alt = imageCaption;
}
}