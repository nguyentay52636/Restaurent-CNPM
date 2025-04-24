// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";

// export default function Header() {
//   return (
//     <header className="flex h-24 w-full shrink-0 items-center px-4 md:px-6 bg-[#F5E8D3] shadow-md">
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button
//             variant="outline"
//             size="icon"
//             className="lg:hidden bg-white hover:bg-[#EAD9C2] border-[#A27B5C] rounded-full shadow-sm transition-all duration-200"
//           >
//             <MenuIcon className="h-6 w-6 text-[#5A3E2B]" />
//             <span className="sr-only">Toggle navigation menu</span>
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left" className="w-[300px] bg-[#EAD9C2] p-6 shadow-lg">
//           <div className="mb-8 flex justify-center">
//             <img
//               src="/public/logo-cnpm-preview.png"
//               alt="Logo"
//               className="w-32 h-auto object-contain"
//             />
//           </div>
//           <div className="grid gap-4">
//             {["Trang Chủ", "Sản phẩm", "Giới thiệu", "Portfolio", "Contact"].map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 className="flex items-center py-3 px-4 text-lg font-medium text-[#5A3E2B] hover:bg-[#D9C6A5] hover:text-[#4A3223] rounded-lg transition-all duration-200"
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//         </SheetContent>
//       </Sheet>
//       <div className="flex justify-around items-center w-full">
//         <div className="flex items-center">
//           <img
//             src="/public/logo-cnpm-preview.png"
//             alt="Logo"
//             className="w-32 h-auto object-contain"
//           />
//         </div>
//         <NavigationMenu className="hidden lg:flex space-x-2">
//           <NavigationMenuList className="flex space-x-20">
//             {["Trang Chủ", "Sản phẩm", "Giới thiệu", "Portfolio", "Contact"].map((item) => (
//               <NavigationMenuLink key={item} asChild>
//                 <div>
//                   <Button className="group inline-flex h-10 items-center justify-center bg-transparent px-6 py-6 text-sm font-semibold text-[#5A3E2B] hover:bg-[#EAD9C2] hover:text-[#4A3223] transition-all duration-200 text-[1rem]">
//                     {item}
//                   </Button>
//                 </div>
//               </NavigationMenuLink>
//             ))}
//           </NavigationMenuList>
//         </NavigationMenu>
//         <div className="flex items-center">
//           <Button
//             className="bg-[#5A3E2B] hover:bg-[#4A3223] text-white font-semibold py-4 px-6 rounded-full shadow-md transition-all duration-200 cursor-pointer"
//           >
//             Đăng nhập
//           </Button>
//         </div>
//       </div>
//     </header>
//   );
// }

// function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </svg>
//   );
// }


// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Search, Menu } from "lucide-react";
// import { useState } from "react";

// const userAvatar = "https://via.placeholder.com/40x40.png?text=User";
// const navLinks = ["Trang Chủ", "Thực Đơn", "Ưu Đãi", "Dịch Vụ", "Về Chúng Tôi"];

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-[#FFF2E1] py-4 px-6 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Phần Logo */}
//         <div className="flex flex-col">
//           <h1 className="text-2xl font-bold text-black tracking-wide">SGU Restaurant</h1>
//           <div className="border-b-2 border-dashed border-orange-500 w-16 mt-1"></div>
//         </div>

//         {/* Các Liên Kết Điều Hướng */}
//         <nav
//           className={`${
//             isMobileMenuOpen ? "flex" : "hidden"
//           } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-[#FFF2E1] md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8 transition-all duration-300`}
//         >
//           {navLinks.map((link) => (
//             <Button
//               key={link}
//               variant="link"
//               className="text-black hover:text-orange-500 text-lg font-medium p-0"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               {link}
//             </Button>
//           ))}
//         </nav>

//         {/* Biểu Tượng và Menu Hamburger */}
//         <div className="flex items-center space-x-4">
//           {/* Biểu tượng tìm kiếm được chỉnh sửa */}
//           <Button
//             variant="ghost"
//             className="p-2 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
//           >
//             <Search className="w-8 h-8 text-white" /> 
//           </Button>
//           <Avatar>
//             <AvatarImage src={userAvatar} alt="Ảnh đại diện người dùng" />
//             <AvatarFallback className="bg-orange-200 text-orange-800">U</AvatarFallback>
//           </Avatar>
//           <button
//             className="md:hidden p-2 hover:bg-orange-100 rounded-full"
//             onClick={toggleMobileMenu}
//           >
//             <Menu className="w-6 h-6 text-orange-500" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Button } from "@/components/ui/button";
import { Search, Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = ["Trang Chủ", "Thực Đơn", "Đặt bàn", "Về Chúng Tôi"];

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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-[#FFF2E1]/90 backdrop-blur-md py-4 px-6 
                 border-b-2 border-orange-200 shadow-lg shadow-orange-100"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-black tracking-wide">
            SGU Restaurant
          </h1>
          <div className="border-b-2 border-dashed border-orange-500 w-16 mt-1"></div>
        </div>

        {/* Navigation */}
        <nav
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-[#FFF2E1] md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-8 transition-all duration-300`}
        >
          {navLinks.map((link) => (
            <Button
              key={link}
              variant="link"
              className="text-black hover:text-orange-500 text-lg font-medium p-0 transition-transform duration-200 hover:scale-105"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link}
            </Button>
          ))}
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Search button */}
          <Button
            variant="ghost"
            className="p-2 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
          >
            <Search className="w-6 h-6 text-white" />
          </Button>

          {/* Login */}
          <Button className="bg-orange-500 text-white hover:bg-orange-600 font-medium shadow-md rounded-full px-4 py-2 transition-colors">
            Đăng Nhập
          </Button>

          {/* Cart */}
          <div className="relative">
            <Button
              variant="ghost"
              className="p-2 rounded-full hover:bg-orange-100 transition-colors"
            >
              <ShoppingCart className="w-8 h-8 text-orange-500" />
            </Button>
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow">
                {cartItemCount}
              </span>
            )}
          </div>

          {/* Hamburger Menu */}
          <button
            className="md:hidden p-2 hover:bg-orange-100 rounded-full"
            onClick={toggleMobileMenu}
          >
            <Menu className="w-6 h-6 text-orange-500" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
