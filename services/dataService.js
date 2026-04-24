import { GetCommand, PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { docClient } from './dynamoClient.js';

const FARMS_TABLE = process.env.FARMS_TABLE;
const CLIMATE_TABLE = process.env.CLIMATE_TABLE;

export async function getClimateByRegion(regionId) {
  const result = await docClient.send(
    new GetCommand({
      TableName: CLIMATE_TABLE,
      Key: { regionId }
    })
  );
  return result.Item;
}

export async function listFarmsByUser(userId) {
  const result = await docClient.send(
    new QueryCommand({
      TableName: FARMS_TABLE,
      KeyConditionExpression: 'farmId = :farmId and userId = :userId',
      ExpressionAttributeValues: {
        ':farmId': `${userId}-portfolio`,
        ':userId': userId
      }
    })
  );

  if ((result.Items || []).length > 0) {
    return result.Items;
  }

  const fallback = await docClient.send(new ScanCommand({ TableName: FARMS_TABLE, Limit: 20 }));
  return fallback.Items || [];
}

export async function upsertFarmRecord(userId, payload) {
  const now = new Date().toISOString();
  const item = {
    farmId: payload.farmId,
    userId,
    location: payload.location,
    cropType: payload.cropType,
    soilHealth: payload.soilHealth,
    lastUpdated: now
  };

  await docClient.send(
    new PutCommand({
      TableName: FARMS_TABLE,
      Item: item
    })
  );

  return item;
}
