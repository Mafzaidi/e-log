"use client"

import { MailIcon, PlusCircleIcon } from "lucide-react"
import iconMapping from "@/lib/icon-mapping"
import Link from "next/link"

// import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: string
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <PlusCircleIcon />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <ModeToggle/>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
           {items.map((item) => {
            const Icon = iconMapping[item.icon ?? "default"] ?? MailIcon// Gunakan MailIcon jika icon tidak ditemukan
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  {Icon && <Icon className="h-5 w-5" />}
                  <span>{item.title}</span>
                </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
