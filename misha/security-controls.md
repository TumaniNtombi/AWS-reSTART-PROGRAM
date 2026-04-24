# Misha Security Controls (High Assurance)

## 1) Security Principles

- Zero Trust by default
- Defense in depth across identity, network, data, and application layers
- Least privilege and just-in-time access
- Continuous verification and runtime monitoring
- Cryptographic integrity and immutable audit trails

## 2) Identity, Authentication, and MFA

### Cognito Baseline
- Separate User Pools by environment (`dev`, `staging`, `prod`)
- Mandatory MFA for all human users
  - Preferred: TOTP app authenticator
  - Fallback: SMS OTP with fraud/rate controls
- Password policy: high entropy + breached password checks
- Device tracking + adaptive risk-based authentication

### Authorization
- RBAC + ABAC hybrid:
  - Role claims: farmer, officer, analyst, admin, auditor
  - Attribute claims: country, cooperative, community, entitlement tier
- API authorization policy checks both role and tenant attributes
- Fine-grained data access filters in query layer

## 3) Data Security

- Encryption at rest: KMS CMKs for S3, DynamoDB, Aurora, logs, backups
- Encryption in transit: TLS 1.2+ everywhere (mTLS for service-to-service where feasible)
- Tokenization/pseudonymization for sensitive personal fields
- Immutable evidence storage via S3 Object Lock (compliance mode for critical logs)
- Cross-account backup vaulting with AWS Backup and periodic restore tests

## 4) Network Security

- Private VPC subnets for application/data tiers
- No public database endpoints
- VPC endpoints for AWS services (S3, DynamoDB, Secrets Manager, KMS)
- Security groups deny-by-default
- AWS WAF + Shield Advanced for API endpoints
- DDoS and bot mitigation policies

## 5) Application Security

- Secure SDLC with threat modeling per feature
- IaC scanning (Checkov/tfsec/cfn-lint) in CI
- SAST/DAST and dependency vulnerability scans
- Secret zero policy: credentials only in Secrets Manager / Parameter Store
- Signed artifacts and provenance tracking for deployables

## 6) Monitoring, Detection, and Response

- Organization-level CloudTrail aggregation
- GuardDuty findings triaged by severity in Security Hub
- CloudWatch alarms on abnormal auth failures and privilege escalations
- Incident runbooks with blast-radius containment steps
- Forensic-ready logs with deterministic correlation IDs

## 7) AI/Agent Safety and Data Integrity

- Retrieval-augmented responses only from approved, versioned knowledge stores
- No direct free-form model responses for high-stakes decisions without evidence
- Confidence thresholds + abstain policy + mandatory human review for low confidence
- Prompt injection filtering and content provenance checks
- Model and dataset lineage recorded in immutable audit store

## 8) Compliance Mapping (Examples)

- ISO 27001 controls for ISMS and access management
- NIST CSF functions (Identify, Protect, Detect, Respond, Recover)
- Regional data residency controls where required by country policy

