import Web3 from "web3";

export interface Web3Props {
    checkWallet: () => void,
    signMessage: (web3:Web3, hasWallet: boolean, message: string) => any,
    web3: Web3,
    hasWallet: boolean,
    signHash: string
}