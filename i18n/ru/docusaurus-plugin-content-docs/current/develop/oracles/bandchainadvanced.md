---
id: bandchainadvanced
title: BandChain Advanced
sidebar_label: Advanced
description: Build your next blockchain app on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Smart contracts contain a set of logic based on which the Dapps work. But they cant just rely on user input and will need external information to power their logic. BandChain provides a set of oracle scripts that can be used to communicate with the external web API's. Once the data is received from the decentralised BandChain network, it can be used in the dApps when required.

<img src={useBaseUrl("img/bandchain/bandchain.png")} />

The whole process can be understood clearly from the architecture given above. Initially a request is made to the BandChain network. There will be a small delay in receiving the response from the network. This response has to be stored in a validation contract which will be deployed on Polygon. Its important to note that this validation contract is different from the BandChain contract already deployed on Polygon. So once this validation contract is deployed, the external web API response data can be updated in a state variable in the validation contract when required. This validation contract makes use of the BandChain contract to validate the data being stored into it. The dApps can query this validation contract anytime it needs to get any data from the external world. The upcoming steps will help in understanding this architecture in a better way.

 **1.** **Choosing the oracle script**

These oracle scripts are needed to query external data. The scripts uniquely identify the data we wish to request. Go to [http://scan.alpha.bandchain.org](http://scan.alpha.bandchain.org/). There, you will find the explorer with information on BandChain. We will next visit the Oracle Scripts page using the link in the top right corner. You can also visit the oracle scripts directly from [http://scan.alpha.bandchain.org/scripts](http://scan.alpha.bandchain.org/scripts). Here you can see a few built in oracle scripts. We will be using the random number generator example to explain the whole process. So lets click on the Random generator oracle script which is labelled as random_u64.

<img src={useBaseUrl("img/bandchain/oraclescripts.png")} />

 **2. Executing the script**

When you click on the script you will be redirected to another page where you can see the details of the script. The script hash will be `0xe7944e5e24dc856dcb6d9926460926ec10b9b66cf44b664f9971b5a5e9255989`. The other details include the recent transactions related to the script, the script code and also a tab called execute. If we move to this tab we can execute this script. You need to pass a numeric value to the max_range parameter. This parameter indicates the maximum range for your random number. Once you click on send request, a hash is generated in a few seconds.

<img src={useBaseUrl("img/bandchain/executeoracle.png")} />

When you click on the hash you will be redirected to another page that shows the result of the request. Here you have to click on the data request message which will lead you to another page where you can view the complete details of the response and also the proof of validity from BandChain. Here you can also see the random number being generated along with a timestamp. Under the Proof of Validity tab, click Copy proof for Ethereum, which generates a payload that works with every EVM-compatible blockchains that BandChain supports. This payload has to be used to update the state variables in the validation contract.

<img src={useBaseUrl("img/bandchain/copyproof.png")} />

This is one way to make the oracle request. Here we used the explorer. There is also another way to make the requests which is by using the Bandchain REST API's.

The API endpoint to make the requests is [http://rpc.alpha.bandchain.org/bandsv/request](http://rpc.alpha.bandchain.org/bandsv/request). This can be accessed directly from dApps by making use of HTTP client libraries like axios. For this example we will make use of the tool called Postman which is a very useful tool to test API endpoints. It can be directly downloaded from [https://www.postman.com](https://www.postman.com/). Once its downloaded you can install the Postman application and start making any type of HTTP requests. The oracle request API is a POST method which accepts body parameters in the application/json format. Basically there are three parameters.

A. type - It is of type string and can take the values "SYNCHRONOUS" | "ASYNCHRONOUS" | "FULL". We recommend using the "FULL" mode when making request from dApps.

B. params - It is of type object. The random generator example will need the parameters as {"max_range": "100"}.

C. codeHash: It is of type string and accepts the oracle script as the value. In our example the value for this field will be `0xe7944e5e24dc856dcb6d9926460926ec10b9b66cf44b664f9971b5a5e9255989`. Make sure to remove the '0x' from the oracle script if it is present.

Overall the payload and the request looks like this :-

<img src={useBaseUrl("img/bandchain/requestapi.png")} />

In postman you make the request as shown above to get a response which contains the random number,the timestamp and also the proof of validity. There will also be a field called evmProofBytes in the response which is the payload you will require in the next step to update the state variables in the validation contract. In the above request you can replace the oracle script and param object to make requests to various built in oracle scripts.

**3. Using the data in smart contracts**

This is the step where you will actually store the data in the validation contract on Polygon. Before storing you will need to deploy a validation contract. So this is how a validation contract will look like.

```jsx
pragma solidity 0.5.14;
pragma experimental ABIEncoderV2;

import "BandChainLib.sol";
import "IBridge.sol";

contract RandomNumber {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public randomNumber;
    uint256 public lastUpdate;

    constructor(bytes32 _codeHash, bytes memory _params, IBridge _bridge)
        public
    {
        codeHash = _codeHash;
        params = _params;
        bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
        IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(
            _reportPrice
        );
        uint64[] memory decodedInfo = result.data.toUint64List();

        require(result.codeHash == codeHash, "INVALID_CODEHASH");
        require(
            keccak256(result.params) == keccak256(params),
            "INVALID_PARAMS"
        );
        require(
            uint256(decodedInfo[1]) > lastUpdate,
            "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE"
        );

        randomNumber = uint256(decodedInfo[0]);
        lastUpdate = uint256(decodedInfo[1]);
    }
}
```

Its important to note this contract has two state variables namely randomNumber and lastUpdated to store the random number value and the timestamp of last updated time respectively. The RandomNumber contract should also import BandChainLib.sol and IBridge.sol which are helper libraries and interfaces. These two helpers are compulsory to create a validation contract. They can be found from [https://docs.bandchain.org/references/bandchainlib-library](https://docs.bandchain.org/references/bandchainlib-library) and [https://docs.bandchain.org/references/ibridge-interface](https://docs.bandchain.org/references/ibridge-interface) respectively.

Once you have imported these two files into the main solidity contract, you can go to remix, create three solidity files RandomNumber.sol, IBridgesol and BandChainLib.sol with the respective content. Do change the compiler version to 0.5.14 for the above example to work. Compile the contract and set the MetaMask RPC to point to [https://testnetv3.matic.network](https://testnetv3.matic.network/) which is the Polygon TestnetV3. If you face difficulty in configuring MetaMask you can follow this [tutorial](/docs/develop/metamask/config-polygon-on-metamask).

<img src={useBaseUrl("img/bandchain/cmpilecontract.png")} />

Once the compilation is successful, next step is to deploy the RandomNumber Contract. This contract takes 3 parameter in the constructor arguments. The first parameter is the codeHash parameter which takes in the oracle script hash as its value. So in our example we have to use `0xe7944e5e24dc856dcb6d9926460926ec10b9b66cf44b664f9971b5a5e9255989` as the hash value. The second parameter is params which takes in the serialized string of parameters for the oracle request. To get this serialised string which is in the form of bytes, Bandchain provides an API which has the endpoint [http://rpc.alpha.bandchain.org/zoracle/serialize_params/:codeHash](http://rpc.alpha.bandchain.org/zoracle/serialize_params/:codeHash). This is a GET method which can be hit using the HTTP client library like axios. For this example we will use the Postman tool to hit this API. The ':codeHash' in the URL can be replaced with the oracle script hash and the param object (to be converted into bytes) can be passed as a query param to this endpoint using the params key. For this example the Postman GET request looks like this.

<img src={useBaseUrl("img/bandchain/bytesapi.png")} />

The value of the result key from the above API response can be converted into hex by simply appending 0x to it. In this example the final hex value will be 0x0000000000000064. Note that we have passed 100 as the value to the max_range key of the params object. The value of the max_range should be the same as the value used when making the oracle request in step 2. The third parameter is the bridge which takes in the contract address of the BandChain contract already deployed on Polygon TesntetV3 as its value. The contract address of the BandChain contract is `0x3ba819b03fb8d34995f68304946eefa6dcff7cbf`.

<img src={useBaseUrl("img/bandchain/deploycontract.png")} />

Now, the contract can be deployed. Once the deployment is successful, the value of the randomNumber state variable can be updated when required using the update method of the contract. Here comes the meat of BandChain's magic. The update function takes just one parameter bytes memory _reportPrice, which takes data we requested from BandChain. If we go back to step 2, we can see that we had received a payload when we requested the BandChain network. It will be the value of evmProofBytes in the response object. It has to be converted to a hex by appending 0x to its start. This is finally passed to the update method of the contract. From the image below we can see that initial value of randomNumber is 59.

<img src={useBaseUrl("img/bandchain/update.png")} />

Next, we need to decode the request information from the _reportPrice. We do that using IBridge.relayAndVerify function which returns IBridge.VerifyOracleDataResult struct containing the data, codeHash, and the params of the request. In order to read the data, which in this case are  random number and timestamp, we use BandChainLib.toUint64List on the result.data bytes.

In order to verify the integrity of the data, we check that the codeHash and params of the request match with the ones we specified in constructor. Lastly we make sure the the contract will always update the price with newer timestamp only.

Now we have decoded the data, validated its identity and verified the condition for random number value update. We can now update the smart contract state with the random number value and timestamp we get from the BandChain. After the execution of the update method we can see that the value of randomNumber has now changed to 17.

<img src={useBaseUrl("img/bandchain/updated.png")} />

Now, anytime a random number is required, the dapp has to hit the BandChain api "using the same paramters", get a new evmProof and use it to update the validation contract. The validation contract can then be queried by the dapp to access the random number value. Each time the state variables are updated the value to be updated is validated by the BandChain contract already deployed on Polygon.

This example was a demonstration of how the random number value can be stored and updated as an when required. This value can be used by dApps to power their smart contract logic. Similarly other validation contracts can be created to store several values. The Bandchain provides several built in oracle scripts. Also, you can use truffle to deploy the validation contract and web3 to interact with the contract instead of using remix.