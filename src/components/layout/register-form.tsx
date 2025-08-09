'use client'

import { cn } from "@/lib/utils"
import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from "../ui/password-input"
import api from "@/lib/axiosInstance";
import { toSnakeCase } from "@/utils/case-converter"

const formSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' }),
    fullName: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().min(10, { message: 'Phone number must be valid' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  

export default function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = toSnakeCase(values);
      
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        payload
      );
      if (response.status == 200) {
        router.push("/login");
        console.log("succeed"); 
      }
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      )
    } catch (error) {
      console.error('Form submission error', error)
      toast.error('Failed to submit the form. Please try again.')
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Create a new account by filling out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="grid gap-2">
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <FormControl>
                            <Input id="username" placeholder="johndoe123" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className="grid gap-2">
                    <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem className="grid gap-2">
                        <FormLabel htmlFor="fullName">Full Name</FormLabel>
                        <FormControl>
                            <Input id="fullName" placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                {/* Email Field */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="johndoe@mail.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone Field */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            id="phoneNumber"
                            placeholder="555-123-4567"
                            type="tel"
                            autoComplete="tel"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="confirmPassword">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="confirmPassword"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full cursor-pointer">
                  Register
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
  
}
