import { getClimateByRegion } from '../services/dataService.js';
import { ok } from './http.js';

export const handler = async (event) => {
  const regionId = event.requestContext?.authorizer?.claims?.['custom:regionId'] || process.env.DEFAULT_REGION_ID;
  const climate = await getClimateByRegion(regionId);

  return ok({
    regionId,
    riskScore: climate?.riskScore ?? 42,
    rainfall: climate?.rainfall ?? 20,
    temperature: climate?.temperature ?? 31,
    alerts: [
      'Possible rainfall volatility in next 48 hours',
      'Monitor pest risk in low-soil-health farms'
    ]
  });
};
