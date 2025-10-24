"use client";

import { useState } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/icons/Logo';
import type { UserRole } from '@/lib/types';
import CooperativeDashboard from './CooperativeDashboard';
import WarehouseDashboard from './WarehouseDashboard';
import BuyerDashboard from './BuyerDashboard';
import LenderDashboard from './LenderDashboard';
import RegulatorDashboard from './RegulatorDashboard';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const roleToComponent: Record<UserRole, React.ComponentType> = {
  Cooperative: CooperativeDashboard,
  Warehouse: WarehouseDashboard,
  Buyer: BuyerDashboard,
  Lender: LenderDashboard,
  Regulator: RegulatorDashboard,
};

export default function DashboardPage() {
  const [activeRole, setActiveRole] = useState<UserRole>('Cooperative');

  const CurrentDashboard = roleToComponent[activeRole];
  const currentUser = users.find(u => u.role === activeRole);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Logo className="w-8 h-8 text-primary" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-sidebar-foreground">AgriChain</h2>
              <p className="text-xs text-sidebar-foreground/70">
                Trust in Agriculture
              </p>
            </div>
          </div>
        </SidebarHeader>
        <Separator className="bg-sidebar-border/50" />
        <SidebarContent className="p-4">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-sidebar-foreground/70">
                Select Role
              </label>
              <Select value={activeRole} onValueChange={(value: UserRole) => setActiveRole(value)}>
                <SelectTrigger className="w-full mt-1 bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cooperative">Cooperative</SelectItem>
                  <SelectItem value="Warehouse">Warehouse</SelectItem>
                  <SelectItem value="Buyer">Buyer</SelectItem>
                  <SelectItem value="Lender">Lender</SelectItem>
                  <SelectItem value="Regulator">Regulator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-3 rounded-lg bg-sidebar-accent/50">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${currentUser?.id}`} />
                        <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold text-sidebar-foreground">{currentUser?.name}</p>
                        <p className="text-xs text-sidebar-foreground/70">{currentUser?.role}</p>
                    </div>
                </div>
            </div>

          </div>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {activeRole} Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <SidebarTrigger className="md:hidden" />
          </div>
        </header>
        <main className="flex-1 p-4 overflow-auto md:p-6">
          <CurrentDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
