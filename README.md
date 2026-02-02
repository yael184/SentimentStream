# Sentiment Streamer

Small demo project that streams news headlines and sentiment analysis.

Structure
- `node-backend/` - Node.js socket server that fetches news headlines and emits `sentiment_update` events.
- `python-sentiment-service/` - FastAPI service that analyzes sentiment (VADER) and exposes `/analyze`.
- `frontend/` - Simple client that connects to the Node backend.

Quickstart (Windows PowerShell)

1) Node backend

```powershell
cd "node-backend"
copy .env.example .env    # then open .env and fill NEWS_API_KEY
npm install
npm start
```

2) Python sentiment service

This project uses a virtualenv at `.venv` in this workspace. If you need to recreate:

```powershell
cd "python-sentiment-service"
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirement.txt
.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

Open the FastAPI docs at `http://localhost:8000/docs` and the Node server at `http://localhost:3001` (socket server).

Environment
- `node-backend/.env.example` contains required env vars for the Node backend (e.g. `NEWS_API_KEY`). Copy to `.env` and set your key.

Notes
- If the Node service falls back to default headlines, it means the `NEWS_API_KEY` wasn't loaded — ensure `.env` exists in `node-backend` and you start the server from that folder.
- Consider Dockerizing the services and adding CI, caching, and retries for production use.

License & contacts
- No license specified. Add a license file if you plan to open-source.
