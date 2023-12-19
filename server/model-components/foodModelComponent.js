"use strict";
const {type} = require("@testing-library/user-event/dist/type/index.js");
var dbConn = require("../config/db.config.js");

class Food {
  constructor(food) {
    this.name = food.name;
    this.accountId = food.accountId;
    this.price = food.price;
    this.description = food.description;
    this.image = Buffer.from(food.image);
  }
  //create account
  static createFood(newFood, result) {
    dbConn.query("INSERT INTO Food set ?", newFood, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res);
        result(null, res.foodId);
      }
    });
  }

  //   static findByEmail(email, result) {
  //     dbConn.query(
  //       "SELECT * FROM Accounts WHERE email=?",
  //       email,
  //       function (err, res) {
  //         if (err) {
  //           console.log(err, null);
  //         } else {
  //           result(null, res);
  //         }
  //       }
  //     );
  //   }

  //   static findByEmailAndPassword(email, password, result) {
  //     const query = "SELECT * FROM Accounts WHERE email = ? AND password = ?";
  //     dbConn.query(query, [email, password], function (err, res) {
  //       if (err) {
  //         console.log(err);
  //         result(true, null);
  //       } else {
  //         result(
  //           null,
  //           res.length,
  //           Object.values(res)[0]?.accountId,
  //           Object.values(res)[0]?.name,
  //           Object.values(res)[0]?.email,
  //           Object.values(res)[0]?.userType
  //         );
  //       }
  //     });
  //   }
  static image(result) {
    dbConn.query(
      "SELECT image FROM Food WHERE foodId = '20'",
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  }
}

module.exports = Food;
