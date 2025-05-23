import { Button } from '@/components/ui/button';
import { Search, Menu, ShoppingCart, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { logout, selectAuth } from '@/redux/slices/authSlice';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navLinks = [
    { name: 'Trang Chủ', path: '/' },
    { name: 'Thực Đơn', path: '/products' },
    ...(user?.id ? [{ name: 'Lịch Sử Đơn Hàng', path: '/order-history' }, { name: 'Đặt bàn', path: '/reservation' }] : []),
    ,
  ];
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='sticky top-0 z-50 bg-[#FFF2E1]/90 backdrop-blur-md py-4 px-6 
                 border-b-2 border-orange-200 shadow-lg shadow-orange-100'
    >
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* Logo */}
        <div className='flex  items-center  mx-2 justify-center'>
          <img src='/public/images/Logo.png' alt='' className='mx-2' />

          <h1 className='text-2xl font-bold text-orange-700 tracking-wide'>SGU Restaurant</h1>
        </div>

        {/* Navigation */}
        <nav
          className={`${isMobileMenuOpen ? 'flex' : 'hidden'
            } md:flex flex-col md:flex-row absolute  md:static top-16 left-0 w-full md:w-auto bg-[#FFF2E1] md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8 transition-all duration-300`}
        >
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant='link'
                className='text-black hover:text-orange-500 cursor-pointer text-lg font-medium p-0 transition-transform duration-200 hover:scale-105'
              >
                {link.name}
              </Button>
            </Link>
          ))}
          {user?.roleId === 1 && (
            <Link to={'/admin/home'} onClick={() => setIsMobileMenuOpen(false)}>
              <Button
                variant='link'
                className='text-black hover:text-orange-500 cursor-pointer text-lg font-medium p-0 transition-transform duration-200 hover:scale-105'
              >
                Quản Lý
              </Button>
            </Link>
          )}
        </nav>

        {/* Right section */}
        <div className='flex items-center space-x-4'>
          {/* Search button */}
          <Button
            variant='ghost'
            className='p-2 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors cursor-pointer'
          >
            <Search className='w-6 h-6 text-white' />
          </Button>

          {/* Login */}
          {!isAuthenticated ? (
            <Link to='/auth/login'>
              <Button className='cursor-pointer bg-orange-500 text-white hover:bg-orange-600 font-medium shadow-md rounded-full px-4 py-2 transition-colors'>
                Đăng Nhập
              </Button>
            </Link>
          ) : (
            <>
              <div className='flex items-center gap-2 cursor-pointer'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='relative h-10 w-10 rounded-full p-0'>
                      <Avatar>
                        <AvatarImage src='https://cdn-icons-png.flaticon.com/512/3001/3001764.png' />
                        <AvatarFallback>{user?.email?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56 cursor-pointer' align='end' forceMount>
                    <DropdownMenuItem className='flex items-center gap-2'>
                      <User className='h-4 w-4' />
                      <Link to='/profile'>Chi tiết tài khoản</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='flex items-center gap-2 text-red-600'
                      onClick={() => dispatch(logout())}
                    >
                      <LogOut className='h-4 w-4' />
                      <span>Đăng xuất</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <h1 className='text-lg font-medium text-orange-500'> {user?.fullName}</h1>
              </div>
            </>
          )}

          {/* Hamburger Menu */}
          <button
            className='md:hidden p-2 hover:bg-orange-100 rounded-full'
            onClick={toggleMobileMenu}
          >
            <Menu className='w-6 h-6 text-orange-500' />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
