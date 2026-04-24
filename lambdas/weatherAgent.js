import { getClimateByRegion } from '../services/dataService.js';
import { weatherIntelligence } from '../services/agentService.js';
import { ok } from './http.js';

export const handler = async (event) => {
  const regionId = event.regionId || process.env.DEFAULT_REGION_ID;
  const climate = await getClimateByRegion(regionId);
  return ok(weatherIntelligence(climate || {}));
};
