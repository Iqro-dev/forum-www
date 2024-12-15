// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { Calendar } from '../components/ui/calendar'
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
  FormDescription,
} from '../components/ui/form'
import { useAuth } from '../hooks/use-auth'
import { Input } from '../components/ui/input'
import { useToast } from '../components/ui/use-toast'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover'

import { cn } from '@/utils'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()

  const { toast } = useToast()

  const router = useRouter()

  const formSchema = z.object({
    username: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(5, { message: 'Must be 5 or more characters' }),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email' }),

    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),

    dateOfBirth: z.date({
      required_error: 'Date of birth is required',
      invalid_type_error: 'Date of birth must be a date',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
      dateOfBirth: new Date(),
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    const response = await register(values)

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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormDescription className="text-yellow-700">
                      Shadcn-ui hasn&apos;t yet added the feature to select
                      years and months directly from popover.
                    </FormDescription>

                    <FormMessage />

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
