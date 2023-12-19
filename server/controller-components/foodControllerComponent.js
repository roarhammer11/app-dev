"use strict";
// const multer = require("multer");
// const storage = multer.memoryStorage(); // You can also set up disk storage
// const upload = multer({storage: storage});
const Food = require("../model-components/foodModelComponent");
// exports.signup = function (req, res) {
//   const newFood = new Food(req.body);
//   Food.findByEmail(newAccount["email"], function (err, email) {
//     console.log(email.length);
//     if (email.length === 0) {
//         Food.createAccount(newAccount, function (err, accountId) {
//         if (err) {
//           res.send(err);
//         }
//         res.json({
//           error: false,
//           status: 200,
//           message:
//             newAccount.name + "'s account has been successfully created.",
//           data: accountId,
//         });
//       });
//     } else {
//       res.status(409).send({error: true, message: "Email already exists."});
//     }
//   });
// };
exports.addFood = function (req, res) {
  const uploadedImage = req.body.image;
  console.log(uploadedImage);
  const newFood = new Food({
    name: req.body.name,
    accountId: req.body.accountId,
    price: req.body.price,
    description: req.body.description,
    image: uploadedImage,
  });
  console.log(newFood.image);
  // if (req.body.image) {
  //   console.log(req.body.image);
  //   newFood.image = req.body.image;
  // }
  Food.createFood(newFood, function (err, foodId) {
    if (err) {
      res.send(err);
    }
    res.json({
      error: false,
      status: 200,
      message: "Food " + newFood.name + " has been added successfully.",
      data: foodId,
    });
  });
};
exports.getFoodsByOwner = function (req, res) {
  const accountId = req.body.accountId;
  console.log(accountId);
  Food.getAllFoodsByOwner(accountId, function (err, foods) {
    if (err) {
      res.send(err);
    }
    res.json({
      error: false,
      status: 200,
      foods: foods,
    });
  });
};

exports.getImage = function (req, res) {
  Food.image(function (err, image) {
    if (err) {
      res.send(err);
    }
    res.json({
      error: false,
      status: 200,
      image: image,
    });
  });
};

// exports.login = function (req, res) {
//   Account.findByEmailAndPassword(
//     req.body.email,
//     req.body.password,
//     function (err, count, accountId, name, email, userType) {
//       if (err) {
//         res.status(err.statusCode).json({success: false});
//       } else if (count > 0) {
//         res.status(200).json({success: true, accountId, name, email, userType});
//       } else {
//         res.status(404).json({success: false});
//       }
//     }
//   );
// };
