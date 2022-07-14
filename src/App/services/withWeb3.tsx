import React from "react";
import { useState } from "react";
import Web3 from "web3";

interface props {
  checkWallet: () => void;
  signMessage: (web3: Web3, hasWallet: boolean) => Promise<void>;
  children?: React.ReactNode;
}

function withWeb3(WrappedComponent: React.ComponentType<any>) {
  function WithWeb3(props: any) {
    const [web3, setWeb3] = useState(new Web3(window.ethereum));
    const [signHash, setSignHash] = useState<string>();
    const [hasWallet, setHasWallet] = useState<boolean>(false);

    function checkWallet() {
      setHasWallet(window.ethereum ? true : false);
      noWalletErr(window.ethereum);
    }
    function noWalletErr(hasWallet: boolean) {
      if (hasWallet) return;
      return alert("To sign a message, you should intall a wallet!");
    }

    async function signMessage(
      web3: Web3,
      hasWallet: boolean,
      message: string
    ) {
      if (!hasWallet) return;
      const signedMessage = await web3.eth.personal.sign(
        message,
        await getAccounts(web3),
        "12345678"
      );
      setSignHash(signedMessage);
      console.log(signedMessage);
    }
    async function getAccounts(web3: Web3) {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
    return (
      <WrappedComponent
        {...props}
        {...{ checkWallet, signMessage, web3, hasWallet, signHash }}
      />
    );
  }
  return WithWeb3;
}

export default withWeb3;
