import { getClimateByRegion, listFarmsByUser } from '../services/dataService.js';
import { irrigationOptimizationAgent } from '../services/agentService.js';
import { ok } from './http.js';

export const handler = async (event) => {
  const regionId = event.regionId || process.env.DEFAULT_REGION_ID;
  const userId = event.userId || 'system';
  const [climate, farms] = await Promise.all([getClimateByRegion(regionId), listFarmsByUser(userId)]);
  return ok(irrigationOptimizationAgent(climate || {}, farms || []));
};
