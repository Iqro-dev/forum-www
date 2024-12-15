'use client'

import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ReloadIcon } from '@radix-ui/react-icons'

import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { useAuth } from '../hooks/use-auth'
import { useToast } from '../components/ui/use-toast'

export default function LoginPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const { toast } = useToast()

  const formSchema = z.object({
    username: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),

    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    const response = await login(values)

    if (response.error) {
      setLoading(false)

      return toast({
        title: 'Whoops!',
        description: response.message,
        variant: 'destructive',
      })
    }

    router.push('/feed')
    router.refresh()
  }

  return (
    <div className="flex justify-center items-center pt-[10vw] px-2">
      <Card className="border-border w-80">
        <CardHeader className="pb-2">
          <CardTitle>Log in</CardTitle>

          <CardDescription>
            <span>Don&apos;t have an account?</span>

            <Link href="/register">
              <Button variant="link" className="p-0 m-0 px-1">
                Sign up
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Log in'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
