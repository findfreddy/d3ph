// Require Packages
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const hbs = require("hbs");
const hbsUtils = require("hbs-utils")(hbs);
const methodOverride = require("method-override");
require("dotenv").config();

// Build the App
const app = express();

// View Engine (Handlebars)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.set("view options", { layout: "layout" });
hbs.registerPartials(__dirname + "/views/partials", err => {});
hbsUtils.registerWatchedPartials(__dirname + "/views/partials");

// Middleware
app.use(logger("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Database
mongoose.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Connected to MongoDB");
  }
);

// Routes
// Create route for search page

// app.get("/", (req, res) => {
//   res.render("index");
//   console.log("***its working***");
// });

// Use this next
// app.use('/', require('./controllers/search'))

//TWITTER APP GET REQUEST

// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

// SENTIMENT GOOGLE
// axios.post(
//   "https://language.googleapis.com/v1/documents:analyzeEntities?key=AIzaSyAHSD9kpAhy9QlHM7MQqTTdR-2582zcBgk",
//   {
//     //this is the body of the request GOOGLE API DOC FORMAT
//     firstName: "Fred",
//     lastName: "Flintstone"
//   }
// );

// // Catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

// Error Handler

app.use((err, req, res, next) => {
  next(createError(404));

  // Only provides full error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.coder = req.coder;
  res.locals.hideSearch = true;
  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => {
  console.log("App running on PORT " + process.env.PORT);
});

module.exports = app;
