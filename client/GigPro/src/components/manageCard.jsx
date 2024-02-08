import React, { useEffect } from "react";
import { useState } from "react";
import { useContractWrite,useContractRead } from "wagmi";
import { GigProContract } from "../Constant/gigprocontract";
import gigproAbi from "../ABI/GigPro.json";
import { useAccount } from 'wagmi'
import {Framework} from "@superfluid-finance/sdk-core"
import {ethers,Contract} from "ethers"


const ManageCard = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [freelancers,setFreeLancers] = useState([]);

  const  getFreelancers = async()=>{
    if (window.ethereum || window.ethereum.isMiniPay) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await  provider.getSigner(address);
      console.log("address yollow",await signer.getAddress());
      try{
  
        const GigProContracts = new Contract(
  GigProContract,
  gigproAbi,
  provider
        );
        const myfree= await GigProContracts.getFreeLancersByOwner(await signer.getAddress());
        setFreeLancers(myfree);
        console.log("myfree",myfree);
        
      }catch(error){
        alert(`error fetaching${address}`,error);
        console.log(error);
        
      }
  } else {
      console.error("MiniPay provider not detected");
  }
}
  // const { data:myFreelancers, isError, isLoading } = useContractRead({
  //   address: GigProContract,
  //   abi: gigproAbi,
  //   functionName: 'getFreeLancersByOwner',
  //   args: [address]
  // })
  // console.log("addressis:,",myFreelancers);
  const employess = [
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
    { address: '0x8878787874827487vdfjdfywetf6f23276r', amount: '4000' },
  ];
//end stream
async function endStreamFlow(recipient) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider
  });

  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  //const daix = await sf.loadSuperToken("MATICx");
  const daix = await sf.loadSuperToken("cUSDx");
  

  console.log(daix);

  try {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
      }
    const deleteFlowOperation =daix.deleteFlow({
      sender: await superSigner.getAddress(),
      receiver: recipient,
      
      // userData?: string
    });

    console.log(deleteFlowOperation);
    console.log("Creating your stream...");

    const result = await deleteFlowOperation.exec(superSigner);
    console.log(result);

    console.log(
      `Congrats - you've just End Stream  a money stream!
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}
//handle delete stream
const handleEndStream = async(freeLancerAddress)=>{
  try{
    if(freeLancerAddress != undefined ){
      
      await endStreamFlow(freeLancerAddress);
      
      //setOpen(false);
    }else{
      alert("please provide the address");
    }
   
  }catch(err){
    console.log("error is", err);
  }
  
}
useEffect(()=>{
  getFreelancers()
 },[address]);
  return (
    <>
      {freelancers?.map((employee, index) => (
         <div className="w-full h-1/2">
        <div key={index} className="flex full flex-col mb-10 md:w-3/4   w-full  text-gray-200 mb-0 rounded bg-black text-white    ">
          <div className="flex   md:justify-evenly md:w-full md:flex-row  w-full flex-col md:text-xl text-sm   h-1/2 items-center text-white mb-8 gap-8">
            <h3>FreeLancer Address: </h3>
            <span className="flex">
            {employee.userAddress.substring(0,18)}<h4>...</h4>{employee.userAddress.substring(employee.userAddress.length-18,employee.userAddress.length)}
            </span>
            
          </div>
          <div className="flex  md:justify-stretch  justify-between   text-sm w-full gap-2 items-center">
            <h3 className="ml-4">Amount in CUSD: </h3>
            <span className="mr-4">{Number(employee.payAmount/10**18)}</span>
            
          </div>
          <div className="flex justify-between items-center text-black">
            <button onClick={()=>{handleEndStream(employee.userAddress)}}  className="inline-flex p-2 justify-start items-center w-100 rounded-full text-orange-200">
              Revoke
            </button>
            
          </div>
        </div>
        </div>
      ))}
    </>
  );
};

export default ManageCard;
