import React, { useState,useEffect } from "react";
import { useContractWrite,useContractRead } from "wagmi";
import { GigProContract } from "../Constant/gigprocontract";
import gigproAbi from "../ABI/GigPro.json";
import { useAccount } from 'wagmi'





import {celoABI,CusdABI } from "../ABI/abi";



//superfluid
//import { Framework } from "@superfluid-finance/js-sdk";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers,BigNumber,Contract } from "ethers";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
let account;

const StreamCard = () => {
  const [cardIndex,setCardIndex] = useState(null);
  const [updateCardIndex,setUpdateCardIndex] = useState(null);
  const [flowRate, setFlowRate] = useState("");
  const [flowRateDisplay, setFlowRateDisplay] = useState("");
  const [isOpen,setOpen] = useState(false);
  const [weiPerSeconds,setWeiPerSeconds] = useState();
  const { address, isConnecting, isDisconnected } = useAccount()
  const [freelancers,setFreeLancers] = useState([]);
  const [openstart,setOpenStart] = useState(false);
  const [openUpdate,setopenUpdate] = useState(false);
  const [userindex,setUserIndex]= useState(null);

  const  getFreelancers = async()=>{
    if (window.ethereum || window.ethereum.isMinipay) {
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
  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInEther = ethers.utils.parseEther(amount);
       const weiPerSec = amount * (10^18) / ((365/12) * 24 * 60 * 60)  //ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = weiPerSec //monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }
  //hanle flow rate
  const handleFlowRateChange = (e) => {
    setFlowRate(() => ([e.target.name] = e.target.value));
    let newFlowRateDisplay = calculateFlowRate(e.target.value);
    setFlowRateDisplay(newFlowRateDisplay);
  };


  async function createNewFlow(recipient) {
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
        if(recipient!=undefined && flowRate!=undefined){

        
      const createFlowOperation =daix.createFlow({
        sender: await superSigner.getAddress(),
        receiver: recipient,
        flowRate: ethers.utils.parseEther(flowRate)
        // userData?: string
      });
  
      console.log(createFlowOperation);
      console.log("Creating your stream...");
  
      const result = (await createFlowOperation.exec(superSigner));
      console.log("gassss",result);
  
      console.log(
        `Congrats - you've just created a money stream!
      `
      );}
      else{
        console.log("flow rate and recepient undefined");
      }
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }
/**end stream */

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

    const result = (await deleteFlowOperation.exec(superSigner));
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
//updateStream
async function updateStreamFlow(recipient) {
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
      flowRate:flowRate
      
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
//handle new stream
    const handleStartStream = async(freeLancerAddress,wei_per_seconds)=>{
      try{
        if(freeLancerAddress != undefined ){
          
          await createNewFlow(freeLancerAddress);
          setOpen(false);
        }else{
          alert("please provide the time");
        }
       
      }catch(err){
        console.log("error is", err);
      }
    }
    //handle update stream
    const handleUpdateStream = async(freeLancerAddress)=>{
      try{
        if(freeLancerAddress != undefined ){
          
          await updateStreamFlow(freeLancerAddress);
         // setOpen(false);
        }else{
          alert("please provide the time");
        }
       
      }catch(err){
        console.log("error is", err);
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
        <div key={index} className="flex h-full  flex-col gap-4 text-gray-400 mb-4 border-b border-red-300">
          <div className="flex justify-evenly w-full gap-4 items-center md:text-xl  text-xs">
            <h3>FreeLancer Address: </h3>
            <span className="flex">
            {employee.userAddress.substring(0,8)}<h4>...</h4>{employee.userAddress.substring(employee.userAddress.length-8,employee.userAddress.length)}
            </span>
            
          </div>
          <div className="flex  justify-stretch w-full gap-4 items-center md:text-xl  text-xs">
            <h3>Amount in Cusd: </h3>
            <span className="">{Number(employee.payAmount/10**18)}</span>
            
          </div>
          <div className="flex justify-between items-center ">
            {/* <button onClick={()=>{handleEndStream(employee.userAddress)}} className="inline-flex p-2 justify-center items-center w-50 h-5 rounded-full text-sm  text-red-400">
              End Stream
            </button> */}
            {updateCardIndex == index?  <div className="flex gap-8 ">
          
        
        <input
          type="number"
          placeholder="Wei"
          value={flowRate}
          onChange={handleFlowRateChange}
           className="text-black text-center md:text-xl  text-xs"
        />
        <div className="button-container flex w-full gap-8  md:text-xl  text-xs">
        {/* <h4>{flowRateDisplay !== " " ? flowRateDisplay : 0} Celox/month
          </h4> */}
          {/* <button className="text-green-200 md:text-xl  text-xs" onClick={()=>{handleUpdateStream(employee.userAddress)}}>update</button>
          <button className="text-red-200 md:text-xl  text-xs" onClick={()=>{setUpdateCardIndex(null)}} >Cancel</button> */}
        </div>
      </div>: <button  onClick={()=>{setUpdateCardIndex(index);setopenUpdate(true)}} className="inline-flex p-2 justify-center items-center w-50 h-5 rounded-full md:text-xl  text-xs text-teal-900">
              Update Stream
            </button>}

            {cardIndex == index?  <div className="flex gap-8 ">
            {/* <button onClick={()=>{handleUpdateStream(employee.userAddress)}} className="inline-flex p-2 justify-center items-center w-50 h-5 rounded-full text-sm text-teal-900">
              Update Stream
            </button> */}
        
        <input
          type="number"
          placeholder="Wei"
          value={flowRate}
          onChange={handleFlowRateChange}
           className="text-black text-center md:text-xl  text-xs"
        />
        
      </div>: <button  onClick={()=>{setCardIndex(index);
  setOpenStart(true);}} className="inline-flex p-2 justify-center items-center w-50 h-5 rounded-full md:text-xl  text-xs  text-green-600">
              Start Stream
            </button>}

           
          </div>
          <div className="button-container flex gap-8 md:text-xl  text-xs">
        <h4>{flowRateDisplay !== " " ? flowRateDisplay : 0} cusdx/month
          </h4>
{openstart?<div className="flex justify-between w-full"> <button className="text-green-200 md:text-xl  text-xs" onClick={()=>{handleStartStream(employee.userAddress,weiPerSeconds)}}>Start</button>
          <button className="text-red-200 md:text-xl  text-xs" onClick={()=>{setCardIndex(null)}} >Cancel</button></div>:""}
          {openUpdate?<div className="flex justify-between w-full"><button className="text-green-200 md:text-xl  text-xs" onClick={()=>{handleUpdateStream(employee.userAddress)}}>update</button>
          <button className="text-red-200 md:text-xl  text-xs" onClick={()=>{setUpdateCardIndex(null)}} >Cancel</button></div>:""}
         
        </div>
       
        </div>
      ))}
    </>
  );
};

export default StreamCard;
