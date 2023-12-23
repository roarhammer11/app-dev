"use strict";
var dbConn = require("../config/db.config.js");

class Account {
  constructor(account) {
    this.name = account.name;
    this.email = account.email;
    this.password = account.password;
    this.userType = account.userType;
  }
  //create account
  static createAccount(newAccount, result) {
    console.log(newAccount);
    dbConn.query("INSERT INTO Accounts set ?", newAccount, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res.accountId);
      }
    });
  }

  static findByEmail(email, result) {
    dbConn.query(
      "SELECT * FROM Accounts WHERE email=?",
      email,
      function (err, res) {
        if (err) {
          console.log(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }

  static findByEmailAndPassword(email, password, result) {
    const query = "SELECT * FROM Accounts WHERE email = ? AND password = ?";
    dbConn.query(query, [email, password], function (err, res) {
      if (err) {
        console.log(err);
        result(true, null);
      } else {
        result(
          null,
          res.length,
          Object.values(res)[0]?.accountId,
          Object.values(res)[0]?.name,
          Object.values(res)[0]?.email,
          Object.values(res)[0]?.userType,
          Object.values(res)[0]?.password
        );
      }
    });
  }
  static updateAccount(accountId, updatedAccount, result) {
    const query = "UPDATE Accounts SET ? WHERE accountId = ?";
    dbConn.query(query, [updatedAccount, accountId], (err, res) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        console.log(res);
        result(null, res);
      }
    });
  }
}

module.exports = Account;
