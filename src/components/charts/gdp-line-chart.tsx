'use client';

import type { GdpDataPoint, CountryStat } from '@/lib/types';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GdpLineChartProps {
  data: GdpDataPoint[];
  countryName?: string;
}

const chartConfig = {
  gdp: {
    label: 'GDP (Trillions USD)',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function GdpLineChart({ data, countryName }: GdpLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle>GDP Over Time {countryName ? `for ${countryName}` : ''}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No GDP data available{countryName ? ` for ${countryName}` : ''}. Select a country to view its GDP history.</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map(item => ({ ...item, gdp: item.value }));

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle>GDP Over Time {countryName ? `for ${countryName}` : ''}</CardTitle>
        <CardDescription>Trend of Gross Domestic Product in trillions USD.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="gdp" stroke="var(--color-gdp)" strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
