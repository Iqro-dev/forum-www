'use client'

import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Input } from '../components/ui/input'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)

    router.push('/feed')
  }

  return (
    <div className="flex justify-center items-center pt-[10vw] px-2">
      <Card className="border-border w-80">
        <CardHeader>
          <CardTitle>Log in</CardTitle>

          <CardDescription>
            Simply put in your email and password
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
                    <FormLabel>Email</FormLabel>

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
                Log in
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
