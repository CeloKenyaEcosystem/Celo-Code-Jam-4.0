'use client';

import React, { useState, createContext, useEffect, useContext } from 'react';
import { Client } from '@xmtp/xmtp-js';
import { WalletContext } from './WalletContext';

export const XmtpContext = createContext({});

export const XmtpContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { signer, walletAddress } = useContext(WalletContext);
  const [providerState, setProviderState] = useState({
    client: null,
    initClient: () => {},
    loadingConversations: true,
    conversations: new Map(),
    convoMessages: new Map(),
  });

  // This is the new function that takes a wallet and initializes the client
  const initializeClient = async (wallet: any) => {
    if (wallet && !providerState.client) {
      try {
        const keys = await Client.getKeys(signer, { env: 'dev' });
        const newClient = await Client.create(null, {
          env: 'dev',
          privateKeyOverride: keys,
        });
        setProviderState({
          ...providerState,
          client: newClient as any,
        });
      } catch (e) {
        console.error(e);
        setProviderState({
          ...providerState,
          client: null,
        });
      }
    }
  };

  const disconnect = () => {
    setProviderState({
      ...providerState,
      client: null,
      conversations: new Map(),
      convoMessages: new Map(),
    });
  };

  useEffect(() => {
    signer ? initializeClient(signer) : disconnect(); // Call the new function here
    // eslint-disable-next-line
  }, [signer]);

  useEffect(() => {
    if (!providerState.client) return;

    const listConversations = async () => {
      console.log('Listing conversations');
      setProviderState({ ...providerState, loadingConversations: true });
      const { client, convoMessages, conversations } = providerState;
      const convos =
        (await (client as any)?.conversations.list())?.filter(
          (conversation: any) => !conversation.context?.conversationId
        ) ?? [];

      Promise.all(
        convos.map(async (convo: any) => {
          if (convo.peerAddress !== walletAddress) {
            const messages = await convo.messages();
            convoMessages.set(convo.peerAddress, messages);
            conversations.set(convo.peerAddress, convo);
            setProviderState({
              ...providerState,
              convoMessages,
              conversations,
            });
          }
        })
      ).then(() => {
        setProviderState({ ...providerState, loadingConversations: false });
      });
    };

    listConversations();
    // eslint-disable-next-line
  }, [providerState.client]);

  return (
    <XmtpContext.Provider value={[providerState, setProviderState]}>
      {children}
    </XmtpContext.Provider>
  );
};
