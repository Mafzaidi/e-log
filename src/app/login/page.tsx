"use client";

import LoginForm from "@/components/layout/login-form";
import { Toaster } from "@/components/ui/sonner"

export default function LoginPage() {

  return (
    <div className="w-full max-w-sm">
      <LoginForm />
      <Toaster />
    </div>
  );
}
