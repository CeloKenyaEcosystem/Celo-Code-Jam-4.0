import ChatTopbar from './chat-topbar';
import { ChatList } from './chat-list';
import React, { useContext, useState } from 'react';
import { XmtpContext } from '@/providers/XmtpContext';
import { WalletContext } from '@/providers/WalletContext';
import SearchAddressMobile from '../search-address-mobile';
import ChatBottombar from './chat-bottombar';



export function Chat() {
  

const [providerState, setProviderState] = useContext(XmtpContext) as [
  any,
  React.Dispatch<React.SetStateAction<any>>
];

  const { convoMessages, client } = providerState;
  const [errorMsg, setErrorMsg] = useState('');
  const { selectedConvo, setSelectedConvo } = useContext(WalletContext);

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
    <div className='flex flex-col justify-between w-full h-[90%] pt-4'>
      <SearchAddressMobile
        isNewMsg='hi'
        onInputBlur={onInputBlur}
        errorMsg={errorMsg}
        selectedConvo={selectedConvo}
      />

      {selectedConvo && <ChatTopbar selectedConvo={selectedConvo} />}

      <ChatList/>

	  {selectedConvo && <ChatBottombar  />}
    </div>
  );
}
