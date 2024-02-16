import React, { useContext, useState } from 'react';
import { WalletContext } from '@/providers/WalletContext';
import { getLastTwoUppercase, shortAddress, truncate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ConversationCardProps {
  address?: string;
  latestMessage?: any;
  setSelectedConvo?: (address: string) => void;
}
const ConversationCard = ({ address, latestMessage }: ConversationCardProps) => {
  const { setSelectedConvo } = useContext(WalletContext);
  return (
    <div
      onClick={() => setSelectedConvo(address)}
      className='flex justify-start gap-4 items-center cursor-pointer p-2 rounded-lg hover:bg-muted w-full'
    >
      <Avatar className='flex justify-center items-center'>
        <AvatarImage
          src='/User1'
          alt='image'
          width={6}
          height={6}
          className='w-10 h-10 '
        />
        <AvatarFallback>{getLastTwoUppercase(address as string)}</AvatarFallback>
      </Avatar>{' '}
      <div className='flex  flex-start flex-col justify-start'>
        <p className='font-bold'>{shortAddress(address as string)}</p>
        <div>{latestMessage && truncate(latestMessage.content, 75)}</div>
      </div>
    </div>
  );
};

export default ConversationCard;
