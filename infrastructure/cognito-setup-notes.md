# Cognito Setup Notes

1. Deploy `infrastructure/template.yaml` with SAM.
2. Copy `UserPoolId` and `UserPoolClientId` outputs into frontend `.env`:
   - `VITE_COGNITO_USER_POOL_ID`
   - `VITE_COGNITO_CLIENT_ID`
3. Set `MfaConfiguration` to `OPTIONAL` (already configured) so challenge hooks are present, but users are not blocked.
4. Create app client without secret for browser-based login.
5. Add custom attribute `custom:regionId` to user profiles for region-aware climate queries.
