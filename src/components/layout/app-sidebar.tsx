// "use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  // BarChartIcon,
  // CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  // FileCodeIcon,
  FileIcon,
  // FileTextIcon,
  // FolderIcon,
  HelpCircleIcon,
  // LayoutDashboardIcon,
  // ListIcon,
  SearchIcon,
  SettingsIcon,
  // UsersIcon,
} from "lucide-react"

import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useMenu } from "@/context/menu-context"

const user = {
  name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

const navSecondary = [
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
  {
    title: "Get Help",
    url: "#",
    icon: HelpCircleIcon,
  },
  {
    title: "Search",
    url: "#",
    icon: SearchIcon,
  },
]

const documents = [
  {
    name: "Data Library",
    url: "#",
    icon: DatabaseIcon,
  },
  {
    name: "Reports",
    url: "#",
    icon: ClipboardListIcon,
  },
  {
    name: "Word Assistant",
    url: "#",
    icon: FileIcon,
  },
]

export function AppSidebar(
  { ...props }: React.ComponentProps<typeof Sidebar>
) {

  const { menus } = useMenu();
  
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menus} />
        <NavDocuments items={documents} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
