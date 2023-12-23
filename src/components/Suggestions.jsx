import {useState, useEffect, useCallback, useRef} from "react";
import {Buffer} from "buffer";
function Suggestions(props) {
  const dataFetchedRef = useRef(false);
  const [food, setFood] = useState([]);
  const [lowFoodPrice, setLowFoodPrice] = useState([]);
  const [mediumFoodPrice, setMediumFoodPrice] = useState([]);
  const [highFoodPrice, setHighFoodPrice] = useState([]);
  // const [categories, setCategories] = useState([]);
  const [categorizedFood, setCategorizedFood] = useState([]);
  // const [binEdges, setBinEdges] = useState([]);

  const displayCards = useCallback((categorizedFood, food) => {
    console.log(categorizedFood);
    var low = [];
    var medium = [];
    var high = [];
    console.log(food.length);
    if (categorizedFood.length !== 0) {
      var lowCount = 0;
      var mediumCount = 0;
      var highCount = 0;
      food.forEach((item) => {
        console.log(item);
        if (
          categorizedFood[0].length !== 0 &&
          lowCount < categorizedFood[0].length &&
          item.foodId === categorizedFood[0][lowCount].foodId
        ) {
          lowCount++;
          low.push(item);
        } else if (
          categorizedFood[1].length !== 0 &&
          mediumCount < categorizedFood[1].length &&
          item.foodId === categorizedFood[1][mediumCount].foodId
        ) {
          mediumCount++;
          medium.push(item);
        } else if (
          categorizedFood[2].length !== 0 &&
          highCount < categorizedFood[2].length &&
          item.foodId === categorizedFood[2][highCount].foodId
        ) {
          highCount++;
          high.push(item);
        }
      });
    }
    console.log(low);
    setLowFoodPrice(createCards(low));
    console.log(medium);
    setMediumFoodPrice(createCards(medium));
    console.log(high);
    setHighFoodPrice(createCards(high));
  }, []);
  const categorizePrices = useCallback(
    (foodPrices, foodId, binEdges, food) => {
      const priceCategories = foodPrices.map((food) => {
        for (let i = 0; i < binEdges.length - 1; i++) {
          if (food >= binEdges[i] && food <= binEdges[i + 1]) {
            return i; // Return the index of the bin
          }
        }
        return binEdges.length - 1; // For values greater than the last bin
      });
      console.log(foodPrices);
      console.log(priceCategories);
      // Assign labels based on categories
      const categoryLabels = ["Low", "Medium", "High"];
      const categorizedPrices = priceCategories.map(
        (categoryIndex) => categoryLabels[categoryIndex]
      );
      console.log(categorizedPrices);
      var foodWraper = [];
      var low = [];
      var medium = [];
      var high = [];
      for (let x = 0; x < foodId.length; x++) {
        if (categorizedPrices[x] === "Low") {
          low.push({foodId: foodId[x], priceCategory: categorizedPrices[x]});
        } else if (categorizedPrices[x] === "Medium") {
          medium.push({foodId: foodId[x], priceCategory: categorizedPrices[x]});
        } else if (categorizedPrices[x] === "High") {
          high.push({foodId: foodId[x], priceCategory: categorizedPrices[x]});
        }
      }
      foodWraper.push(low, medium, high);
      setCategorizedFood(foodWraper);
      displayCards(foodWraper, food);
      console.log(foodWraper);
    },
    [displayCards]
  );

  const calculateBinEdges = useCallback(
    (food) => {
      console.log(food);
      const foodPrices = food.map((item) => parseInt(item.price));
      const foodId = food.map((item) => item.foodId);
      console.log(foodPrices);
      const minPrice = Math.min(...foodPrices);
      const maxPrice = Math.max(...foodPrices);
      const numBins = 3; // You can adjust the number of bins as needed

      const binWidth = (maxPrice - minPrice) / numBins;
      const edges = Array.from(
        {length: numBins + 1},
        (_, index) => minPrice + index * binWidth
      );
      // setBinEdges(edges);
      console.log(edges);
      categorizePrices(foodPrices, foodId, edges, food);
    },
    [categorizePrices]
  );

  const createCards = (food) => {
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
                  key.image.data.length !== 0
                    ? Buffer.from(key.image).toString()
                    : "https://placehold.co/200x200"
                }
                alt="Food"
                style={{width: 200, height: 200, marginTop: 2 + "rem"}}
              />
              <div className="card-body">
                <h5 className="card-title">{key.name}</h5>
                <p className="card-text">{key.description}</p>
                <h6 className="card-subtitle">{key.price + " PHP"}</h6>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="m-auto"> No food to display.</div>
    );
  };
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
      const foods = responseData.foods;
      var temp = [];
      for (var x in foods) {
        const foodRetrieved = foods[x];
        setFood((food) => [...food, {foodRetrieved}]);
        temp.push(foodRetrieved);
      }
      calculateBinEdges(temp);
    }
  }, [calculateBinEdges]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getFoods();
  }, [food, getFoods, displayCards]);
  return (
    <div>
      <div>
        <div>Low</div>
        {lowFoodPrice}
      </div>
      <div>
        <div>Medium</div>
        {mediumFoodPrice}
      </div>
      <div>
        <div>High</div>
        {highFoodPrice}
      </div>
    </div>
  );
}

export default Suggestions;
