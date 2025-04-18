import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";

export default function Header() {
  return (
    <header className="flex h-24 w-full shrink-0 items-center px-4 md:px-6 bg-[#F5E8D3] shadow-md">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden bg-white hover:bg-[#EAD9C2] border-[#A27B5C] rounded-full shadow-sm transition-all duration-200"
          >
            <MenuIcon className="h-6 w-6 text-[#5A3E2B]" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] bg-[#EAD9C2] p-6 shadow-lg">
          <div className="mb-8 flex justify-center">
            <img
              src="/public/logo-cnpm-preview.png"
              alt="Logo"
              className="w-32 h-auto object-contain"
            />
          </div>
          <div className="grid gap-4">
            {["Trang Chủ", "Sản phẩm", "Giới thiệu", "Portfolio", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center py-3 px-4 text-lg font-medium text-[#5A3E2B] hover:bg-[#D9C6A5] hover:text-[#4A3223] rounded-lg transition-all duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex justify-around items-center w-full">
        <div className="flex items-center">
          <img
            src="/public/logo-cnpm-preview.png"
            alt="Logo"
            className="w-32 h-auto object-contain"
          />
        </div>
        <NavigationMenu className="hidden lg:flex space-x-2">
          <NavigationMenuList className="flex space-x-20">
            {["Trang Chủ", "Sản phẩm", "Giới thiệu", "Portfolio", "Contact"].map((item) => (
              <NavigationMenuLink key={item} asChild>
                <div>
                  <Button className="group inline-flex h-10 items-center justify-center bg-transparent px-6 py-6 text-sm font-semibold text-[#5A3E2B] hover:bg-[#EAD9C2] hover:text-[#4A3223] transition-all duration-200 text-[1rem]">
                    {item}
                  </Button>
                </div>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center">
          <Button
            className="bg-[#5A3E2B] hover:bg-[#4A3223] text-white font-semibold py-4 px-6 rounded-full shadow-md transition-all duration-200 cursor-pointer"
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}