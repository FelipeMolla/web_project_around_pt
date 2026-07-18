
export class Popup {
    constructor(popupSelector){
        this._popupSelector = document.querySelector(popupSelector);
         this._closeButton = this._popupSelector.querySelector(".popup__close");
         this._closeBtnListener =  () => this.close();
         this._escListener = (evt)=> this._handleEscClose(evt);
         this._overlayClkListener = (evt)=>{
            if (evt.target === this._popupSelector){
                this.close();
            }};
    }
    open(){
     this._popupSelector.classList.add("popup_is-opened");
     this.setEventListeners();
    }
    close(){
     this._popupSelector.classList.remove("popup_is-opened");
     this.removeEventListeners();
    }
    _handleEscClose(evt){
      if (evt.key === "Escape") {
        this.close();
    }
  } 
    setEventListeners(){
     document.addEventListener("keydown", this._escListener);
     this._closeButton.addEventListener("click", this._closeBtnListener);
     this._popupSelector.addEventListener("click", this._overlayClkListener);
    }
    removeEventListeners(){
     document.removeEventListener("keydown", this._escListener);
     this._closeButton.removeEventListener("click", this._closeBtnListener);
     this._popupSelector.removeEventListener("click", this._overlayClkListener);
    }
}