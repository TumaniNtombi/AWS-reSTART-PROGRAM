# Misha Architecture (Production-Grade)

## 1) System Context

**Primary users**
- Farmers (mobile app, low-bandwidth and offline mode)
- Extension officers and cooperatives
- Agronomists and climate analysts
- National/regional response teams

**Primary outcomes**
- Earlier warning lead times for climate shocks
- Improved adaptation decisions and peer learning
- Reduced crop losses and stronger food security

## 2) Core Domains

1. Observation Capture Domain (CCMN input)
2. Validation and Evidence Domain
3. Climate Risk Intelligence Domain
4. Climate Twin Domain
5. Recommendation and Intervention Domain
6. Security, Identity, and Governance Domain

## 3) AWS Logical Architecture

### Edge + Client
- Mobile apps (Android-first, multilingual + local dialect packs)
- Offline cache with signed sync bundles
- API Gateway + AWS WAF + Cognito authorizer

### Ingestion Layer
- `POST /observations`, `POST /incidents`, `POST /interventions`
- Lambda functions perform schema validation and PII redaction tags
- EventBridge routes validated events to downstream processors

### Data Layer
- **DynamoDB**
  - ObservationEvent table (partition key: `community_id`, sort key: `event_ts#event_id`)
  - AlertState table
  - TwinMatch table
- **Aurora PostgreSQL + PostGIS**
  - Farm metadata, geofences, intervention outcomes, geospatial joins
- **S3 Data Lake**
  - `/raw/`, `/curated/`, `/features/`, `/models/`, `/audit/`
  - Object Lock for immutable forensic and compliance data

### Processing + Intelligence
- Step Functions for deterministic workflows:
  1) observation normalization
  2) quality scoring
  3) consensus building (community corroboration)
  4) weather/satellite fusion
  5) risk scoring and trigger thresholds
  6) alert publication
- SageMaker pipelines for forecasting and matching model refresh
- Bedrock-managed LLM components for explanation generation only (never for unverified predictions)

### Notification + Collaboration
- SNS topics by country/region/community
- Channel adapters (SMS, WhatsApp, push, IVR fallback)
- Community bulletin feed in-app with signed alert cards and confidence

### Governance + Security
- Cognito User Pool + MFA required (TOTP/SMS depending risk policy)
- Cognito groups: `farmer`, `extension_officer`, `agronomist`, `admin`, `auditor`
- IAM policies scoped by tenant and geography claims (`country_code`, `coop_id`)
- CloudTrail, Config, Security Hub, GuardDuty, Detective

## 4) Key Data Flows

### A) Observation to Early Warning
1. Farmer submits observation with timestamp, geotag, crop context, and optional image/audio.
2. Ingestion validates payload + device signature + replay prevention token.
3. Quality service assigns trust score (history, consistency, sensor corroboration).
4. Fusion service combines local observations + weather API + satellite indices.
5. Risk engine computes hazard probability and severity.
6. If threshold exceeded, alert policy engine sends warning + adaptive playbooks.
7. Feedback loop captures whether warning was useful and outcome metrics.

### B) Climate Twin Matchmaking
1. Twin feature builder creates climate signature vectors per farm zone.
2. Matching engine identifies statistically similar micro-climates across regions.
3. Recommender ranks peer communities by successful adaptation outcomes.
4. Agent provides evidence-backed strategy summaries with source references.

## 5) Scalability and Reliability

- Multi-AZ Aurora + DynamoDB auto-scaling
- Active/standby multi-region with pilot-light failover
- SQS dead-letter queues for failed event processing
- Idempotent ingestion using deterministic request IDs
- RPO <= 15 minutes, RTO <= 60 minutes target

## 6) API Surface (Representative)

- `POST /v1/observations`
- `GET /v1/alerts?community_id=...`
- `GET /v1/climate-twins?farm_id=...`
- `POST /v1/interventions`
- `GET /v1/recommendations?hazard=flood&crop=maize`

All endpoints:
- Require JWT access token from Cognito
- Enforce tenant claim checks
- Write structured audit logs

