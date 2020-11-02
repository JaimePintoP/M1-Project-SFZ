"use strict";

class Database {
  //method to get users array from local storage
  getAllUsers = () => {
    const usersStr = localStorage.getItem("users");
    const usersArr = JSON.parse(usersStr);

    if (usersStr === null) {
      return [];
    } else {
      return usersArr;
    }
  };

  //methos to save user into the local storage
  saveNewUser = (newUser) => {
    //get arr of users saved in local storage
    const usersArr = this.getAllUsers();

    // update new array of users with new user
    const updatedUsersArr = [...usersArr, newUser];

    //save back updated users array to local storage
    const updatedUsersStr = JSON.stringify(updatedUsersArr);
    localStorage.setItem("users", updatedUsersStr);
  };
}

const db = new Database();
