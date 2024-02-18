"use client"

import { createContext, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// Define the shape of the context
interface WalletContextType {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  walletAddress: string | null;
  signer: ethers.providers.JsonRpcSigner | null;
  selectedConvo: any; // Replace 'any' with the actual type of 'selectedConvo'
  setSelectedConvo: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the actual type of 'selectedConvo'
  linkToSend: any; // Replace 'any' with the actual type of 'linkToSend'
  setLinkToSend: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the actual type of 'linkToSend'
}

export const WalletContext = createContext<WalletContextType>({
  connectWallet: async () => {},
  disconnectWallet: () => {},
  walletAddress: null,
  signer: null,
  selectedConvo: null, // or a default value if it's not nullable
  setSelectedConvo: () => {},
  linkToSend: null, // or a default value if it's not nullable
  setLinkToSend: () => {},
});


export const WalletContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [linkToSend, setLinkToSend] = useState();

 const connectMiniPay = async () => {
   if (window.ethereum && window.ethereum.isMiniPay) {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     setSigner(signer); // setSigner expects a JsonRpcSigner or null
     const address = await signer.getAddress(); // getAddress returns a Promise<string>
     setWalletAddress(address); // setWalletAddress expects a string or null
   } else {
     console.error('MiniPay provider not detected');
   }
 };


  // Call connectMiniPay when the component mounts
  useEffect(() => {
    connectMiniPay();
  }, []);

  // Function to connect to the modal
  const connectWallet = async () => {
    try {
      const instance = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(instance, 'any');
      const newSigner = await web3Provider.getSigner();
      setSigner(newSigner);
      const newAddress = await newSigner.getAddress();
      setWalletAddress(newAddress);

      // Event listeners for account change, connect, and disconnect
      instance.on('accountsChanged', () => {
        disconnectWallet();
      });
      instance.on('connect', () => {
        connectWallet();
      });
      instance.on('disconnect', () => {
        disconnectWallet();
      });
    } catch (err) {
      console.error('Failed to connect wallet: ', err);
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setSigner(null);
  };

  // Provider options for Web3Modal
  const providerOptions = {
    // Additional provider options go here
  };

  // Instantiate Web3Modal with the provider options
  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  });

  return (
    <WalletContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        walletAddress,
        signer,
        selectedConvo,
        setSelectedConvo,
        linkToSend,
        setLinkToSend,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
