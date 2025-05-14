export interface GdpDataPoint {
  year: number;
  value: number; // in trillions USD
}

export interface AgeDistributionDataPoint {
  group: string;
  percentage: number;
}

export interface CountryStat {
  id: string;
  name: string;
  population: number; // in millions
  gdpHistory: GdpDataPoint[];
  ageDistribution: AgeDistributionDataPoint[];
}

export type ChartData = Record<string, string | number>[];

export type DataKey = keyof CountryStat | keyof GdpDataPoint | keyof AgeDistributionDataPoint;
