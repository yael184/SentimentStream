const axios = require("axios");

const SENTIMENT_API_URL = "http://localhost:8000/analyze";

async function analyzeSentiment(text) {
  const response = await axios.post(SENTIMENT_API_URL, { text });
  return response.data;
}

module.exports = { analyzeSentiment };
