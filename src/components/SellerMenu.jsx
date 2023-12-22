import AddFood from "./AddFood";
import {useState, useEffect, useCallback, useRef} from "react";
import {Buffer} from "buffer";
function SellerMenu(accountId) {
  const dataFetchedRef = useRef(false);
  const [food, setFood] = useState([]);
  const [foodDisplay, setFoodDisplay] = useState([]);

  const createCards = useCallback(() => {
    if (document.getElementById("noFood") && food.length !== 0) {
      document.getElementById("noFood").remove();
    }
    return food.map(function (key, value) {
      return (
        <div
          className="card"
          style={{
            width: 350 + "px",
            height: 500 + "px",
            margin: 1 + "rem",
          }}
          key={key.foodRetrieved.foodId}
        >
          <div className="mt-5">
            <img
              className="card-img-top m-auto"
              // src={Buffer.from(key.foodRetrieved.image).toString()}
              src={
                key.foodRetrieved.image.data.length !== 0
                  ? Buffer.from(key.foodRetrieved.image).toString()
                  : "https://placehold.co/200x200"
              }
              alt="Food"
              style={{width: 200, height: 200, marginTop: 2 + "rem"}}
            />
            <div className="card-body">
              <h5 className="card-title">{key.foodRetrieved.name}</h5>
              <p className="card-text">{key.foodRetrieved.description}</p>
              <h6 className="card-subtitle">
                {key.foodRetrieved.price + " PHP"}
              </h6>
            </div>
          </div>
        </div>
      );
    });
  }, [food]);

  const getFoods = useCallback(async (accountId) => {
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
      for (var x in foods) {
        const foodRetrieved = foods[x];
        setFood((food) => [...food, {foodRetrieved}]);
      }
    }
  }, []);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getFoods(accountId);
  }, [food, accountId, getFoods]);

  const callback = (data) => {
    getFoods(accountId);
    const parent = document.getElementById("foodDisplay");
    while (parent.firstChild) {
      console.log(parent.firstChild);
      parent.removeChild(parent.firstChild); //Removes all food to update food from database
    }
  };

  const sellerOptionController = (e) => {
    const activeMenu = document
      .getElementById("sellerOptionsContainer")
      .getElementsByClassName("active")[0];
    const menuToBeActivated = e.currentTarget;
    const addFoodContent = document.getElementById("addFoodContent");
    const foodMenuContent = document.getElementById("foodMenuContent");
    if (activeMenu !== menuToBeActivated) {
      activeMenu.classList.remove("active");
      menuToBeActivated.classList.add("active");
      console.log(menuToBeActivated.id);
      if (menuToBeActivated.id === "addFoodButton") {
        addFoodContent.hidden = false;
        foodMenuContent.hidden = true;
      } else if (menuToBeActivated.id === "foodMenuButton") {
        setFoodDisplay(createCards());
        foodMenuContent.hidden = false;
        addFoodContent.hidden = true;
      }
    }
  };

  return (
    <div>
      <div
        className="d-flex flex-row list-group list-group-flush m-auto"
        id="sellerOptionsContainer"
        style={{width: 50 + "rem"}}
      >
        <button
          className="list-group-item list-group-item-action py-2 ripple active"
          onClick={sellerOptionController}
          id="addFoodButton"
        >
          <span>Add Food</span>
        </button>
        <button
          className="list-group-item list-group-item-action py-2 ripple"
          onClick={sellerOptionController}
          id="foodMenuButton"
        >
          <span>Food Menu</span>
        </button>
      </div>
      <div className="mt-5">
        <div id="addFoodContent">
          <AddFood func={callback} />
        </div>
        <div id="foodMenuContent" hidden>
          <div
            className="d-flex flex-row flex-wrap hideScrollbar"
            id="foodDisplay"
          >
            <div className="m-auto" id="noFood">
              No food available for this vendor.
            </div>
            {foodDisplay}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerMenu;
