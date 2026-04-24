import { listFarmsByUser } from '../services/dataService.js';
import { soilHealthAgent } from '../services/agentService.js';
import { ok } from './http.js';

export const handler = async (event) => {
  const userId = event.userId || 'system';
  const farms = await listFarmsByUser(userId);
  return ok(soilHealthAgent(farms || []));
};
