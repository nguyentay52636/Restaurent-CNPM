import * as React from "react"
import { ChevronsRight } from "lucide-react"

import {
  DropdownMenu,


  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Sample teams data
const teams = [
  {
    name: "SGU restaurant",
    logo: "/images/Logo.png",
  },
]

export function TeamSwitcher() {


  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  const { open } = useSidebar()

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent items-center data-[state=open]:text-sidebar-accent-foreground py-10"
            >
              <div className="z-1 text-sidebar-primary-foreground flex aspect-square size-14 items-center justify-center rounded-lg">
                <img
                  alt="SGU Logo"
                  src={activeTeam.logo}
                  className={cn(open ? "w-12 h-12" : "w-6! h-6!", "transition-all duration-200 object-contain")}
                />
              </div>
              {open && (
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-bold text-md text-gray-600">{activeTeam.name}</span>
                </div>
              )}
              <SidebarTrigger className="cursor-pointer  transition-all duration-200 p-4!">
                <ChevronsRight className={cn(" size-8 font-medium bg-white rounded-full p-1 text-[#A27B5C]", {
                  "rotate-180": open
                })} />
              </SidebarTrigger>

            </SidebarMenuButton>
          </DropdownMenuTrigger>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
