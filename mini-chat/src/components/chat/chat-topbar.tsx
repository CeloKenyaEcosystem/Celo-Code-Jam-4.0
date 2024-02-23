import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Info, Phone, Video } from 'lucide-react';
import Link from 'next/link';
import { cn, getLastTwoUppercase, shortAddress } from '@/lib/utils';

interface ChatTopbarProps {
	  selectedConvo: string;

}

export default function ChatTopbar({ selectedConvo }: ChatTopbarProps) {
  return (
    <div className='w-full h-20 flex p-4 justify-between items-center border-b'>
      <div className='flex items-center gap-2'>
        <Avatar className='flex justify-center items-center'>
          <AvatarImage
            src='/User1'
            alt='image'
            width={6}
            height={6}
            className='w-10 h-10 '
          />
          <AvatarFallback>{getLastTwoUppercase(selectedConvo)}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <span className='font-semibold text-medium'>
            {shortAddress(selectedConvo)}
          </span>
        </div>
      </div>
    </div>
  );
}
