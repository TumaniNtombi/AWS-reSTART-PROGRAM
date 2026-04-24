import { listFarmsByUser } from '../services/dataService.js';
import { ok } from './http.js';

export const handler = async (event) => {
  const userId = event.requestContext?.authorizer?.claims?.sub;
  const farms = await listFarmsByUser(userId);
  return ok({ farms });
};
