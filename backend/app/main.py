from fastapi import FastAPI

app = FastAPI(title="Blitzball API")

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

@app.get("/readyz")
def readyz():
    return {"status": "ready"}