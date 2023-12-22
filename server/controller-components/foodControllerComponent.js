"use strict";
const Food = require("../model-components/foodModelComponent");

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

exports.getAllFoods = function (req, res) {
  Food.getAllFoods(function (err, foods) {
    if (err) {
      res.send(err);
    }
    console.log(foods);
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
