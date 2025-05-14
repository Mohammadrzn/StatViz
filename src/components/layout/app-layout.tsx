import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { StatVizLogo } from '@/components/icons/logo';
import type { CountryStat } from '@/lib/types';
import { Home, Settings, BarChart3, Users, Palette } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';


interface AppLayoutProps {
  children: ReactNode;
  countries: CountryStat[];
  selectedCountryId: string | null;
  onSelectCountry: (countryId: string | null) => void;
}

function LayoutContent({ children, countries, selectedCountryId, onSelectCountry }: AppLayoutProps) {
  const { setOpenMobile } = useSidebar();

  const handleCountryClick = (countryId: string | null) => {
    onSelectCountry(countryId);
    setOpenMobile(false); // Close mobile sidebar on selection
  };
  
  return (
    <>
      <Sidebar defaultOpen={true} collapsible="icon" variant="sidebar" side="left">
        <SidebarHeader className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <StatVizLogo className="h-8 w-auto" />
          </Link>
          <SidebarTrigger className="md:hidden" />
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => handleCountryClick(null)}
                isActive={selectedCountryId === null}
                tooltip="Overview"
              >
                <BarChart3 />
                <span>Overview</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {countries.map((country) => (
              <SidebarMenuItem key={country.id}>
                <SidebarMenuButton
                  onClick={() => handleCountryClick(country.id)}
                  isActive={selectedCountryId === country.id}
                  tooltip={country.name}
                >
                  <span className="w-4 h-4 text-center">{country.name.substring(0,1)}</span> {/* Placeholder for flag/icon */}
                  <span>{country.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4 flex items-center justify-between">
           <ThemeToggle />
           <span className="text-xs text-sidebar-foreground/70">© StatViz 2024</span>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:justify-end">
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
          {/* Add any header content for the main area if needed */}
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}


export function AppLayout({ children, countries, selectedCountryId, onSelectCountry }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <LayoutContent 
        countries={countries} 
        selectedCountryId={selectedCountryId} 
        onSelectCountry={onSelectCountry}
      >
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
}
