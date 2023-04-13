---
id: bandchain
title: BandChain
sidebar_label: Bandchain
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Band Protocol allows you to query data from traditional web APIs and use it in the blockchain. Developers can make query through BandChain, a cosmos-based blockchain for facilitating oracle requests and payment, and then use the data on the dApp through inter-chain communication. Integrating oracle data can be done in 3 simple steps:

1. **Choosing the oracle scripts**

    Oracle script is a hash that uniquely identifies the type of data to be requested from band-chain. These scripts can be found [**here**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). These scripts are used as one of the parameters while making the oracle request.

2. **Requesting Data from BandChain**

 This can be done in two ways:

- Using the BandChain explorer

    You can click on the oracle script of your choice and then from the execute tab you can pass in the parameters and get the response from BandChain. The response will contain the result and also an evm proof. This proof has to be copied and will be used in the final step. The BandChain docs for querying oracle using explorer is given [**here**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Given above is an example of making an oracle request to get the random number values. The value 100 is passed to the max_range parameter of the oracle request. We get a hash in response. Clicking on this hash will show us the complete details of the response.

- Using the BandChain-Devnet JS Library

    You can query Bandchain directly using the bandchain Devnet library. When queried, it gives an **evm proof** in the response. This proof can be used for the final step of BandChain integration. The BandChain docs for querying oracle using BandChain-Devnet JS Library is given [**here**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). The request payload for the random number oracle will look like this. Make sure the request body is passed in application/json format.

3. **Using the data in smart contracts**

  The final step is to deploy a validation contract and store the responses from the oracle request into the validation contracts state variables. Once these state variables are set, they can be accessed as and when required by the dapp. Also these state variables can be updated with new values by querying the oracle scripts again from the dApp. Given below is a validation contract that stores the random number value using the random number oracle script.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash , 
      bytes memory _params, 
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

  When deploying, 3 parameters has to be passed. The first parameter is the codeHash which is the oracle script hash. The second parameter is the oracle script request parameters object. This has to be passed in the the bytes format.  BandChain provides a REST API for converting the parameter JSON object to bytes format. The API details can be found [**here**](https://docs.bandchain.org/references/encoding-params). A 0x has to be appended to the response received from this API. The third parameter is the contract address of the Bandchain contract that is already deployed on Polygon network. Band Protocol Supports Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

  Another thing to note is that the validation contract should import the helper library and interface which is called BandChainLib.sol and IBridge.sol respectively. They can be found from the following links: [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) Library  and [**IBridge**](https://docs.bandchain.org/references/ibridge-interface) interface.

  Once the validation contract is deployed, the state variables can be accessed by querying from a dApp. Similarly multiple validation contracts can be created for different built in oracle scripts. The IBridge interface has a method called relayAndVerify that verifies the values being updated each time in the validation contract. The update method in the validation contract has the logic to update the state variables. The evm proof obtained from querying the oracle script has to be passed to the update method. Each time a value is updated, the BandChain contract deplpyed on Polygon verfies the data before storing it in the contract state variable.

  The bandChain provides a decentralised network of oracles that can be used by dApps to boost their smart contract logic. The BandChain docs on deploying the contract,storing the values and updating them can be found [**here**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library).