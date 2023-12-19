import React, {useState, useEffect, useCallback, useRef} from "react";
import {Buffer} from "buffer";
function RetrieveFoods(accountId) {
  const [retrievedFoods, setRetrievedFoods] = useState([]);
  const dataFetchedRef = useRef(false);
  const getFoodsByOwner = useCallback(async () => {
    var response = await fetch("/api/getFoodsByOwner", {
      method: "POST",
      body: JSON.stringify(accountId),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var responseData = await response.json();
    if (responseData.success === false) {
      alert("Unexpected error in retrieving the foods data.");
    } else {
      const foods = responseData.foods;
      //generateCardsForFood(retrievedFoods);
      for (var x in foods) {
        const food = foods[x];
        setRetrievedFoods((retrievedFoods) => [...retrievedFoods, {food}]);
      }
    }
  }, [accountId]);
  //   useEffect(() => {
  //     console.log(accountId);
  //     console.log();
  //     // setRetrievedFoods(getFoodsByOwner());
  //     // getFoodsByOwner();
  //     // console.log(foodCards);
  //     // setRetrievedFoods(foodCards);
  //     // async function getFoodsByOwner() {
  //     //   var response = await fetch("/api/getFoodsByOwner", {
  //     //     method: "POST",
  //     //     body: JSON.stringify(accountId),
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //     },
  //     //   });
  //     //   var responseData = await response.json();
  //     //   if (responseData.success === false) {
  //     //     alert("Unexpected error in retrieving the foods data.");
  //     //   } else {
  //     //     const foods = responseData.foods;
  //     //     //generateCardsForFood(retrievedFoods);
  //     //     for (var x in foods) {
  //     //       const food = foods[x];
  //     //       console.log(food);
  //     //       setRetrievedFoods([...retrievedFoods, {food}]);
  //     //     }

  //     //     console.log(retrievedFoods);
  //     //   }
  //     // }
  //     // async function generateCardsForFood(foods) {
  //     //   const container = document.createElement("div"); // Container for cards

  //     //   foods.forEach((element) => {
  //     //     const card = document.createElement("div"); // Card div for each food
  //     //     card.classList.add("card");

  //     //     const image = document.createElement("img"); // Image retrieved from server
  //     //     image.classList.add("card-img-top");
  //     //     image.src = Buffer.from(element.image).toString();
  //     //     card.append(image);

  //     //     const cardBody = document.createElement("div"); // Container for food name, price, and description
  //     //     cardBody.classList.add("card-body");
  //     //     const cardTitle = document.createElement("h5");
  //     //     cardTitle.classList.add("card-title");
  //     //     cardTitle.innerHTML = element.name;
  //     //     cardBody.append(cardTitle);
  //     //     const cardText = document.createElement("p");
  //     //     cardText.classList.add("card-title");
  //     //     cardTitle.innerHTML = element.description;
  //     //     cardBody.append(cardText);
  //     //     const price = document.createElement("div");
  //     //     price.innerHTML = element.price + " PHP";
  //     //     cardBody.append(price);

  //     //     card.append(cardBody); //Adds card body to the card
  //     //     container.append(card); //Adds card to the whole container
  //     //   });
  //     //   console.log(container);
  //     //   setRetrievedFoods(container)
  //     // }
  //   }, [accountId]);

  async function addFoodToServer(data) {
    console.log(data);
    var response = await fetch("/api/addFood", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    var responseData = await response.json();
    console.log(responseData);
    if (responseData.success === false) {
      alert("Unexpected error in adding food.");
    } else {
      alert(responseData.message);
    }
  }

  async function test() {
    var response = await fetch("/api/image", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var responseData = await response.json();
    console.log(responseData);
    if (responseData.success === false) {
      alert("Unexpected error in adding food.");
    } else {
      // var imageData = new Blob([responseData.data[0].image], {type: "image/*"});
      // imageData.type = "image/*";
      // console.log(imageData);
      var imageData = responseData.data[0].image;
      var image = Buffer.from(imageData).toString();
      console.log(image);
      // var image = new Blob([imageData.data], {
      //   type: imageData.type,
      // });
      // console.log(image);
      document.getElementById("test").src = image;
    }
  }
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getFoodsByOwner();
  }, [getFoodsByOwner]);
  return retrievedFoods;
}

export default RetrieveFoods;
