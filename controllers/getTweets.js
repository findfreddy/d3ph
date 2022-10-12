const needle = require("needle");

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointUrl =
  "https://api.twitter.com/2/tweets/search/recent?query=war%2C+taiwan&max_results=100&tweet.fields=author_id%2Cconversation_id%2Cin_reply_to_user_id&media.fields=public_metrics%2Cnon_public_metrics&user.fields=name%2Ccreated_at%2Cusername%2Cid%2Clocation%2Cverified&place.fields=country_code";

async function getRequest() {
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned
  const params = {
    query: "war,Taiwan,china",
    "tweet.fields": "author_id,"
  };

  const res = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`
    }
  });

  if (res.body) {
    console.log(res.body);
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

(async () => {
  try {
    // Make request
    const response = await getRequest();

    // send the data to mongodb
    //foreach object in tweets array create/add a document into the collection d3phcom.tweets
    //check to make sure no duplicates added

    // tweets.create=(response);
    //
    // tweets.forEach(tweet => {
    //     tweets.createDoc(mongodb collection.tweets);
    // });

    //foreach object in tweets array create/add a document into the collection d3phcom.tweets
    //check to make sure no duplicates added

    //cronjob to check for new tweets every minute
    //cronjob to check for new users elements every day (1 time)

    console.dir(response, {
      depth: null
    });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();
