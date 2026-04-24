# Misha Data Model (Canonical)

## 1) Core Entities

### Farmer
- `farmer_id` (UUID)
- `community_id`
- `cognito_sub`
- `preferred_language`
- `mfa_enabled` (bool)
- `created_at`, `updated_at`

### Farm
- `farm_id` (UUID)
- `farmer_id`
- `location_point` (lat/lon)
- `agro_ecological_zone`
- `soil_type`
- `primary_crops[]`

### ObservationEvent
- `event_id` (ULID)
- `community_id`
- `farm_id`
- `event_type` (rain_delay, pest_sighting, flood_marker, heat_stress, etc.)
- `value` + `unit`
- `observed_at`
- `ingested_at`
- `evidence_uri[]` (S3 object references)
- `trust_score`
- `verification_status`

### RiskAlert
- `alert_id`
- `hazard_type`
- `target_scope` (farm/community/region)
- `probability`
- `severity`
- `confidence`
- `recommended_actions[]`
- `issued_at`
- `expires_at`

### ClimateTwinProfile
- `twin_profile_id`
- `farm_id`
- `feature_vector_ref`
- `cluster_id`
- `updated_at`

### TwinMatch
- `match_id`
- `source_farm_id`
- `matched_farm_id`
- `similarity_score`
- `evidence_features[]`

### InterventionOutcome
- `intervention_id`
- `farm_id`
- `alert_id`
- `action_taken`
- `observed_outcome`
- `yield_delta_pct`
- `submitted_at`

## 2) Storage Mapping

- DynamoDB:
  - ObservationEvent, RiskAlert state, TwinMatch indexes
- Aurora Postgres:
  - Farmer, Farm, InterventionOutcome, geospatial joins
- S3:
  - evidence media, feature vectors, model artifacts, audit events

## 3) Retention

- Operational hot data: 24 months
- Aggregated analytics: 7+ years
- Security/audit logs: per policy and legal requirements (immutable tier)

