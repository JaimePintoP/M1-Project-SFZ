"use strict";

class Login {
  constructor() {
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.messageContainer = document.querySelector(".message-container");
    this.loginButton = document.querySelector("#login-button");
  }

  // handle the login (when user clicks the login button)
  handleSubmit = (event) => {
    //prevent reload the page
    event.preventDefault();
    //get values frm the inputs
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    //Get users from db
    const users = db.getAllUsers();
    //check if the email and password exist in the db
    // arr.find()

    const user = users.find(function (userObj) {
      if (userObj.email === email && userObj.password === password) {
        return true;
      }
    });

    //empty the container so they dont sum each other
    this.messageContainer.innerHTML = "";
    const p = document.createElement("p");

    //set message
    if (!user) {
      p.textContent = "Email or password are incorrect!";
    } else {
      p.textContent = `Welcome back ${user.name}!`;
      p.classList.add("correct-message");
      //go to dashboard after login
      this.redirect();
    }
    this.messageContainer.appendChild(p);
  };

  //redirect to dashboard after login
  redirect = () => {
    setTimeout(() => location.assign("dashboard.html"), 2000);
  };
}

const login = new Login();

window.addEventListener("load", function () {
  login.loginButton.addEventListener("click", login.handleSubmit);
});
