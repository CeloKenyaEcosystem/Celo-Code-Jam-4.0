import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  Smile,
  ThumbsUp,
} from 'lucide-react';
import Link from 'next/link';
import React, { useContext, useRef, useState } from 'react';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

import MessageComposer from '../message-composer';
import useSendMessage from '@/hooks/useSendMessage';
import { XmtpContext } from '@/providers/XmtpContext';
import useStreamConversations from '@/hooks/useStreamConversations';
import { ethers } from 'ethers';
import { sendToken } from '@/lib/payments';
import { WalletContext } from '@/providers/WalletContext';


export default function ChatBottombar() {
const { selectedConvo, setLinkToSend, linkToSend } = useContext(WalletContext);
 const [msgTxt, setMsgTxt] = useState('');
 const { sendMessage } = useSendMessage(selectedConvo);
 useStreamConversations();

 const sendNewMessage = async () => {
   let provider = new ethers.providers.Web3Provider(window.ethereum);
   provider.send('eth_requestAccounts', []);
   let signer = provider.getSigner();

   if ('/pay' === msgTxt.substring(0, 4)) {
     sendToken(msgTxt, selectedConvo).then((data) => {
       sendMessage(
         'Hey, I sent you ' + msgTxt.split(' ')[1] + '  ' + msgTxt.split(' ')[2]
       );
       sendMessage('Transaction :  https://alfajores.celoscan.io/tx/' + data);
       setMsgTxt('');
     });
   } else {
     sendMessage(msgTxt);
     setMsgTxt('');
   }
 };
  return (
    <div className='p-2 flex justify-between w-full items-center gap-2'>
      <AnimatePresence initial={false}>
        <motion.div
          key='input'
          className='w-full relative'
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: 'spring',
              bounce: 0.15,
            },
          }}
        >
          <MessageComposer
            msgTxt={msgTxt}
            setMsgTxt={setMsgTxt}
            sendNewMessage={sendNewMessage}
            sendMessage={sendMessage}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
