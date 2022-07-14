/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useState } from "react";
import Web3 from "web3";

function withWeb3(WrappedComponent: React.ComponentType<any>) {
  function WithWeb3(props: any) {
    const { ethereum } = window;
    const [web3, setWeb3] = useState<Web3>(new Web3(ethereum));
    const { eth } = web3;

    function checkWallet() {
      if (ethereum) setAccount();
      else alert("To sign a message, you should intall a wallet!");
    }
    async function setAccount() {
      await eth.requestAccounts();
    }

    async function signMessage(message: string) {
      return await eth.personal.sign(message, await getAccount(), "12345678");
    }
    async function getAccount() {
      const accounts = await eth.getAccounts();
      return accounts[0];
    }
    return (
      <WrappedComponent {...props} {...{ checkWallet, signMessage, web3 }} />
    );
  }
  return WithWeb3;
}

export default withWeb3;
