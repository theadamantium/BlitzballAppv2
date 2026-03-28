import os
from dotenv import load_dotenv
load_dotenv()
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://blitzball:blitzball_dev_password@localhost:5432/blitzball",
)
APP_ENV = os.getenv("APP_ENV", "dev")
OTEL_EXPORTER_OTLP_ENDPOINT = os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT", "")