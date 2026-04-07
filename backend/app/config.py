import os
from dotenv import load_dotenv
load_dotenv()
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://blitzball:REDACTED_FOR_SECURITY@localhost:5432/blitzball",
)
APP_ENV = os.getenv("APP_ENV", "dev")
OTEL_EXPORTER_OTLP_ENDPOINT = os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT", "")