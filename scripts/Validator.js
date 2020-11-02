"use strict";

// Validation
//manage errros messages

// email:
//validate email syntax

// password:
// lenght of password
// check if password and repeat-passwrod are the same

class Validator {
  constructor() {
    //predetermine error messages
    this.invalidEmailError = "Please enter a valid email";
    this.emailExistsError = "Sorry! This email is already taken";
    this.passwordError = "Password must be atleast 6 characters long";
    this.repeatPasswordError = "Password and repeat password must match";

    //object of all the errors
    this.errors = {
      invalidEmailError: this.invalidEmailError,
      emailExistsError: this.emailExistsError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError,
    };
  }
  //validate If email is taken and valid syntax
  validateValidEmail = (email) => {
    //if email is valid

    if (emailSyntaxIsValid(email)) {
      // delete email error
      delete this.errors.invalidEmailError;
    } else {
      this.errors.invalidEmailError = this.invalidEmailError;
    }
  };

  //helper function to validateValidEmail
  emailSyntaxIsValid = (email) => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    //emailRegEx.test checks if emial meet the patter cryteria
    const emailIsValid = emailRegEx.test(email);
    return emailIsValid;
  };

  // validate if email is available
  validateUniqueEmail = (newEmail) => {
    const users = db.getAllUsers();

    let emailUnique = true;

    users.forEach((usersObj) => {
      if (usersObj.email === email) {
        emailUnique = false;
      }
    });

    //if email is not taken, remove erros message
    if (emailUnique) {
      delete this.errors.emailExistsError;
    } else {
      //if email is taken, show error
      this.errors.emailExistsError = this.emailExistsError;
    }
  };

  //validate password length
  validatePassword = (password) => {};

  //validate if pass and rep-pass match
  validateRepeatPassword = (password, repeatPassword) => {};

  //get erros to show them to user on sign up page
  getErrors = () => {};
}

const validator = new Validator();
