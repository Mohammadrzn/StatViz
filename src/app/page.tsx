'use client';

import { useState, useEffect, useMemo } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { PopulationBarChart } from '@/components/charts/population-bar-chart';
import { GdpLineChart } from '@/components/charts/gdp-line-chart';
import { AgePieChart } from '@/components/charts/age-pie-chart';
import type { CountryStat } from '@/lib/types';
import { publicStats as initialPublicStats } from '@/data/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

export default function StatVizPage() {
  const [statsData, setStatsData] = useState<CountryStat[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data fetching behavior
    setStatsData(initialPublicStats);
    // Optionally set a default selected country or leave as overview
    // if (initialPublicStats.length > 0) {
    //   setSelectedCountryId(initialPublicStats[0].id);
    // }
  }, []);

  const selectedCountry = useMemo(() => {
    return statsData.find(country => country.id === selectedCountryId) || null;
  }, [statsData, selectedCountryId]);

  const handleCountrySelect = (countryId: string | null) => {
    setSelectedCountryId(countryId);
  };

  if (statsData.length === 0) {
    return (
       <AppLayout 
        countries={statsData}
        selectedCountryId={selectedCountryId}
        onSelectCountry={handleCountrySelect}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-xl text-muted-foreground">Loading statistical data...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      countries={statsData}
      selectedCountryId={selectedCountryId}
      onSelectCountry={handleCountrySelect}
    >
      <div className="space-y-6">
        {selectedCountryId === null && (
          <Card className="shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle>Global Overview</CardTitle>
              <CardDescription>Select a country from the sidebar to view detailed statistics or explore the population comparison below.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Welcome to StatViz! This dashboard provides visualizations of public statistics. Use the sidebar to navigate and filter data.</p>
            </CardContent>
          </Card>
        )}

        <PopulationBarChart 
          data={statsData} 
          onBarClick={handleCountrySelect} 
          selectedCountryId={selectedCountryId}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <GdpLineChart 
            data={selectedCountry?.gdpHistory || []} 
            countryName={selectedCountry?.name} 
          />
          <AgePieChart 
            data={selectedCountry?.ageDistribution || []} 
            countryName={selectedCountry?.name} 
          />
        </div>
        
        {selectedCountryId && (
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => handleCountrySelect(null)}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Show All Countries Overview
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
