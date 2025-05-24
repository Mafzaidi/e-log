"use client"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppSiteHeader } from "./app-header"
import { MenuProvider } from "@/context/menu-context";
import { usePathname } from "next/navigation"
import SidebarWrapper from "./sidebar-wrapper";
 
export function MainLayout({ children }: { children: React.ReactNode }) {
  
  const pathName = usePathname();
  const isExcludedPage = pathName === "/login" || pathName === "/register" ||  pathName === "/not-found"
  return (
    <MenuProvider>
      <SidebarProvider>
          {!isExcludedPage && <SidebarWrapper />}
        <SidebarInset>
          {!isExcludedPage && <AppSiteHeader />}
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                  {children}
              </div>
            </div>
          </SidebarInset>
      </SidebarProvider>
    </MenuProvider>
  )
}