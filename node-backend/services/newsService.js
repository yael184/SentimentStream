require("dotenv").config();
const axios = require("axios");

const NEWS_API_KEY = process.env.NEWS_API_KEY || "";
const NEWS_API_COUNTRY = process.env.NEWS_API_COUNTRY || "us";
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

let headlines = [];
let index = 0;

// טוען כותרות חדשות מהAPI (אם יש API key), אחרת משתמש בכותרות ברירת מחדל
async function fetchHeadlines() {
  if (!NEWS_API_KEY) {
    console.warn("NEWS_API_KEY not set — using fallback headlines.");
    headlines = [
      "Tech stocks rally after strong earnings",
      "Global markets fall amid recession fears",
      "New AI tool promises productivity boost",
      "Major security breach affects millions of users"
    ];
    return;
  }

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        country: NEWS_API_COUNTRY,
        apiKey: NEWS_API_KEY
      }
    });

    if (response.data && Array.isArray(response.data.articles)) {
      headlines = response.data.articles
        .map(article => article.title)
        .filter(Boolean);
      console.log(`Loaded ${headlines.length} headlines from NewsAPI`);
    } else {
      throw new Error("Invalid response from NewsAPI");
    }
  } catch (error) {
    console.error("Error fetching headlines:", error.message);
    // אם יש שגיאה, השתמש בכותרות ברירת מחדל
    headlines = [
      "Tech stocks rally after strong earnings",
      "Global markets fall amid recession fears",
      "New AI tool promises productivity boost",
      "Major security breach affects millions of users"
    ];
  }
}

function getNextHeadline() {
  if (headlines.length === 0) {
    return "No headlines available";
  }
  const headline = headlines[index % headlines.length];
  index++;
  return headline;
}

// טוען כותרות בעת הפעלת השרת (לא חוסם)
fetchHeadlines();

// טוען כותרות חדשות כל שעה
setInterval(fetchHeadlines, 3600000);

module.exports = { getNextHeadline };
