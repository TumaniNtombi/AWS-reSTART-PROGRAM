# API Gateway Configuration

- API Type: **HTTP API (API Gateway v2)**
- Authorizer: Cognito JWT authorizer (`ClimateApi.Auth.Authorizers.CognitoAuthorizer`)
- Identity source: `Authorization` header bearer token
- Protected routes:
  - `GET /dashboard`
  - `GET /farm-data`
  - `GET /agents`
  - `POST /update-farm`
- CORS:
  - Allowed Origins: `*` (tighten to frontend domain in production)
  - Allowed Methods: `GET, POST, OPTIONS`
  - Allowed Headers: `Authorization, Content-Type`
