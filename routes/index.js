var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", async function(req, res, next) {
  // Twitter

  // let searchResults = await axios.get(
  //   "https://api.twitter.com/2/tweets/search/recent?query=war' headers: {'Authorization': Bearer AAAAAAAAAAAAAAAAAAAAAOwshgEAAAAAHriLJShnkBSUOnAlW1BbbRH5DOA%3DvWhH5ttyxXl7g33krHz6m6IPjeL57HLh8SQ76QBPR8yvin2SeP});

  // console.log(searchResults);

  // Watson

  // Render
  res.render("index", { title: "Express", searchResults });
});

module.exports = router;
