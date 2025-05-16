import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main className="min-w-full">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
}
