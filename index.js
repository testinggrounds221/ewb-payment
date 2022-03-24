// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bp = require("body-parser");
const axios = require("axios");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
dotenv.config();
/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/register.html"));
});

app.post("/postdata", (req, res) => {
  postData(req.body);
  res.sendStatus(200);
});
/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

function postData(data) {
  let conn = process.env.BACKEND_CONNECTION_URL;

  axios({
    method: "patch",
    url: conn + "/users",
    data: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  }).then(function (response) {
    return;
  });
}
