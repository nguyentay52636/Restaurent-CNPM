import * as React from 'react';
import {
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Calendar,
  CalendarDays,
  LucideIcon,
  MessageSquare,
  Home,
  Bot,
  BookOpen,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface SidebarItemType {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}

const sideBarItem: SidebarItemType[] = [
  {
    title: 'Quản lý đơn hàng',
    icon: CalendarDays,
    url: '#',
    items: [
      {
        title: 'Danh sách đơn hàng',
        url: '/admin/order',
      },
      {
        title: 'Lịch sử đơn hàng',
        url: '/admin/order-history',
      },
    ],
  },
];

const projects = [
  {
    name: 'Thiết kế kỹ thuật',
    url: '#',
    icon: Frame,
  },
  {
    name: 'Thống kê',
    url: '#',
    icon: PieChart,
  },
  {
    name: 'Du lịch',
    url: '#',
    icon: Map,
  },
];

const user = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible='icon' {...props} className='relative'>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sideBarItem} />
        <NavProjects projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
      <SidebarTrigger
        className={cn('hidden absolute top-[12px] -right-9 z-10 p-2 cursor-pointer', {
          'block rotate-360': !open,
        })}
      />
    </Sidebar>
  );
}
