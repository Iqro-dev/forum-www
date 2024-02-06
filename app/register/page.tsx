'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Button } from '../components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '../components/ui/form'
import { useAuth } from '../hooks/use-auth'
import { Input } from '../components/ui/input'
import { useToast } from '../components/ui/use-toast'

export default function RegisterPage() {
  const { register } = useAuth()

  const { toast } = useToast()

  const router = useRouter()

  const formSchema = z.object({
    username: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email' }),

    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await register(values)

    if (response.error)
      return toast({
        title: 'Whoops!',
        description: response.message,
        variant: 'destructive',
      })

    router.push('/feed')
    router.refresh()
  }

  return (
    <div className="flex justify-center items-center pt-[10vw] px-2">
      <Card className="border-border w-96">
        <CardHeader className="pb-2">
          <CardTitle>Sign up</CardTitle>

          <CardDescription>
            <span>Already have an account?</span>

            <Link href="/login">
              <Button variant="link" className="p-0 m-0 px-1">
                Log in
              </Button>
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>

                    <FormControl>
                      <Input type="username" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
