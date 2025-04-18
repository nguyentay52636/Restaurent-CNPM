import { PropsWithChildren, useState } from 'react';
import SiderBarNavigate from '../components/SiderBarNavigate'
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Outlet } from 'react-router-dom';

export default function AdminPages({ children }: PropsWithChildren) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <SidebarProvider>
            <SiderBarNavigate>
                <main className=" overflow-y-auto bg-gray-100">
                    {children || <Outlet />}
                </main>
            </SiderBarNavigate>
        </SidebarProvider>
    )
}
