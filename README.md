# Climate Resilience Command Center for Farmers

Production-structured full-stack serverless AWS platform for climate-tech farm operations.

## Project Structure

- `frontend/` React web app (responsive command-center UI, Cognito auth, API-driven pages)
- `backend/` Node dependencies for Lambda runtime
- `lambdas/` API and agent Lambda handlers
- `services/` Shared DynamoDB and agent logic
- `infrastructure/` AWS SAM template + setup notes

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=https://<api-id>.execute-api.<region>.amazonaws.com
VITE_COGNITO_USER_POOL_ID=<user-pool-id>
VITE_COGNITO_CLIENT_ID=<client-id>
```

## Backend/Lambda Setup

```bash
cd backend
npm install
```

## Infrastructure Deployment (SAM)

```bash
sam build -t infrastructure/template.yaml
sam deploy --guided
```

## Endpoint Summary

- `GET /dashboard` climate risk + alerts
- `GET /farm-data` farm records
- `GET /agents` Weather/Soil/Irrigation agent insights
- `POST /update-farm` upsert farm records
