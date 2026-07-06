import {Popup} from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, submitButton){
         super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._submitButton = submitButton;
        this._submitListener = (evt)=> this._handleSubmit(evt);
        this._formElement = this._popupSelector.querySelector(".popup__form");
    }
    _handleSubmit(evt){
        this._getInputValues();
        this._handleFormSubmit(evt, this._formValues);

    }
    _getInputValues(){
       this._formInputs = this._formElement.querySelectorAll(".popup__input");
       this._formValues = {};
       this._formInputs.forEach(input => {
        this._formValues[input.name] = input.value;
    })
    }
    setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener("keydown", (evt) =>{
            if(evt.key === "Enter" && this._submitButton.disabled === false){
                this._handleSubmit(evt);
            }
            
        })
        this._popupSelector.addEventListener("submit", this._submitListener);
    }
    removeEventListeners(){
        super.removeEventListeners();

        this._popupSelector.removeEventListener("submit", this._submitListener);
    }
    close(){
        super.close();
        this._formElement.reset();

    }
}