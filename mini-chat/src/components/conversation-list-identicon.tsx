import React from 'react';
import { getLatestMessage } from '@/lib/utils';
import ConversationCardIdenticon from './conversation-identicon';

interface conversationListProps {
  convoMessages: any;
  setSelectedConvo: (address: string) => void;
}

const ConversationListIdenticon = ({
  convoMessages,
  setSelectedConvo,
}: conversationListProps) => {
  const sortedConvos = new Map(
    [...convoMessages.entries()].sort((convoA, convoB) => {
      return getLatestMessage(convoA[1])?.sent <
        getLatestMessage(convoB[1])?.sent
        ? 1
        : -1;
    })
  );

  return (
    <div className='flex flex-col space-y-4'>
      {Array.from(sortedConvos.keys()).map((address) => {
        if ((sortedConvos.get(address) as any[]).length > 0) {
          return (
            <ConversationCardIdenticon
              key={'Convo_' + address}
              setSelectedConvo={setSelectedConvo}
              address={address as string} // Cast address to string
              latestMessage={getLatestMessage(sortedConvos.get(address))}
            />
          );
        } else return null;
      })}
    </div>
  );
};

export default ConversationListIdenticon;
