# API Request Flow Examples

## 1) Login Flow
1. Frontend calls Cognito `signUp` or `authenticateUser` directly.
2. Cognito returns JWT tokens.
3. Frontend stores session token and uses it in `Authorization: Bearer <JWT>`.

## 2) Dashboard Data Flow
1. React dashboard calls `GET /dashboard` through API Gateway.
2. API Gateway validates JWT via Cognito authorizer.
3. `getDashboard` Lambda loads climate record from DynamoDB.
4. API Gateway returns JSON to frontend.

## 3) Farm Update Flow
1. React farm form sends `POST /update-farm` with JSON body.
2. Cognito JWT is validated by API Gateway.
3. `updateFarm` Lambda writes item to `FarmsTable`.
4. Frontend refreshes data with `GET /farm-data`.
