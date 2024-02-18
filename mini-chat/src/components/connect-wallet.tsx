'use client';

import { shortAddress } from '@/lib/utils';
import { WalletContext } from '@/providers/WalletContext';
import { XmtpContext } from '@/providers/XmtpContext';
import { WalletIcon } from 'lucide-react';
import React, { useContext } from 'react';

const ConnectWallet = () => {
  const { connectWallet, walletAddress, signer } = useContext(WalletContext);
const [ providerState ] = useContext(XmtpContext) as [
  any,
  React.Dispatch<React.SetStateAction<any>>
];

  return (
    <div className='flex justify-center items-center text-sm px-2 md:text-md md:space-y-0 md:space-x-4 cursor-pointer border py-3 rounded-lg'>
      <WalletIcon className='hidden md:flex h-4 w-4' />
      {walletAddress ? (
        <>
          {!providerState.client ? (
            <span
              onClick={() => providerState.initClient(signer)}
              className='flex justify-center items-center'
            >
              Connect to XMTP
            </span>
          ) : (
            <p className=''>{shortAddress(walletAddress)}</p>
          )}
        </>
      ) : (
        <span
          className='flex justify-center items-center'
          onClick={connectWallet}
        >
          {!window.ethereum || !window.ethereum.isMetaMask
            ? 'Install MetaMask'
            : 'Connect wallet'}
        </span>
      )}
    </div>
  );
};

export default ConnectWallet;
