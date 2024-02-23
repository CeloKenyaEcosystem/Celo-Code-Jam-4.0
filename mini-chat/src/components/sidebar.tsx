'use client';

import Link from 'next/link';
import { MoreHorizontal, SquarePen } from 'lucide-react';
import { cn, getLatestMessage, shortAddress } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useContext, useState } from 'react';
import { XmtpContext } from '@/providers/XmtpContext';
import ConversationList from './conversation-list';
import { WalletContext } from '@/providers/WalletContext';
import ConversationListIdenticon from './conversation-list-identicon';
import SearchAddress from './search-address';

interface SidebarProps {
  isCollapsed?: boolean;
  onClick?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ isCollapsed, isMobile }: SidebarProps) {
const [providerState, setProviderState] = useContext(XmtpContext) as [
  any,
  React.Dispatch<React.SetStateAction<any>>
];

  const { convoMessages, client } = providerState;
  const [errorMsg, setErrorMsg] = useState('');
  const { selectedConvo, setSelectedConvo } = useContext(WalletContext);

  const sortedConvos = new Map(
    [...convoMessages.entries()].sort((convoA, convoB) => {
      return getLatestMessage(convoA[1])?.sent <
        getLatestMessage(convoB[1])?.sent
        ? 1
        : -1;
    })
  );

  const checkIfOnNetwork = async (address: string) => {
    return (await client?.canMessage(address)) || false;
  };


  const onInputBlur = async (newAddress: any) => {
    if (!newAddress.startsWith('0x') || newAddress.length !== 42) {
      setErrorMsg('Invalid address');
    } else {
      const isOnNetwork = await checkIfOnNetwork(newAddress);
      if (!isOnNetwork) {
        setErrorMsg('Address not on XMTP network');
      } else {
        setSelectedConvo(newAddress);
        setErrorMsg('');
      }
    }
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className='relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 '
    >
      {!isCollapsed && (
        <div className='flex flex-col justify-start p-2 items-start space-y-3'>
          <div className='flex gap-2 items-center text-lg'>
            <p className='font-medium'>Friends</p>
          </div>
          <SearchAddress
            isNewMsg='hi'
            onInputBlur={onInputBlur}
            errorMsg={errorMsg}
            selectedConvo={selectedConvo}
          />
        </div>
      )}

      <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {isCollapsed ? (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div>
                  {client && (
                    <ConversationListIdenticon
                      convoMessages={convoMessages}
                      setSelectedConvo={setSelectedConvo}
                    />
                  )}
                </div>
              </TooltipTrigger>

              {Array.from(sortedConvos.keys()).map((address) => {
                if ((sortedConvos as any).get(address).length > 0) {
                  return (
                    <TooltipContent
                      key={'Convo_' + address}
                      side='right'
                      className='flex items-center gap-4'
                    >
                      {shortAddress(address as string)}
                    </TooltipContent>
                  );
                } else return null;
              })}
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div>
            {client && (
              <ConversationList
                convoMessages={convoMessages}
                setSelectedConvo={setSelectedConvo}
              />
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
