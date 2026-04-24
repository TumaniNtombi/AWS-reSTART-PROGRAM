import { upsertFarmRecord } from '../services/dataService.js';
import { badRequest, ok } from './http.js';

export const handler = async (event) => {
  const userId = event.requestContext?.authorizer?.claims?.sub;
  const payload = JSON.parse(event.body || '{}');

  if (!payload.farmId || !payload.location || !payload.cropType || !payload.soilHealth) {
    return badRequest('farmId, location, cropType, and soilHealth are required.');
  }

  const saved = await upsertFarmRecord(userId, payload);
  return ok({ success: true, farm: saved });
};
