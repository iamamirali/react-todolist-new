import Web3 from "web3";

export interface Web3Props {
    checkWallet: () => void,
    signMessage: (message: string) => Promise<string>,
    web3: Web3,
}