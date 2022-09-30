var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', async function(req, res, next) {
	// Twitter

	let searchResults = await axios.get('https://api.twitter.com/2/tweets/search/recent?query=war')

	console.log(searchResults)

	// Watson

	// Render
  res.render('index', { title: 'Express', searchResults });
});

module.exports = router;
