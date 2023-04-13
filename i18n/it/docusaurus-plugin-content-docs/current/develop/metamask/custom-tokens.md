---
id: custom-tokens
title: Configurare Token personalizzati
description: Configurare token personalizzati su Metamask.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Questa pagina mostra il processo di configurazione/aggiunta di token personalizzati a Metamask.

Puoi utilizzare lo stesso processo per aggiungere qualsiasi token personalizzato a qualsiasi rete su Metamask. Puoi fare riferimento a [questa tabella](#tokens-and-contract-adresses) per visualizzare alcuni esempi di token di test con i rispettivi indirizzi contract.

## Aggiungere un token personalizzato al tuo account MetaMask {#adding-a-custom-token-to-your-metamask-account}

Per prima cosa, scegli la rete adatta per il nuovo token sulla schermata iniziale della tua Metamask. Quindi clicca su "Importa Tokens".

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

Poi ti navigate in una nuova schermo. Nella schermata Importa Tokens, copia incolla un indirizzo nel campo Indirizzo Token.

:::info
Per illustrare questo processo, utilizziamo un token E**RC20-TESTV4 **sulla **rete Goerli.** Trova altri token di test da altre reti [<ins>qui</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Gli altri campi verranno compilati automaticamente. Clicca su Aggiungi Token personalizzati e quindi clicca su Importa Tokens. Ora, il token `TEST` dovrebbe apparire nel tuo account su Metamask.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Aggiunta di un token ERC1155 di prova al tuo account Metamask**

Mentre la rete Polygon supporta ERC1155, [Metamask non supporta ancora lo standard](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). L'aggiornamento è previsto per il quarto trimestre del 2021.

### Token e contract {#tokens-and-contract-adresses}

| token | Rete | Indirizzo del contratto |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |