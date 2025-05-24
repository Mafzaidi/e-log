"use client";

import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/use-logout";

export default function LogoutButton() {
  const logout = useLogout();

  return (
    <Button type="button" onClick={logout}>
      Logout
    </Button>
  );
}