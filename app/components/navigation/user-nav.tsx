"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { useState } from "react";
import { ProfileAvatar } from "../profile/avatar";

export function UserNav() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex justify-between w-max"
        >
          <div className="flex flex-row items-center gap-2">
            <ProfileAvatar
              src={"https://github.com/shadcn.png"}
              displayName={"Username"}
              className="bg-black text-white dark:bg-white dark:text-black w-6 h-6 text-base"
            />

            <span className="truncate max-w-[75px] md:max-w-[100px]">
              Username
            </span>
          </div>

          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandGroup>
            <CommandItem>Log out</CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
