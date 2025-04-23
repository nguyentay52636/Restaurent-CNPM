import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronLeft,
  ChevronsRight,
  Frame,
  Map,
  PanelLeftClose,
  PieChart,
  Settings2,
  SquareTerminal,
  Calendar,
  CalendarDays,
  LucideIcon,
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

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },

  navMain: [
    {
      title: 'Trang chủ',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Giỏ hàng ',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: ' Đặt bàn',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '/admin/settable',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Đánh giá',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: 'admin/feedback',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
    },
    {
      title: 'Booking Manager',
      url: '/admin/booking',
      icon: Calendar,
      items: [
        {
          title: 'Categories',
          url: '/admin/booking',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Thống kê',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

const sideBarItem: SidebarItemType[] = [
  {
    title: 'Đơn hàng',
    icon: CalendarDays,
    url: '#',
    items: [
      {
        title: 'Quoản lý đơn hàng',
        url: '/admin/order',
      },
      {
        title: 'Lịch sử đơn hàng',
        url: '/admin/order-history',
      },
    ],
  },
  {
    title: 'Đặt bàn',
    icon: CalendarDays,
    url: '#',
    items: [
      {
        title: 'Quoản lý đặt bàn',

        url: '/admin/settable',
      },
    ],
  },
  {
    title: 'Đánh giá',
    icon: CalendarDays,
    url: '#',
    items: [
      {
        title: 'Đanh giá',
        url: '/admin/feedback',
      },
    ],
  },
  {
    title: 'Quoản lý sản phẩm',
    icon: CalendarDays,
    url: '#',
    items: [
      {
        title: 'Sản phẩm',
        url: '/admin/products',
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible='icon' {...props} className='relative bg-secondary!'>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className='bg-bg-secondary!'>
        <NavMain items={sideBarItem} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
      <SidebarTrigger
        className={cn('hidden absolute top-[12px] -right-9 z-10 p-2 cursor-pointer', {
          'block rotate-360': !open,
        })}
      >
        {/* <ChevronsRight className="size-8 z-2 cursor-pointer bg-[#FCF7EF]  rounded-sm p-1 " /> */}
      </SidebarTrigger>
    </Sidebar>
  );
}
