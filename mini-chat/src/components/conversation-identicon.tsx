import React, { useContext, useState } from 'react';
import { WalletContext } from '@/providers/WalletContext';
import { getLastTwoUppercase, shortAddress, truncate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ConversationCardIdenticonProps {
  address?: string;
  latestMessage?: any;
  setSelectedConvo?: (address: string) => void;
}
const ConversationCardIdenticon = ({ address }: ConversationCardIdenticonProps) => {
  const { setSelectedConvo } = useContext(WalletContext);
  return (
    <div
      onClick={() => setSelectedConvo(address)}
      className='flex justify-start '
    >
      <Avatar className='flex justify-center items-center'>
        <AvatarImage
          src='/User1'
          alt='image'
          width={6}
          height={6}
          className='w-10 h-10 '
        />
        <AvatarFallback>{getLastTwoUppercase(address!)}</AvatarFallback>
      </Avatar>{' '}
    </div>
  );
};

export default ConversationCardIdenticon;
