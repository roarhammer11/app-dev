import AddFood from "./AddFood";
import RetrieveFoods from "./RetrieveFoods";
import {Buffer} from "buffer";
function SellerMenu(accountId) {
  const retrievedFoods = RetrieveFoods(accountId);
  console.log(retrievedFoods);
  const sellerOptionController = (e) => {
    const activeMenu = document
      .getElementById("sellerOptionsContainer")
      .getElementsByClassName("active")[0];
    console.log(activeMenu);
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
          <AddFood />
        </div>
        <div id="foodMenuContent" hidden>
          <div className="d-flex flex-row ">
            {retrievedFoods.map(function (key, value) {
              return (
                <div
                  className="card"
                  style={{
                    width: 400 + "px",
                    height: 400 + "px",
                    margin: 1 + "rem",
                  }}
                >
                  <img
                    className="card-img-top m-auto"
                    src={Buffer.from(key.food.image).toString()}
                    alt="Food"
                    style={{width: 200, height: 200}}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{key.food.name}</h5>
                    <p className="card-text">{key.food.description}</p>
                    <h6 className="card-subtitle">{key.food.price + " PHP"}</h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerMenu;
