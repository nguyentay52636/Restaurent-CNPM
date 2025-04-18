import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <div className="flex-1">
        {children || <Outlet />}
      </div>
      <Footer />
    </div>
  );
}
