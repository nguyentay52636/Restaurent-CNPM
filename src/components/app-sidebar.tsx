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
          title: 'Lịch sử',
          url: '#',
        },
        {
          title: 'Đánh dấu',
          url: '#',
        },
        {
          title: 'Cài đặt',
          url: '#',
        },
      ],
    },
    {
      title: 'Giỏ hàng',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Khởi tạo',
          url: '#',
        },
        {
          title: 'Khám phá',
          url: '#',
        },
        {
          title: 'Lượng tử',
          url: '#',
        },
      ],
    },
    {
      title: 'Đặt bàn',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Giới thiệu',
          url: '/admin/settable',
        },
        {
          title: 'Bắt đầu',
          url: '#',
        },
        {
          title: 'Hướng dẫn',
          url: '#',
        },
        {
          title: 'Nhật ký thay đổi',
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
          title: 'Chung',
          url: 'admin/feedback',
        },
        {
          title: 'Nhóm',
          url: '#',
        },
        {
          title: 'Thanh toán',
          url: '#',
        },
        {
          title: 'Giới hạn',
          url: '#',
        },
      ],
    },
    {
      title: 'Quản lý đặt bàn',
      url: '/admin/booking',
      icon: Calendar,
      items: [
        {
          title: 'Danh mục',
          url: '/admin/booking',
        },
      ],
    },
  ],
  projects: [
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
  ],
};

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
  {
    title: 'Quản lý đặt bàn',
    icon: CalendarDays,
    url: '#',
    items: [
      {
        title: 'Đặt bàn',
        url: '/admin/settable',
      },
    ],
  },
  {
    title: 'Quản lý đánh giá',
    icon: CalendarDays,
    url: '#',
    items: [
      {
        title: 'Danh sách đánh giá',
        url: '/admin/feedback',
      },
    ],
  },
  {
    title: 'Quản lý sản phẩm',
    icon: CalendarDays,
    url: '#',
    items: [
      {
        title: 'Danh sách sản phẩm',
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
