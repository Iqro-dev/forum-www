'use client'

import { addArticle } from '@/app/api/fetchers/add-article'
import { Profile } from '@/app/api/types'
import { useAuthCookies } from '@/app/hooks/use-auth-cookies'
import { zodResolver } from '@hookform/resolvers/zod'
import { Archive, ArchiveX, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ProfileAvatar } from '../profile/avatar'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { toast } from '../ui/use-toast'

export interface CreateArticleProps {
  profile?: Profile
}

export function CreateArticle({ profile }: CreateArticleProps) {
  const router = useRouter()

  const accessToken = useAuthCookies().accessToken

  const formSchema = z.object({
    content: z.string({
      required_error: 'Content is required',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: undefined,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await addArticle(
      {
        ...values,
        date: new Date().toISOString(),
      },
      accessToken
    )

    if (response.error) {
      return toast({
        title: 'Whoops!',
        description: response.message,
        variant: 'destructive',
      })
    }

    router.refresh()
  }

  return (
    <Card className="w-full border-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardHeader className="flex flex-row items-center gap-2 p-2 px-3">
            <ProfileAvatar className="w-6 h-6" />

            <CardTitle className="text-xl">{profile?.username}</CardTitle>
          </CardHeader>

          <Separator className="w-full px-0" />

          <CardContent className="flex flex-col px-0 w-full py-0">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Type here..."
                      className="border-none focus:border-none h-full min-h-[10rem]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>

          <Separator className="w-full px-0" />

          <CardFooter className="flex justify-between w-full px-1 py-1">
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                    <span className="sr-only">Archive</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Archive</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ArchiveX className="h-4 w-4" />
                    <span className="sr-only">Move to junk</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move to junk</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Move to trash</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move to trash</TooltipContent>
              </Tooltip>
            </div>

            <Button size="default" variant="ghost">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
