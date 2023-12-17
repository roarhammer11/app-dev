"use strict";
const Account = require("../model-components/accountModelComponent");
exports.signup = function (req, res) {
  const newAccount = new Account(req.body);
  Account.findByEmail(newAccount["email"], function (err, email) {
    console.log(email.length);
    if (email.length === 0) {
      Account.createAccount(newAccount, function (err, accountId) {
        if (err) {
          res.send(err);
        }
        res.json({
          error: false,
          status: 200,
          message:
            newAccount.name + "'s account has been successfully created.",
          data: accountId,
        });
      });
    } else {
      res.status(409).send({error: true, message: "Email already exists."});
    }
  });
};

exports.login = function (req, res) {
  Account.findByEmailAndPassword(
    req.body.email,
    req.body.password,
    function (err, count, accountId, name, email, userType) {
      if (err) {
        res.status(err.statusCode).json({success: false});
      } else if (count > 0) {
        res.status(200).json({success: true, accountId, name, email, userType});
      } else {
        res.status(404).json({success: false});
      }
    }
  );
};
