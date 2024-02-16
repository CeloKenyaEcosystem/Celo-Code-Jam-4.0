'use client';

import React, { useContext, useState, useEffect } from 'react';

import useStreamConversations from '../hooks/useStreamConversations';
import { XmtpContext } from '@/providers/XmtpContext';
import { WalletContext } from '@/providers/WalletContext';
import useSendMessage from '@/hooks/useSendMessage';
import { sendToken } from '@/lib/payments';
import { shortAddress } from '@/lib/utils';
import MessageList from './message-list';
import MessageComposer from './message-composer';
const ethers = require('ethers');

const Messages = () => {
const [providerState ] = useContext(XmtpContext) as [
  any,
  React.Dispatch<React.SetStateAction<any>>
];

  const { selectedConvo, setLinkToSend, linkToSend } =
    useContext(WalletContext);
  const { convoMessages, client } = providerState;
  const [msgTxt, setMsgTxt] = useState('');
  const { sendMessage } = useSendMessage(selectedConvo);
  useStreamConversations();
  const [isNewMsg, setIsNewMsg] = useState(false);

  const sendNewMessage = async () => {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []);
    let signer = provider.getSigner();

    if ('/pay' === msgTxt.substring(0, 4)) {
      sendToken(msgTxt, selectedConvo).then((data) => {
        sendMessage(
          'Hey, I sent you ' +
            msgTxt.split(' ')[1] +
            '  ' +
            msgTxt.split(' ')[2]
        );
        sendMessage('Transaction :  https://alfajores.celoscan.io/tx/' + data);
        setMsgTxt('');
      });
    } else {
      sendMessage(msgTxt);
      setMsgTxt('');
    }
  };

  useEffect(() => {
    if (linkToSend) {
      setMsgTxt(linkToSend);
      setLinkToSend('');
    }
  }, [linkToSend, setLinkToSend]);

  return (
    <div className='w-full'>
      {client && (
        <div className=''>
          {!selectedConvo && !isNewMsg ? (
            <>
                <div className='flex flex-col space-y-2 p-3'>
                  <h1 className='font-semibold'>Select an address</h1>
                  <p className='text-xs'>
                    Send messages and cUSD to anyone on the Celo network via
                    minipay.
                  </p>
                </div>
            </>
          ) : (
            <>
              <MessageList
                isNewMsg={isNewMsg}
                convoMessages={convoMessages.get(selectedConvo) ?? []}
                selectedConvo={selectedConvo}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
