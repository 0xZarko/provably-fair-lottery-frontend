# Provably Fair Lottery Frontend

This is the frontend project for the previously developed [lottery project](https://github.com/0xZarko/provably-fair-lottery).

It was developed using NextJS, bootstrapped with the create-next-app package, and uses the [react-moralis](https://www.npmjs.com/package/react-moralis) and [Web3UIKit](https://github.com/web3ui/web3uikit) component libraries.

It let's you connect a wallet using multiple providers, use the view functions of the smart contract to see how many players are playing the current round of the lottery, the last winner, the entrance fee and let's you enter the lottery by firing a transaction with the correct msg.value calling the enterLottery function.

It gets the smart contract addresses and ABIs from the Hardhat deployment script automatically.

## How to Run the Web App 

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser.

## Fleek (IPFS) deployment

Webapp was deployed using Fleek. To access it, you can use:

CID: [QmbNKsvaswbvUFpaCZRYuUQpaDutBFQP7trTLLQ627XWJb](ipfs://bafybeigbsxglrpdpvahev4wbz7dql5ocfxb3qukow3336cjofwgbjj3hqa)

URL: [lively-salad-6463.on.fleek.co](https://lively-salad-6463.on.fleek.co)

Since I have not deployed the smart contracts on any testnet, only on the local hardhat chain, you will have to spin up a local hardhat node from the [lottery project](https://github.com/0xZarko/provably-fair-lottery) by doing:

```bash
hh node
```

Then add the local hardhat chain to Metamask or another wallet provider, alongside the local hardhat accounts.