import RegisterForm from "@/components/layout/register-form"
import { Toaster } from "@/components/ui/sonner"

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm">
      <RegisterForm />
      <Toaster />
    </div>
  )
}
