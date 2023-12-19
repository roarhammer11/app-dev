var cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}));

app.use(bodyParser.json({limit: "50mb"}));

const websiteRoutes = require("./route-components/routeComponent");

app.use("/api", websiteRoutes);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
