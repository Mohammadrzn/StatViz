import type { CountryStat } from '@/lib/types';

export const publicStats: CountryStat[] = [
  {
    id: 'usa',
    name: 'USA',
    population: 331.9, // in millions
    gdpHistory: [
      { year: 2019, value: 21.38 },
      { year: 2020, value: 21.06 },
      { year: 2021, value: 23.32 },
      { year: 2022, value: 25.46 },
      { year: 2023, value: 27.36 },
    ],
    ageDistribution: [
      { group: '0-14 years', percentage: 18.2 },
      { group: '15-64 years', percentage: 65.2 },
      { group: '65+ years', percentage: 16.6 },
    ],
  },
  {
    id: 'canada',
    name: 'Canada',
    population: 38.25,
    gdpHistory: [
      { year: 2019, value: 1.74 },
      { year: 2020, value: 1.65 },
      { year: 2021, value: 2.00 },
      { year: 2022, value: 2.14 },
      { year: 2023, value: 2.22 },
    ],
    ageDistribution: [
      { group: '0-14 years', percentage: 16.0 },
      { group: '15-64 years', percentage: 65.7 },
      { group: '65+ years', percentage: 18.3 },
    ],
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    population: 67.33,
    gdpHistory: [
      { year: 2019, value: 2.83 },
      { year: 2020, value: 2.71 },
      { year: 2021, value: 3.13 },
      { year: 2022, value: 3.07 },
      { year: 2023, value: 3.33 },
    ],
    ageDistribution: [
      { group: '0-14 years', percentage: 17.7 },
      { group: '15-64 years', percentage: 63.7 },
      { group: '65+ years', percentage: 18.6 },
    ],
  },
  {
    id: 'germany',
    name: 'Germany',
    population: 83.2,
    gdpHistory: [
      { year: 2019, value: 3.89 },
      { year: 2020, value: 3.85 },
      { year: 2021, value: 4.26 },
      { year: 2022, value: 4.07 },
      { year: 2023, value: 4.46 },
    ],
    ageDistribution: [
      { group: '0-14 years', percentage: 13.8 },
      { group: '15-64 years', percentage: 64.1 },
      { group: '65+ years', percentage: 22.1 },
    ],
  },
  {
    id: 'japan',
    name: 'Japan',
    population: 125.7,
    gdpHistory: [
      { year: 2019, value: 5.12 },
      { year: 2020, value: 5.05 },
      { year: 2021, value: 4.94 },
      { year: 2022, value: 4.23 },
      { year: 2023, value: 4.41 },
    ],
    ageDistribution: [
      { group: '0-14 years', percentage: 11.9 },
      { group: '15-64 years', percentage: 59.2 },
      { group: '65+ years', percentage: 28.9 },
    ],
  },
];
