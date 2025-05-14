'use client';

import type { CountryStat } from '@/lib/types';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PopulationBarChartProps {
  data: CountryStat[];
  onBarClick: (countryId: string) => void;
  selectedCountryId: string | null;
}

const chartConfig = {
  population: {
    label: 'Population (Millions)',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function PopulationBarChart({ data, onBarClick, selectedCountryId }: PopulationBarChartProps) {
  if (!data || data.length === 0) {
    return <Card><CardHeader><CardTitle>Population Data</CardTitle></CardHeader><CardContent><p>No population data available.</p></CardContent></Card>;
  }
  
  const chartData = data.map(country => ({
    name: country.name,
    population: country.population,
    id: country.id,
    fill: country.id === selectedCountryId ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-1))',
  }));

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle>Population by Country</CardTitle>
        <CardDescription>Click on a bar to see detailed stats for that country.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300 + data.length * 10}> {/* Adjust height dynamically */}
            <BarChart 
              layout="vertical" 
              data={chartData} 
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              <XAxis type="number" dataKey="population" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={80} 
                tickLine={false} 
                axisLine={false} 
              />
              <ChartTooltip
                cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar 
                dataKey="population" 
                radius={4}
                onClick={(payload) => onBarClick(payload.id)}
              >
                 <LabelList dataKey="population" position="right" offset={8} className="fill-foreground text-xs" formatter={(value: number) => `${value.toFixed(1)}M`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
