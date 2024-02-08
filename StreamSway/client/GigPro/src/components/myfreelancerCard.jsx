import React from "react";
import { useState,useEffect } from "react";
import { useContractWrite,useContractRead } from "wagmi";
import { GigProContract } from "../Constant/gigprocontract";
import gigproAbi from "../ABI/GigPro.json";
import { useAccount } from 'wagmi'
import { ethers,Contract } from "ethers";
import { Framework } from "@superfluid-finance/sdk-core";
import Tosts from "./Toast";
import { Toast } from "flowbite-react";


const MyFreelancerCard = () => {
  const [freelancers,setFreeLancers] = useState([]);
  const [freeLancerAddress,setFreelancerAddress] = useState();
  const [deleteuser,setDeleteUser] = useState(true);
  const { address, connector, isConnected } = useAccount();
  const [userstreambal,setUserStreamBal]= useState();
  const [userindex,setUserIndex]= useState(null);
  
  
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
        alert('Please add Users');
        console.log(error);
        
      }
  } else {
      console.error("MiniPay provider not detected");
  }
}

//userflow new
async function getUserCusdxStream() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  const signer = provider.getSigner();
  console.log("usesrs address",await signer.getAddress())

  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider
  });

  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  const celox = await sf.loadSuperToken("cUSDx");

  console.log(celox);

  try {
    // const downgradeOperation = celox.downgrade({
    //   amount: ethers.utils.parseEther(amount)
    // });
    const userbalancercusdx = celox.realtimeBalanceOf({
      account: "0xdf089f52f9d8fcc320d6dc97afc1098e88d85f0f",
      providerOrSigner:provider,
      timestamp:Date.now()
    }
          
          )
          
          const userflow = celox.getFlow({
            sender: await signer.getAddress(),
            receiver: "0xdf089f52f9d8fcc320d6dc97afc1098e88d85f0f",
            providerOrSigner:provider,
            
          })

    

  //  // const bal = await userbalancercusdx.exec(signer);
  //  const userbal = await userbalancercusdx;
  //  setcusdxBalance(userbal/10**18);
  const firstElement = await userbalancercusdx;

    console.log(
      "uer balance now",  firstElement.availableBalance
    );
    setUserStreamBal(firstElement.availableBalance);
/// console.log("userFlow",(await userflow).deposit);
    
  } catch (error) {
    console.log(
      "cusdx balance failed!"
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
  
  // const { data:myFreelancers, isError, isLoading } = useContractRead({
  //   address: GigProContract,
  //   abi: gigproAbi,
  //   functionName: 'getFreeLancersByOwner',
  //   args: [address]
  // })
  console.log("addressis:,",freelancers);
  const removeFreeeLancers = async()=>{
    if (window.ethereum || window.ethereum.isMiniPay) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer =   provider.getSigner(address);
      console.log("addresydysgs",address);
      try{
  
        const GigProContracts = new Contract(
  GigProContract,
  gigproAbi,
  signer
        );
        let tx = await GigProContracts.removeFreeLancer(freeLancerAddress,await signer.getAddress());
        let txtx= await tx.wait();
        alert("removed");
      }catch(error){
        alert("can't remove",error);
        console.log("error yollow toolow",error);
      }
  } else {
      console.error("MiniPay provider not detected");
  }
    
  }

  const {writeAsync:removeFreeLancer} = useContractWrite({
    address: GigProContract,
    abi:gigproAbi,
    functionName:"removeFreeLancer",
    args:[freeLancerAddress,address]
  })
const removeFreeeLancer = async()=>{
  
  try{
   
     
      if(freeLancerAddress != undefined){
        //await removeFreeLancer();
        alert("approving ....")
        await removeFreeeLancers();
      }
      else{
        console.log("the address is not set");
        alert("empty ....")
      }
    

  }catch(err){
    console.log("err ihjgerujiugirunir  iruh54iyolow",err);
    alert("failed ....")
  }
}
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
  const addis ="0x65E28C9C4Ef1a756d8df1c507b7A84eFcF606fd4"
 useEffect(()=>{
  getFreelancers();
  // const interval = setInterval(() => {
  //   getUserCusdxStream();
  // }, 1000); // 1000 milliseconds = 1 second
  
  // // Cleanup the interval when the component unmounts
  // return () => clearInterval(interval);
  //getUserFlow(addis);
 },[address]);
  return (
    <>
    {/* {freelancers ==null || freelancers == undefined?<Toast message="Please Add Users!!"/>:""} */}
      {freelancers?.map((employee, index) => (
        <div className="w-full h-1/2">

        
        <div key={index} className="flex full flex-col mb-10 md:w-3/4   w-full  text-gray-200 mb-0 rounded bg-black text-white  ">
          <div className="flex   md:justify-evenly md:w-full md:flex-row  w-full flex-col md:text-xl text-sm   h-1/2 items-center text-white mb-8 gap-8 ">
            <h3 className="text-white">FreeLancer Address: </h3>
            <span className="flex ">
            {employee.userAddress.substring(0,15)}<h4>...</h4>{employee.userAddress.substring(employee.userAddress.length-8,employee.userAddress.length)}
            </span>
            
          </div>
          <div className="flex  md:justify-stretch  justify-between  md:text-xl text-sm w-full gap-2 items-center text-white ">
            <h3 className="ml-4">Amount in Cusd: </h3>
            <span className="mr-4">{Number(employee.payAmount/10**18)}</span>
            
          </div>
          <div className="flex justify-between items-center text-white">
            {userindex !==index? <button onClick={()=>{setFreelancerAddress(employee.userAddress);setUserIndex(index)}} className="inline-flex pl-2 justify-center items-center w-100 rounded-full text-red-500">
              End Contract
            </button>: <button onClick={()=>{removeFreeeLancer()}} className="inline-flex pl-2 justify-center items-center  w-100 rounded-full text-yellow-500">
              Approve
            </button>}
          
           
            
            
          </div>
        </div>
        </div>
      ))}
    </>
  );
};

export default MyFreelancerCard;
