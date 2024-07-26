'use client'

import { Profile } from '@/app/api/types'
import { Archive, ArchiveX, Trash2 } from 'lucide-react'
import { ProfileAvatar } from '../profile/avatar'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Separator } from '../ui/separator'
import { Textarea } from '../ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export interface CreateArticleProps {
  profile?: Profile
}

export function CreateArticle({ profile }: CreateArticleProps) {
  return (
    <Card className="md:w-2/4 w-full border-border">
      <CardHeader className="flex flex-row items-center gap-2 p-2 px-3">
        <ProfileAvatar className="w-6 h-6" />

        <CardTitle className="text-xl">{profile?.username}</CardTitle>
      </CardHeader>

      <Separator className="w-full px-0" />

      <CardContent className="px-0 w-full py-0">
        <Textarea
          placeholder="Type here..."
          className="border-none focus:border-none h-full min-h-[10rem]"
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
    </Card>
  )
}
