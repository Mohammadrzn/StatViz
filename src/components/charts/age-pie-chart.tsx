'use client';

import type { AgeDistributionDataPoint, CountryStat } from '@/lib/types';
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AgePieChartProps {
  data: AgeDistributionDataPoint[];
  countryName?: string;
}

const defaultChartConfig = {
  percentage: {
    label: 'Percentage',
  },
  // Define colors for specific age groups if needed, otherwise Recharts assigns them
  "0-14 years": { label: "0-14 years", color: "hsl(var(--chart-1))" },
  "15-64 years": { label: "15-64 years", color: "hsl(var(--chart-2))" },
  "65+ years": { label: "65+ years", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;


export function AgePieChart({ data, countryName }: AgePieChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>Age Distribution {countryName ? `for ${countryName}` : ''}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No age distribution data available{countryName ? ` for ${countryName}` : ''}. Select a country to view its age demographics.</p>
        </CardContent>
      </Card>
    );
  }
  
  const chartData = data.map(item => ({ name: item.group, value: item.percentage, fill: defaultChartConfig[item.group as keyof typeof defaultChartConfig]?.color || `hsl(var(--chart-${Math.floor(Math.random() * 5) + 1}))`  }));
  const chartConfig = { ...defaultChartConfig, ...data.reduce((acc, item) => {
    acc[item.group] = { label: item.group, color: chartData.find(d => d.name === item.group)?.fill };
    return acc;
  }, {} as ChartConfig)};

  return (
    <Card className="shadow-lg rounded-lg flex flex-col">
      <CardHeader>
        <CardTitle>Age Distribution {countryName ? `for ${countryName}` : ''}</CardTitle>
        <CardDescription>Proportion of population by age group.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ percent, name }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" className="flex justify-center" />}
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{paddingTop: '20px'}}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
