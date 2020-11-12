import axios from 'axios';

const API_URL = 'http://localhost:3001/tweets';

async function getAllTweets() {
  const res = await axios.get(API_URL);
  const tweets = res.data.map((tweet) => {
    return {
      id: tweet.id,
      value: tweet.value,
    };
  });

  return tweets;
}

async function insertTweet(tweet) {
  const response = await axios.post(API_URL, tweet);
  return response.data.id;
}
async function deleteTweet(tweet) {
  console.log(tweet);
  const response = await axios.delete(`${API_URL}/${tweet}`);

  return response.data;
}

export { getAllTweets, insertTweet, deleteTweet };
