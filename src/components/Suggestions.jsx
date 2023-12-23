import AddFood from "./AddFood";
import {useState, useEffect, useCallback, useRef} from "react";
import {Buffer} from "buffer";
function Suggestions(props) {
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
    }
  }, []);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getFoods();
  }, [food, getFoods]);
}

export default Suggestions;