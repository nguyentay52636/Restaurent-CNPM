"use client"

import { useEffect, useState } from "react"
import { ChevronsRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)


  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hasCollapsedClass = document.body.classList.contains("collapsed")
      setIsCollapsed(hasCollapsedClass)
    })

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })

    // cleanup
    return () => observer.disconnect()
  }, [])

  return (
    <SidebarGroup >
      <SidebarGroupLabel>Tổng quan</SidebarGroupLabel>
      <SidebarMenu
        className={cn(
          "flex flex-col",
          isCollapsed
            ? "h-full py-6 space-y-6 items-center"
            : "h-full justify-around"
        )}
      >
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="w-full">
                <SidebarMenuButton tooltip={item.title} className={cn(
                  "text-center transition-all duration-300 flex items-center justify-center",
                  isCollapsed ? "hover:bg-white rounded-xl p-3 mx-2" : "hover:bg-primary hover:text-white"
                )}>
                  <div className="flex items-center justify-center">
                    <div className={cn(
                      "flex items-center justify-center",
                      isCollapsed && "w-10 h-10"
                    )}>
                      {item.icon && <item.icon className={cn("text-center cursor-pointer",
                        isCollapsed ? "!w-6 !h-6" : "!size-6"
                      )} />}
                    </div>
                  </div>

                  <span className="text-center font-normal group-data-[collapsible=icon]:hidden">{item.title}</span>
                  <ChevronsRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title} className=" rounded-2xl " >
                      <SidebarMenuSubButton asChild className=" py-2! hover:text-white! cursor-pointer hover:bg-primary!">
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
