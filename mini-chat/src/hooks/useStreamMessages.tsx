"use client";

import { WalletContext } from '@/providers/WalletContext';
import { XmtpContext } from '@/providers/XmtpContext';
import { useState, useEffect, useContext } from 'react';

const useStreamMessages = (peerAddress: any) => {
const { walletAddress } = useContext(WalletContext);
const [providerState, setProviderState] = useContext(XmtpContext) as [any, React.Dispatch<React.SetStateAction<any>>];
const { client, convoMessages } = providerState;
const [stream, setStream] = useState('');
const [conversation, setConversation] = useState(null);

useEffect(() => {
	const getConvo = async () => {
		if (!client || !peerAddress) {
			return;
		}
		setConversation(await client.conversations.newConversation(peerAddress));
	};
	getConvo();
}, [client, peerAddress]);

  useEffect(() => {
    if (!conversation) return;

    const streamMessages = async () => {
      const newStream = await (conversation as any).streamMessages();
      setStream(newStream);
      for await (const msg of newStream) {
        if (setProviderState) {
          const newMessages = convoMessages.get((conversation as any).peerAddress) ?? [];
          newMessages.push(msg);
          const uniqueMessages = [
            ...Array.from(
              new Map(newMessages.map((item: any) => [item['id'], item])).values()
            ),
          ];
          convoMessages.set((conversation as any).peerAddress, uniqueMessages);
          setProviderState({
            ...providerState,
            convoMessages: new Map(convoMessages),
          });
        }
      }
    };
    streamMessages();

    return () => {
      const closeStream = async () => {
        if (!stream) return;
        await (stream as any).return();
      };
      closeStream();
    };
    // eslint-disable-next-line
  }, [convoMessages, walletAddress, conversation]);
};

export default useStreamMessages;
