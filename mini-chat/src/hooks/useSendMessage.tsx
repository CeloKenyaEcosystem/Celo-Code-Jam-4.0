"use client"
import { XmtpContext } from '@/providers/XmtpContext';
import { useContext } from 'react';

const useSendMessage = (peerAddress: any) => {
const [providerState] = useContext(XmtpContext) as [
  any,
  React.Dispatch<React.SetStateAction<any>>
];
  const { client } = providerState || {};

  const sendMessage = async (message: any) => {
    if (!client || !peerAddress) {
      return;
    }
    const conversation = await client.conversations.newConversation(
      peerAddress
    );
    if (!conversation) return;
    await conversation.send(message);
  };

  return {
    sendMessage,
  };
};

export default useSendMessage;
