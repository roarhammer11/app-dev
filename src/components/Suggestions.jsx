import {useState, useEffect, useCallback, useRef} from "react";
import {Carousel, Container, Col} from "react-bootstrap";
import {Buffer} from "buffer";
function Suggestions() {
  const dataFetchedRef = useRef(false);
  const [food, setFood] = useState([]);
  const [lowFoodPrice, setLowFoodPrice] = useState([]);
  const [mediumFoodPrice, setMediumFoodPrice] = useState([]);
  const [highFoodPrice, setHighFoodPrice] = useState([]);

  const createCarousel = useCallback((food) => {
    console.log(food);
    const numSlides = Math.ceil(food.length / 3);
    console.log(numSlides);
    const slides = Array.from({length: numSlides}, (_, index) => (
      <Carousel.Item key={index}>
        <Container>
          <div className="d-flex flex-row">
            {food.slice(index * 3, (index + 1) * 3).map((item) => (
              <Col key={item.foodId}>{item}</Col>
            ))}
          </div>
        </Container>
      </Carousel.Item>
    ));
    // return food.map(function (key, value) {
    //   return <Carousel.Item>{key}</Carousel.Item>;
    // });
    return (
      <Carousel
        controls={true}
        indicators={true}
        interval={null}
        data-bs-theme="dark"
      >
        {slides}
      </Carousel>
    );
  }, []);

  const displayCards = useCallback(
    (categorizedFood, food) => {
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
      // console.log(low);
      // setLowFoodPrice(createCards(low));
      // console.log(medium);
      // setMediumFoodPrice(createCards(medium));
      // console.log(high);
      // setHighFoodPrice(createCards(high));
      setLowFoodPrice(createCarousel(createCards(low)));
      setMediumFoodPrice(createCarousel(createCards(medium)));
      setHighFoodPrice(createCarousel(createCards(high)));
    },
    [createCarousel]
  );

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
              width: 300 + "px",
              height: 600 + "px",
              margin: 1 + "rem",
              backgroundColor: "white",
              color: "black",
            }}
            key={key.foodId}
          >
            <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                className="card-img-top"
                // src={Buffer.from(key.foodRetrieved.image).toString()}
                src={
                  key.image.data.length !== 0
                    ? Buffer.from(key.image).toString()
                    : "https://placehold.co/200x200"
                }
                alt="Food"
                style={{width: 200, height: 200, marginTop: 2 + "rem"}}
              />
              <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <h5 className="card-title ">{key.name}</h5>
                <div
                  style={{
                    height: "200px",
                    overflowY: "auto",
                    padding: 10 + "px",
                  }}
                >
                  <p>{key.description}</p>
                </div>

                <h6 className="card-subtitle mt-5">{key.price + " PHP"}</h6>
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
      <div style={{width: 100 + "%"}}>
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
