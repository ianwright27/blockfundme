import React, { useState, useEffect } from "react";
import { ethers } from "./ethers-6.7.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const FundMe = () => {
  // FundMe contract
  const contract_address = contractAddress;
  const contract_abi = abi;
  console.log(contract_abi);

  const accountIndex = 0; // "0"

  const [transactionConfirmed, setTransactionConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [contractOwner, setContractOwner] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  // This will run whenever contract is initialized
  useEffect(() => {
    const fetchOwner = async () => {
      if (contract) {
        try {
          const owner = await contract.getOwner();
          setContractOwner(owner);
          setIsOwner(defaultAccount.toLowerCase() === owner.toLowerCase());
        } catch (err) {
          console.log("Error fetching contract owner:", err);
        }
      }
    };

    fetchOwner();
  }, [contract, defaultAccount]); // Run when contract or defaultAccount changes

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          const selectedAccount = accounts[0];
          accountChangedHandler(selectedAccount);
          setDefaultAccount(selectedAccount);
        } else {
          setErrorMessage("No account selected. Please try again.");
        }
      } catch (err) {
        setErrorMessage("Error connecting wallet");
        console.log(err);
      }
    } else {
      setErrorMessage("You need to install MetaMask");
    }
  };

  const accountChangedHandler = async (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  // Update ethers.js setup
  const updateEthers = async () => {
    if (window.ethereum) {
      const tempProvider = new ethers.BrowserProvider(window.ethereum);
      const tempSigner = await tempProvider.getSigner();
      const tempContract = new ethers.Contract(
        contract_address,
        contract_abi,
        tempSigner
      );

      setProvider(tempProvider);
      setSigner(tempSigner);
      setContract(tempContract);

      console.log(contract); // Make sure this is not null before calling methods
    } else {
      setErrorMessage("MetaMask is not installed.");
    }
  };

  const fundHandler = async () => {
    if (!contract) return;

    const tx = {
      to: contractAddress,
      value: ethers.parseEther("0.02"), // for example
    };

    if (typeof window.ethereum !== "undefined") {
      try {
        const txResponse = await contract.fund({
          value: ethers.parseEther("0.002"),
        });
        await txResponse.wait(1);
        // set a status message that alerts the user
        setTransactionConfirmed(true);
        console.log("Transaction successful!", txResponse);
      } catch (err) {
        console.log(err);
        setErrorMessage("Transcation failed.");
      }
    } else {
      setErrorMessage("Please install MetaMask");
    }
  };

  const handleConfirm = () => {
    console.log(contract); // Make sure this is not null before calling methods
  };
  return (
    <div className="fund-me">
      <button className="connect-wallet" onClick={connectWalletHandler}>
        {defaultAccount ? "Wallet Connected" : "Connect Wallet"}
      </button>
      <p> {defaultAccount && "Address:" + defaultAccount} </p>
      {/* Status Messgage */}
      {transactionConfirmed && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          "Transaction Confirmed!!"
        </p>
      )}
      {/* Error Message */}
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}
      {/* defaultAccount needs to be there for the UI to be there */}

      {contract && defaultAccount && (
        <div>
          {/* <button onClick={handleConfirm}>
            confirm_contract_exists (debug)
          </button> */}
          <br></br>
          <h3>Options</h3>
          <button
            // onClick={() => contract.fund({ value: ethers.parseEther("0.002") })}
            onClick={fundHandler}
          >
            Fund (0.02 ETH)
          </button>
          {isOwner && (
            <div>
              <p style={{ color: "green" }}>[+] You are [contract owner]</p>
              <button onClick={() => contract.cheaperWithdraw()}>
                Withdraw
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FundMe;
