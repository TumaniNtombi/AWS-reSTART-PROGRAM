import { listFarmsByUser, getClimateByRegion } from '../services/dataService.js';
import { weatherIntelligence, soilHealthAgent, irrigationOptimizationAgent } from '../services/agentService.js';
import { ok } from './http.js';

export const handler = async (event) => {
  const userId = event.requestContext?.authorizer?.claims?.sub;
  const regionId = event.requestContext?.authorizer?.claims?.['custom:regionId'] || process.env.DEFAULT_REGION_ID;

  const [farms, climate] = await Promise.all([listFarmsByUser(userId), getClimateByRegion(regionId)]);

  const agents = [
    weatherIntelligence(climate || {}),
    soilHealthAgent(farms || []),
    irrigationOptimizationAgent(climate || {}, farms || [])
  ];

  return ok({ agents });
};
