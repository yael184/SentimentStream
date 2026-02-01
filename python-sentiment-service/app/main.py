from fastapi import FastAPI
from .models import SentimentRequest, SentimentResponse
from .sentiment import analyze_sentiment

app = FastAPI(title="Sentiment Analysis Service")

@app.post("/analyze", response_model=SentimentResponse)
def analyze(request: SentimentRequest):
    score, label = analyze_sentiment(request.text)
    return {
        "text": request.text,
        "score": score,
        "label": label
    }
