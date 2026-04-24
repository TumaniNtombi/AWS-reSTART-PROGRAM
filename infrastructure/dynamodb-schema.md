# DynamoDB Schema

## Users Table
- `userId` (PK, string)
- `email` (string)
- `role` (string)
- `createdAt` (ISO datetime)

## Farms Table
- `farmId` (PK, string)
- `userId` (SK, string)
- `location` (string)
- `cropType` (string)
- `soilHealth` (number/string)
- `lastUpdated` (ISO datetime)

## ClimateData Table
- `regionId` (PK, string)
- `riskScore` (number)
- `rainfall` (number)
- `temperature` (number)
- `timestamp` (ISO datetime)
