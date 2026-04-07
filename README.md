# Blitzball App v2: OTel-Native Observability Lab

## Overview
A production-grade cloud-native application built to demonstrate the power of **OpenTelemetry (OTel)** and **Kubernetes (k3s)**. 
This project manages Blitzball players and stats while providing a complete observability sandbox.

## Architecture
- **Backend:** FastAPI (Python) - Instrumented with OTel SDK.
- **Frontend:** React (TypeScript) - Built with Vite.
- **Database:** PostgreSQL 16 - Tracks players, snapshots, and techniques.
- **Observability (LGTM Stack):** Loki, Grafana, Tempo, and Prometheus.

---

## Getting Started (Local Development)

### 1. Prerequisites
- Docker & Docker Compose
- Python 3.11+ (for local backend development)
- Node.js 18+ (for local frontend development)

### 2. Configuration
Copy the template environment file and update your credentials:
```bash
cp .env.example .env
```
Edit `.env` to set your `POSTGRES_PASSWORD` and other variables. **Never commit your `.env` file.**

### 3. Spin up with Docker Compose
```bash
docker-compose up --build
```
- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend API: [http://localhost:8000](http://localhost:8000)
- API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## Deployment (Kubernetes / k3s)

This project is designed to run on a k3s cluster using Helm for orchestration.

### 1. Create Secrets
Before deploying, you must create a Kubernetes secret for the database connection:
```bash
kubectl create secret generic blitzball-backend-secrets \
  --from-literal=DATABASE_URL="postgresql+psycopg://blitzball:YOUR_PASSWORD@blitzball-postgres-postgresql.blitzball.svc.cluster.local:5432/blitzball" \
  -n blitzball
```

### 2. Install with Helm
Ensure your context is set to your k3s cluster, then run:
```bash
helm upgrade --install blitzball ./deploy/helm/blitzball \
  -n blitzball --create-namespace \
  -f postgres-values.yaml
```

---

## Security & Best Practices
- **Secret Management:** Sensitive data is never hardcoded. Local development uses `.env` files (ignored by git), and Kubernetes uses Opaque Secrets.
- **Database Migrations:** Managed by Alembic. Run `alembic upgrade head` to apply schema changes.
- **Observability:** Centralized OTel Collector routes all telemetry to the LGTM stack.
