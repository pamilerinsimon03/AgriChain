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
import FarmerDashboard from './FarmerDashboard';
import { users } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/input';

const roleToComponent: Record<UserRole, React.ComponentType<any>> = {
  Cooperative: CooperativeDashboard,
  Warehouse: WarehouseDashboard,
  Buyer: BuyerDashboard,
  Lender: LenderDashboard,
  Regulator: RegulatorDashboard,
  Farmer: FarmerDashboard,
};

export default function DashboardPage() {
  const [activeRole, setActiveRole] = useState<UserRole>('Cooperative');

  const CurrentDashboard = roleToComponent[activeRole];
  const currentUser = users.find(u => u.role === activeRole);

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
  };

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
                  <SelectItem value="Farmer">Farmer</SelectItem>
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
        <header className="flex items-center justify-between p-4 border-b h-16">
          <div className="flex items-center gap-4">
             <SidebarTrigger className="md:hidden" />
             <div className="hidden md:flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                {activeRole} Dashboard
                </h1>
             </div>
          </div>
           <div className="md:hidden text-lg font-bold">{activeRole}</div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8" />
            </div>
             <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
             </Button>
          </div>
        </header>
        <main className="flex-1 p-4 overflow-auto md:p-6 bg-secondary/40">
          <CurrentDashboard onRoleChange={handleRoleChange} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
