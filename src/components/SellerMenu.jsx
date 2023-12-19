import AddFood from "./AddFood";
function SellerMenu() {
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
        className="d-flex flex-row list-group list-group-flush"
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
          menu
        </div>
      </div>
    </div>
  );
}

export default SellerMenu;
