# Blitzball App v2: OTel-Native Observability Lab

## Overview
A production-grade cloud-native application built to demonstrate the power of **OpenTelemetry (OTel)** and **Kubernetes (k3s)**. 
This project transforms a [legacy JSON-based Blitzball stat tool](https://github.com/theadamantium/BlitzballApp) into a distributed system with full observability coverage.

## Architecture
- **Backend:** FastAPI (Python) - Auto-instrumented with OTel SDK.
- **Database:** PostgreSQL - Tracks 60 players, 900+ stat snapshots, and techniques.
- **Infrastructure:** k3s (Lightweight Kubernetes) running on Ubuntu build.
- **Observability Stack (LGTM):**
  - **Loki:** Log aggregation.
  - **Grafana:** Unified visualization.
  - **Tempo:** Distributed tracing.
  - **Prometheus:** Metric storage.

## Key Features & Learning Milestones
- **Vendor-Neutral Telemetry:** Implemented a central **OTel Collector** to route logs, metrics, and traces without proprietary agents—proving the Dash0 value proposition.
- **Log-to-Trace Correlation:** Configured structured logging to allow 1-click jumps from a log line to a specific request trace in Grafana.
- **Infrastructure as Code:** All services deployed via Helm charts and custom YAML manifests.
