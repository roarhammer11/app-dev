import AddFood from "./AddFood";
import {useState, useEffect, useCallback, useRef} from "react";
import {Buffer} from "buffer";
function Home(props) {
  const dataFetchedRef = useRef(false);
  const [food, setFood] = useState([]);
  const [foodDisplay, setFoodDisplay] = useState([]);
  const createCards = useCallback(() => {
    return food.length !== 0 ? (
      food.map(function (key, value) {
        return (
          <div
            className="card"
            style={{
              width: 350 + "px",
              height: 500 + "px",
              margin: 1 + "rem",
            }}
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
      })
    ) : (
      <div className="m-auto"> No food available for this vendor.</div>
    );
  }, [food]);
  const getFoods = useCallback(async () => {
    var response = await fetch("/api/getAllFoods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var responseData = await response.json();
    if (responseData.success === false) {
      alert("Unexpected error in retrieving the foods data.");
    } else {
      console.log(responseData);
      //   const foods = responseData.foods;
      //   console.log(foods);
      //   for (var x in foods) {
      //     const foodRetrieved = foods[x];
      //     setFood((food) => [...food, {foodRetrieved}]);
      //   }
    }
  }, []);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getFoods();
  }, [food, getFoods]);

  return (
    <div>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{padding: "15px"}}
      >
        <h1 style={{marginInlineStart: 100, padding: 15}}>
          Hello, {props.userName}
        </h1>
        <form
          className="input-group w-auto my-auto"
          style={{display: "flex", flexShrink: 0, minWidth: "300px"}}
        >
          <input
            autoComplete="off"
            type="search"
            className="form-control rounded"
            placeholder="What do you feel like eating today?"
            style={{minWidth: 300 + "px"}}
          />
          <span className="input-group-text border-0">
            <i className="fas fa-search"></i>
          </span>
        </form>
      </div>

      <div>
        <h3>Get Discount Voucher Up To 20% Off!</h3>
      </div>
      <div>
        <h3>Category</h3>
      </div>

      <div>
        <h3>Recent orders</h3>
      </div>
    </div>
  );
}

export default Home;
