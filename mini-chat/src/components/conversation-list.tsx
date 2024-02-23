import React from 'react';
import ConversationCard from './conversation-card';
import { getLatestMessage } from '@/lib/utils';


interface conversationListProps {
  convoMessages: any;
  setSelectedConvo: (address: string) => void;
}

const ConversationList = ({ convoMessages, setSelectedConvo }: conversationListProps) => {
  const sortedConvos = new Map(
    [...convoMessages.entries()].sort((convoA, convoB) => {
      return getLatestMessage(convoA[1])?.sent <
        getLatestMessage(convoB[1])?.sent
        ? 1
        : -1;
    })
  );

  return (
    <div style={{ marginTop: '20px' }}>
      {Array.from(sortedConvos.keys()).map((address) => {
        if ((sortedConvos.get(address) as any[]).length > 0) {
          return (
            <ConversationCard
              key={'Convo_' + address}
              setSelectedConvo={setSelectedConvo}
              address={address as string}
              latestMessage={getLatestMessage(sortedConvos.get(address))}
            />
          );
        } else return null;
      })}
    </div>
  );
};

export default ConversationList;
