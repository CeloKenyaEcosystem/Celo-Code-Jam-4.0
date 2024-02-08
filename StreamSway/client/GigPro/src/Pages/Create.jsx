import React, { useState } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
//import "../styles/createflow.css";
import { ethers } from "ethers";

//where the Superfluid logic takes place
async function createNewFlow(recipient, flowRate) {
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
  const daix = await sf.loadSuperToken("CELOx");
  

  console.log(daix);

  try {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
      }
    const createFlowOperation =daix.createFlow({
      sender: await superSigner.getAddress(),
      receiver: recipient,
      flowRate: flowRate
      // userData?: string
    });

    console.log(createFlowOperation);
    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(superSigner);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

export const CreateFlow = () => {
  const [recipient, setRecipient] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [flowRate, setFlowRate] = useState("");
  const [flowRateDisplay, setFlowRateDisplay] = useState("");

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  const handleRecipientChange = (e) => {
    setRecipient(() => ([e.target.name] = e.target.value));
  };

  const handleFlowRateChange = (e) => {
    setFlowRate(() => ([e.target.name] = e.target.value));
    let newFlowRateDisplay = calculateFlowRate(e.target.value);
    setFlowRateDisplay(newFlowRateDisplay.toString());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2>Send Stream</h2>
      {/* <div className="send-stream-inputs"> */}
      <div className="input-container">
        <input
          className="send_stream"
          name="recipient"
          value={recipient}
          
          onChange={handleRecipientChange}
          placeholder="Enter recipient address"
        ></input>
      </div>
      <div className="input-container">
        <input
          className="send_stream"
          name="token"
          value={"fDAIx"}
          
          placeholder="Enter recipient address"
        ></input>
      </div>
      <div className="input-container">
        <input
          className="send_stream"
          name="flowRate"
          value={flowRate}
          onChange={handleFlowRateChange}
          placeholder="Enter a flowRate in wei/second"
        ></input>
      </div>
      <div className="description">
        <div className="calculation">
          <p>Your flow will be equal to:</p>
          <p>
            <b>${flowRateDisplay !== " " ? flowRateDisplay : 0}</b> fDAIx/month
          </p>
        </div>
      </div>
      <button
        className="send_stream"
        onClick={() => {
          setIsButtonLoading(true);
          createNewFlow(recipient, flowRate);
          setTimeout(() => {
            setIsButtonLoading(false);
          }, 1000);
        }}
      >
        Send Stream
      </button>
    </div>
    // </div>
  );
};