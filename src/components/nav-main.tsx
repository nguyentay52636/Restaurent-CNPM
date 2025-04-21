"use client"

import { useEffect, useState } from "react"
import { ChevronsRight, type LucideIcon } from "lucide-react"

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

  // Lắng nghe DOM class thay đổi (ví dụ .collapsed trên body)
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
    <SidebarGroup className="h-full flex flex-col justify-around">
      <SidebarGroupLabel>Tổng quan</SidebarGroupLabel>
      <SidebarMenu
        className={
          isCollapsed
            ? "flex flex-col gap-4 justify-around items-center !h-full"
            : "h-full flex flex-col justify-around"
        }
      >
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} className="text-center">
                  {item.icon && <item.icon className="!size-6" />}
                  <span>{item.title}</span>

                  <ChevronsRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild className=" text-center!">
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
