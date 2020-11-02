"use strict";

class Signup {
  constructor() {
    this.nameInput = document.querySelector("#name");
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.repeatPasswordInput = document.querySelector("#repeat-password");

    this.buttonInput = document.querySelector("#signup-button");
    this.errorsWrapper = document.querySelector(".message-container");
  }

  // email input Handler
  handleEmailInput = (event) => {
    const emailInput = event.target;
    const email = emailInput.value;

    validator.validateValidEmail(email);
    validator.validateUniqueEmail(email);

    this.setErrorMessages();
  };

  //password input Handler
  handlePasswordInput = (event) => {
    const passwordInput = event.target;
    const repeatPasswordInput = this.repeatPasswordInput;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);

    this.setErrorMessages();
  };

  //repeat-password input Handler
  handleRepeatPasswordInput = (event) => {
    const passwordInput = event.target;
    const repeatPasswordInput = this.repeatPasswordInput;

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    validator.validatePassword(password);
    validator.validateRepeatPassword(password, repeatPassword);

    this.setErrorMessages();
  };

  //used to show messages below Sign up form
  setErrorMessages = () => {
    //Clear previous messages so they dont add
    this.errorsWrapper.innerHTML = "";

    const errorsObj = validator.getErrors();

    //returns an array of objects value (only error strings)
    const errorStringArr = Object.values(errorsObj);

    errorStringArr.forEach((str) => {
      const p = document.createElement("p");
      p.textContent = str;

      this.errorsWrapper.appendChild(p);
    });
  };

  // save data (button submit) Handler
  saveData = (event) => {
    // prevent default button behavior
    event.preventDefault();

    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const repeatPassword = this.repeatPasswordInput.value;

    //create new user, taking the user object from the class User in user.js
    const newUser = new User(name, email, password);

    //save user in the data base
    db.saveNewUser(newUser);

    //empty form
    this.nameInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.repeatPasswordInput.value = "";

    //Redirect to home page
    this.redirect();
  };

  // event listener from inputs Handler
  addListeners = () => {
    this.emailInput.addEventListener("input", this.handleEmailInput);
    this.passwordInput.addEventListener("input", this.handlePasswordInput);
    this.repeatPasswordInput.addEventListener(
      "input",
      this.handleRepeatPasswordInput
    );

    this.buttonInput.addEventListener("click", this.saveData);
  };

  //redirect to dashboard after login
  redirect = () => {
    setTimeout(() => location.assign("index.html"), 2000);
  };
}

// create new isntance (new sign up)
const signup = new Signup();

// add event listener wheneverything is loaded
window.addEventListener("load", signup.addListeners);
