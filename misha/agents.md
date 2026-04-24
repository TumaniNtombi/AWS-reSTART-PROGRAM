# Multi-Agent Framework for Misha

This document defines coordinated agents that operate under strict anti-hallucination and security constraints.

## 1) Shared Goal

Deliver accurate, timely, and evidence-backed climate resilience guidance that improves farmer outcomes while minimizing false alarms and unsafe recommendations.

## 2) Agent Set

1. **Ingestion Agent**
   - Validates incoming observations and metadata quality.
   - Detects malformed, duplicate, or suspicious events.

2. **Verification Agent**
   - Cross-checks farmer reports against nearby reports, weather streams, and satellite indicators.
   - Produces confidence intervals and inconsistency flags.

3. **Risk Scoring Agent**
   - Computes localized hazard probabilities and severity trajectories.
   - Triggers escalation when thresholds are crossed.

4. **Climate Twin Agent**
   - Builds and updates micro-climate signatures.
   - Finds statistically similar communities and extracts successful adaptation playbooks.

5. **Recommendation Agent**
   - Generates action plans constrained to approved agronomic knowledge base.
   - Must include evidence references and expected tradeoffs.

6. **Safety & Compliance Agent**
   - Enforces policy constraints (no unsupported claims, no unsafe pesticide advice, no privacy leakage).
   - Blocks or routes uncertain outputs to human experts.

7. **Audit Agent**
   - Records decision trace, source IDs, model versions, and confidence metrics.

## 3) Agent Coordination Pattern

- Orchestration: AWS Step Functions state machine
- Communication: EventBridge events with signed envelopes
- Shared memory: DynamoDB/Aurora with strict schema and provenance tags
- Failure handling:
  - retries with jitter
  - fallback to deterministic rule engine
  - human-in-the-loop queue for unresolved cases

## 4) No-Hallucination Policy

- Agents may only produce recommendations derived from:
  1) approved curated agronomy/climate datasets,
  2) validated local observations,
  3) registered model outputs.
- If evidence is insufficient:
  - agent abstains,
  - marks status `INSUFFICIENT_EVIDENCE`,
  - requests human review.
- Every response includes:
  - confidence score,
  - source provenance IDs,
  - timestamp and model version.

## 5) Clean Data Training and Governance

### Data Quality Pipeline
- Schema validation + unit normalization + geospatial sanity checks
- Outlier detection and adversarial input screening
- Duplicate suppression and sensor calibration checks
- Human QA sampling for edge cases

### Dataset Governance
- Versioned datasets in S3 with catalog metadata
- Data contracts for each producer system
- Bias and representativeness checks across regions/crops/genders
- Re-training approval gate requiring signed evaluation report

### Model Validation Gates
- Holdout and temporal backtesting
- False-negative sensitivity testing for critical hazards
- Explainability threshold checks
- Model registry promotion only if minimum safety metrics are met

## 6) Human Oversight

- Agronomist override panel for critical alerts
- Manual approval required for recommendations above defined risk level
- Continuous feedback capture from farmers on recommendation outcomes

