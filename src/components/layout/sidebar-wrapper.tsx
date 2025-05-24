"use client"

import { useEffect, useRef } from "react";
import { useMenu } from "@/context/menu-context";
import { getMenus } from "@/lib/get-menu";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function SidebarWrapper() {
  const { menus, setMenus } = useMenu();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    async function fetchAndSet() {
      if (!menus.length) {
        const fetched = await getMenus();
        setMenus(fetched);
      }
    }

    if (!hasFetchedRef.current && menus.length === 0) {
      hasFetchedRef.current = true;
      fetchAndSet();
    }
  }, [menus, setMenus]);

  return <AppSidebar />;
}