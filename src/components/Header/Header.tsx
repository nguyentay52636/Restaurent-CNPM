import { Button } from '@/components/ui/button';
import { Search, Menu, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const navLinks = [
  { name: 'Trang Chủ', path: '/' },
  { name: 'Thực Đơn', path: '/products' },
  { name: 'Đặt bàn', path: '/' },
  { name: 'Về Chúng Tôi', path: '/about' },
];

// Giả lập số lượng sản phẩm trong giỏ
const cartItemCount = 3;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          className={`${
            isMobileMenuOpen ? 'flex' : 'hidden'
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
          <Link to='/auth/login'>
            <Button className='cursor-pointer bg-orange-500 text-white hover:bg-orange-600 font-medium shadow-md rounded-full px-4 py-2 transition-colors'>
              Đăng Nhập
            </Button>
          </Link>

          {/* Cart */}
          <div className='relative hover:bg-white!'>
            <Button
              variant='ghost'
              className='p-2 rounded-full hover:bg-orange-100 transition-colors cursor-pointer '
            >
              <ShoppingCart className='w-8 h-8 text-orange-500' />
            </Button>
            {cartItemCount > 0 && (
              <span className='absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow'>
                {cartItemCount}
              </span>
            )}
          </div>

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
