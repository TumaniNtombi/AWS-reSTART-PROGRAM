export function weatherIntelligence(climate) {
  const severeHeat = climate.temperature > 35;
  return {
    name: 'Weather Intelligence Agent',
    insight: severeHeat
      ? 'Heat stress risk detected. Shift field labor and trigger shade protocols.'
      : 'Weather trend stable for crop operations this cycle.',
    confidence: severeHeat ? 89 : 78
  };
}

export function soilHealthAgent(farms) {
  const lowSoil = farms.filter((farm) => Number(farm.soilHealth) < 60).length;
  return {
    name: 'Soil Health Agent',
    insight:
      lowSoil > 0
        ? `${lowSoil} farms require nutrient correction and compost scheduling.`
        : 'Soil profile acceptable across monitored farms.',
    confidence: lowSoil > 0 ? 84 : 76
  };
}

export function irrigationOptimizationAgent(climate, farms) {
  const dry = climate.rainfall < 15;
  return {
    name: 'Irrigation Optimization Agent',
    insight: dry
      ? `Rainfall deficit detected. Increase drip cycles for ${farms.length} farms.`
      : 'Maintain current irrigation schedule.',
    confidence: dry ? 91 : 72
  };
}
