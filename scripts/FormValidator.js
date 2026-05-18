export class FormValidator {
    constructor(config, formElement){
        this._config = config;
        this._formElement = formElement;
        this._inputs = this._formElement.querySelectorAll(this._config.inputSelector);
    }

_hasInvalidInput() {
  return Array.from(this._inputs).some((input) => !input.validity.valid);
  
}

  _toggleButtonState(){
 const button = this._formElement.querySelector(this._config.submitButtonSelector);
    button.disabled = this._hasInvalidInput();

}
    _verifyInputValidity(input){
  const errorElement = this._formElement.querySelector(
    `#input-${input.name}-error`,
  );
  if (!input.validity.valid){
    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    this._toggleButtonState();
  } else {
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    this._toggleButtonState();
  }
  }
    _setEventListeners(){
this._inputs.forEach((input) => {
    input.addEventListener("input", ()=>{
        this._verifyInputValidity(input);})
})};
     _hideInputErrors(){
      
  this._inputs.forEach((input) => {
    const errorElement = this._formElement.querySelector(
      `#input-${input.name}-error`,
    );
    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  })};
     resetValidation(){
  this._hideInputErrors();
     };
    enableValidation(){
      this._setEventListeners();
     }
    }