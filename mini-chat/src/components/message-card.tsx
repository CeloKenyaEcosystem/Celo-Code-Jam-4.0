import { WalletContext } from '@/providers/WalletContext';
import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface MessageCardProps {
	  msg: any;

}

const MessageCard = ({ msg }: MessageCardProps) => {
  const { walletAddress } = useContext(WalletContext);

  return (
    <>
      {walletAddress === msg.senderAddress ? (
        <AnimatePresence>
          <motion.div
            layout
            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: 'spring',
                bounce: 0.3,
                duration: 0.2,
              },
            }}
            style={{
              originX: 0.5,
              originY: 0.5,
            }}
            className='flex flex-col gap-2 p-1 whitespace-pre-wrap items-end'
          >
            <div className='flex gap-3 items-center'>
              <span className='bg-accent p-3 rounded-md max-w-xs'>
                {msg.content}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            layout
            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: 'spring',
                bounce: 0.3,
                duration: 0.2,
              },
            }}
            style={{
              originX: 0.5,
              originY: 0.5,
            }}
            className='flex flex-col gap-2 p-1 whitespace-pre-wrap items-start'
          >
            <div className='flex gap-3 items-center'>
              <span className='bg-accent p-3 rounded-md max-w-xs'>
                {msg.content}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default MessageCard;
