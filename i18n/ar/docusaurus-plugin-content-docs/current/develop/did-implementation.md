---
id: did-implementation
title: Polygon DID Implementation
sidebar_label: Identity
description: Learn about DID implementation on Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://matic.network/banners/matic-network-16x9.png
slug: did-implementation/getting-started
---

This is a startup guide for users who wish to use the implementation packages published by Polygon team, to generate and publish a Polygon DID on the Polygon ledger.

The Polygon DID method Implementation comprises of 3 packages, namely the polygon-did-registrar, polygon-did-resolver and polygon-did-registry-contract. A user who wants to incorporate the functionality to either register or read a DID on or from Polygon network can use the following guide.

A DID is essentially a unique identifier, that has been created without the presence of a central authority.  DID in context of Verifiable Credentials is used to sign documents, thereby facilitating the user to prove ownership of the document when required.

## Polygon DID Method

The Polygon DID method definition conforms to the DID-Core specifications and standards. A DID URI is composed of three components separated by colons, the scheme, followed by the method name and finally a method specific identifier. For Polygon the URI looks like
```
did:polygon:<Ethereum address>
```
Here the scheme is ‘did’, method name is ‘polygon’ and method specific identifier is an ethereum address.

## Polygon DID Implementation

Polygon DID can be implemented with help of two packages, user can import the respective npm libraries and use them to incorporate Polygon DID methodologies in thier respective applications. Details for implementation are provided in next section.

## Create DID

To get started, one first needs to create a DID. Creation in case of Polygon did is an encapsulation of two steps, first where a user needs to generate a DID uri for themselves and next register it on Polygon ledger.

### Step 1 - Create DID

In your project to create a polygon DID URI one first needs to install
```
npm i @ayanworks/polygon-did-registrar --save
```
Once the installation is completed, the user can use it as follows
```
import { createDID } from "polygon-did-registrar";
```
The createdDID function helps user generate a DID URI. While creating a DID, there can be two scenarios.

1) The user already owns a wallet and wishes to generate a DID correponding to the same wallet.
```
const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
```
2) If the user does not have an existing wallet and wants to generate one, the user can use
```
const {address, publicKey58, privateKey, DID} = await createDID(network);
```
The network parameter in both cases refers to whether the user wants to create the DID on Polygon test network or on Polygon main network.

Sample Input
```
network :"testnet | mainnet"
privateKey? : "0x....."
```
So at the end of step 1, one will have a DID URI generated.
```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### Step 2 - Register DID

To register the DID URI and the corresponding DID document on ledger, the user first needs to use `polygon-did-registrar` as follows
```
import { registerDID } from "polygon-did-registrar";
```
As a prerequisite to registering DID, the user needs to make sure that the wallet corrsponding to the DID has the necessary tokens balance available. Once the user has a token balance in the wallet, a call can be made to the registerDID functionality as given below
```
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```
Parameters `did` and `privateKey` are mandatory, while it is optional to enter the `url` and the `contractAddress`. If the user does not give the last two parameters, the library picks up the default configurations of the network from the DID URI.

If all the parameters match the specifications and everything is given in correct order the registerDID function returns a transaction hash, a corresponding error is returned otherwise.

And with this you have successfully completed your task of registering a DID on the Polygon Network.

## Resolve DID

To start, install the following libraries.
```
npm i @ayanworks/polygon-did-resolver --save
```
and
```
npm i did-resolver --save
```

To read a DID document registered on ledger, any user with a DID polygon URI can first in their project import,
```
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```
after importing the packages the DID document can be retrieved by using
```
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```
where the didResolutionResult object is as follows
```
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

It should be noted that, no gas cost will be entailed by the user while trying to resolve a DID.

## Update DID Document

To encapsulate the project with the ability to update the DID document, the user first needs to use `polygon-did-registrar` as follows
```
import { updateDidDoc } from "polygon-did-registrar";
```
Next is to just call the function
```
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```
It should be noted that to update the DID document, only the owner of DID can send the request.

The private key here should also hold some corresponding Matic tokens.

If the user does not provide the configuration with `url` and `contractAddress`, the library picks up the default configurations of the network from the DID URI.

## Delete DID Document

With Polygon DID implementation a user can also revoke his DID Document from the ledger. The user first needs to use `polygon-did-registrar` as follows
```
import { deleteDidDoc } from "polygon-did-registrar";
```
Then use,
```
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Amongst the parameters it is notable that, `url` and `contractAddress` are optional parameters, which if not provided by the user, a default configuration will be picked up by the function based on the DID URI.

It is important for the private key to hold the necessary Matic tokens, as per the network configuration of DID, or the transaction would fail.


## Contributing to the Repository

Use the standard fork, branch, and pull request workflow to propose changes to the repositories. Please make branch names informative—by including the issue or bug number for example.

### Github Repositories

```
https://github.com/ayanworks/polygon-did-registrar
```

```
https://github.com/ayanworks/polygon-did-resolver
```