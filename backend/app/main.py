from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.players import router as players_router
from app.api.techniques import router as techniques_router

app = FastAPI(title="Blitzball API")

# Add the CORS middleware to allow your frontend to talk to the backend
app.add_middleware(
    CORSMiddleware,
    # We include both the IP and localhost to be safe
    allow_origins=[
        "http://192.168.117.102:5173",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(players_router)
app.include_router(techniques_router)

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

@app.get("/readyz")
def readyz():
    return {"status": "ready"}