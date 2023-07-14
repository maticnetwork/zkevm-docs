---
id: step3-fullzkevm
title: Create Wallets And Deploy Contracts
sidebar_label: Create Wallets
description: The third step on launching your own zkEVM network on the Goerli testnet.
keywords:
  - polygon
  - zkEVM
  - zkNode
  - deploy full zkevm
---

Continue with the **Third Step** of this Deployment-Guide where you create wallets and deploy contracts.

## Deploying Contracts

Clone the contracts from our [GitHub repository](https://github.com/0xPolygonHermez/zkevm-contracts):

```bash
git clone <https://github.com/0xPolygonHermez/zkevm-contracts.git>
cd zkevm-contracts
npm i
```

### Create Wallets

Next, create a `wallets.js` file with the following content:

```js
const ethers = require("ethers");

async function main() {
  const arrayNames = [
    "## Deployment Address",
    "\\n\\n## Trusted sequencer",
    "\\n\\n## Trusted aggregator",
  ];
  for (let i = 0; i < arrayNames.length; i++) {
    const wallet = ethers.Wallet.createRandom();
    console.log(arrayNames[i]);
    console.log(`Address: ${wallet.address}`);
    console.log(`PrvKey: ${wallet._signingKey().privateKey}`);
    console.log(`mnemonic: "${wallet._mnemonic().phrase}"`);

    const keystoreJson = await wallet.encrypt("password");
    console.log(`keystore: ${keystoreJson}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
```

Don't forget to generate the wallets using below command:

```bash
node wallets.js | tee wallets.txt
```

### Prepare Deploy Configuration

Edit the environment variables:

```bash
cp .env.example .env        # copies .env.example file into .env
nano .env                   # opens .env file for editing
```

Set these variables:

```bash
MNEMONIC="..."              # from wallets.txt Deployment Address mnemonic
INFURA_PROJECT_ID="..."     # your Infura project ID
ETHERSCAN_API_KEY="..."     # your Etherscan API key
```

Next, open the `deploy_parameters.json` file in nano editor:

```bash
cd deployment
cp deploy_parameters.json.example deploy_parameters.json
nano deploy_parameters.json
```

Fill in the relevant details in the `deploy_parameters.json`:

```json
{
  "realVerifier": true,
  "trustedSequencerURL": "<http://X.X.X.X:8545>", // your public IP
  "networkName": "zkevm",
  "version": "0.0.1",
  "trustedSequencer": "", // from wallets.txt Trusted sequencer
  "chainID": 42069, // put your preferred id
  "trustedAggregator": "", // from wallets.txt aggregator sequencer
  "trustedAggregatorTimeout": 604799,
  "pendingStateTimeout": 604799,
  "forkID": 4,
  "admin": "", // from wallets.txt Deployment Address
  "zkEVMOwner": "", // from wallets.txt Deployment Address
  "timelockAddress": "", // from wallets.txt Deployment Address
  "minDelayTimelock": 1,
  "salt": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "initialZkEVMDeployerOwner": "", // from wallets.txt Deployment Address
  "maticTokenAddress": "", // put an existing contract address or leave it empty to auto-deploy a new contract
  "zkEVMDeployerAddress": "", // put an existing contract address or leave it empty to auto-deploy a new contract
  "deployerPvtKey": "",
  "maxFeePerGas": "",
  "maxPriorityFeePerGas": "",
  "multiplierGas": ""
}
```

:::caution Get some GöETH

You will need to send 15 GöETH to the Deployment address listed in `wallets.txt`.

:::

Adjust the `gasPrice` according to the network status. For Goerli, you can check it with the following command, where you insert your Etherscan API key:

```bash
ETHERSCAN_API_KEY="" echo "$(($(printf "%d\\n" $(curl -s "<https://api-goerli.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=$ETHERSCAN_API_KEY>" | jq -r .result))/1000000000)) Gwei"
```

Edit `~/zkevm/zkevm-contracts/deployment/helpers/deployment-helpers.js` to adjust the `gasPrice` according to network status. It is recommended to add 50 Gwei to the current `gasPrice` to ensure transactions are processed quickly.

```js
const gasPriceKeylessDeployment = "50"; // 50 Gwei
```

### Deploy Contracts

```bash
npm run deploy:deployer:ZkEVM:goerli
npm run verify:deployer:ZkEVM:goerli
npm run deploy:testnet:ZkEVM:goerli
npm run verify:ZkEVM:goerli
```

The previous scripts will auto-deploy the MATIC token contract and the `zkEVMDeployer` contract if required.

You will see in the logs the verification of each smart contract deployed, but you can check it on etherscan too.

```html
https://goerli.etherscan.io/address/0x -> Put the Deployer address from
wallets.txt
```
