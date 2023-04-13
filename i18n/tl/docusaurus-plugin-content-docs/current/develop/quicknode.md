---
id: quicknode
title: I-deploy ang isang Smart Contract gamit ang QuickNode
sidebar_label: Using QuickNode
description:  I-deploy ang mga Smart Contract sa Polygon gamit ang Brownie at Quicknode.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Pangkalahatang-ideya {#overview}

Ang Python ay isa sa mga pinaka-versatile na wika ng programming programming language; mula sa mga mananaliksik na nagpapatakbo ng kanilang mga modelo ng pagsubok sa mga developer na gumagamit nito sa mga mabibigat na kapaligiran ng produksyon, may gumagamit ito ng mga kaso sa bawat posibleng teknikal na field.

Sa tutorial na ito, matututunan mo kung paano gamitin ang balangkas ng [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) para isulat at mag-deploy ng isang smart contract sa pamamagitan ng by ng [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) testnet node para sa Polygon.

:::tip

Para makipag-ugnayan sa Quicknode team, magpadala sa kanila ng mensahe o i-tag sila sa Twitter [@QuickNode](https://twitter.com/QuickNode).

:::

## Mga Kinakailangan {#prerequisites}

- Naka-install ang Python3
- Isang Polygon node
- editor ng code
- Interface ng linya ng command

## Ano ang gagawin mo {#what-you-will-do}

1. I-set up ang Brownie
2. Kumuha ng access sa mga node ng pagsubok sa Quicknode
3. Mag-compile at Mag-deploy ng matalinong kontrata
4. I-check ang deploy na data ng kontrata

## Ano ang Brownie? {#what-is-brownie}

Ang pagbuo ng matalinong kontrata ay pangunahing pinangungunahan ng mga library na nakabatay sa JavaScript tulad ng [web3.js](https://web3js.readthedocs.io/), [web3](https://docs.ethers.io/).js, [truffle](https://www.trufflesuite.com/docs/truffle/) at [Hardhat](https://hardhat.org/). Ang Python ay isang versatile, mataas na ginagamit na wika at maaari ring gamitin para sa smart contract / Web3 development; ang [web3.py](https://web3py.readthedocs.io/en/stable/) ay isang naglalambing na library ng Python na tumutupad ng mga pangangailangan ng Web3. Ibinuo ang balangkas ng brownie sa tuktok ng `web3.py`.

Ang [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) ay isang balangkas na nakabatay sa Python upang bumuo pagsubok at matalino na mga kontrata. May suporta ang Brownie para sa parehong kontrata ng Solidity at Vyper, at nagbibigay pa ito ng pagsubok sa kontrata sa pamamagitan ng [pytest](https://github.com/pytest-dev/pytest).

Upang ipakita ang proseso ng pagsulat at pag-deploy ng smart na kontrata sa Brownie, gagamitin namin ang mga [Brownie-mixes](https://github.com/brownie-mix), na template ng mga proyekto. [Sa](https://github.com/brownie-mix/token-mix) partikular, gagamitin namin ang isang token mix, na isang template ng pagpapatupad ng ERC-20.

## I-install ang mga dependency {#install-dependencies}

Itinayo ang Brownie sa tuktok ng python3, kaya kailangan namin itong i-install para magtrabaho sa Brownie. I-check natin kung may naka-install na tayo ng python3 sa system natin. Para gawin ito, i-type ang sumusunod sa command line tool:

```bash
python3 -V
```

Dapat nitong ibalik ang bersyon ng python3 na naka-install. Kung hindi naka-install, i-download at i-install ito mula sa opisyal na [website ng ·python](https://www.python.org/downloads/).

Gumawa tayo ng direktoryo ng proyekto bago i-install ang Brownie, at gawin ang direktoryo ng proyektong iyon bilang kasalukuyang direktoryo ng trabaho:

```bash
mkdir brownieDemo
cd brownieDemo
```

Ngayong na-install mo na ang python3 sa iyong system, hayaan kaming i-install ang brownie gamit ang pip, ang manager ng package ng Python. Ang Pip ay katulad ng kung ano ang npm para sa JavaScript. I-type ang mga sumusunod sa command line mo:

```bash
pip3 install eth-brownie
```

:::tip

Kung nabigo ang pag-install, puwede mong gamitin ang sumusunod na command sa halip:`sudo pip3 install eth-brownie`

:::

Para suriin kung na-install nang tama ang pag-install ni Brownie, `brownie`i-type ang command line mo, at dapat itong bigyan ng sumusunod na output:

![img](/img/quicknode/brownie-commands.png)

Para makuha ang token mix, i-type ang sumusunod sa command line:

```
brownie bake token
```

Maglilikha ito ng bagong direktoryo `token/`sa aming `brownieDemo`directory.

### Istraktura ng file {#file-structure}

Una sa lahat, mag-navigate sa `token`direktoryo:

```bash
cd token
```

Ngayon, buksan ang `token`direktoryo sa text editor. Sa ilalim ng `contracts/`folder makikita mo , `Token.sol`na siyang pangunahing kontrata namin. Maaari mong isulat ang iyong sariling mga kontrata o baguhin ang `Token.sol`file.

Sa ilalim ng `scripts/`folder, makikita mo ang `token.py`Python script. Gagamitin ang script na ito para i-deploy ang kontrata, at kailangan ang mga pagbabago batay sa mga kontrata.

![img](/img/quicknode/token-sol.png)

Ang kontrata ay isang ERC-20 Marami kang matututunan tungkol sa mga pamantayan ng ERC-20 at kontrata sa gabay na ito [sa mga token ng](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) ERC-20.

## Booting ang iyong Polygon node {#booting-your-polygon-node}

May global na network ang QuickNode ng Polygon Mainnet at Mumbai testnet node. Nagpatakbo din sila ng libreng [public Polygon RPC](https://docs.polygon.technology/docs/operate/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) pero kung may limitado kang pag-rate sa a mo, puwede kang mag-sign up para sa [isang libreng trial node mula sa QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Kopyahin ang **URL** ng HTTP, na magiging kapaki-pakinabang sa ibang pagkakataon sa tutorial.

## setup ng Network at Account {#network-and-account-setup}

Kailangan nating i-set up ang ating QuickNode endpoint sa Brownie. Para gawin ito, i-type ang sumusunod sa command line:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

`YOUR_QUICKNODE_URL`Palitan ang URL ng HTTP ng **Mumbai Testnet** na natanggap lang namin habang booting ng aming Polygon node.

Sa utos sa itaas, `Ethereum`ay ang pangalan ng kapaligiran, at `matic_mumbai`ang pasadyang pangalan ng network; maaari kang magbigay ng anumang pangalan sa iyong custom na network.

Ang susunod na kailangan naming gawin dito ay ang lumikha ng bagong wallet gamit ang Brownie, para gawin itong i-type ang sumusunod sa command line:

```
brownie accounts generate testac
```

Hihilingin mong mag-set up ng password para sa iyong account! Matapos makumpleto ang mga hakbang, will ito ng isang account kasama ang isang mnemonic phrase, i-save ito sa offline. Ang pangalan `testac`ay ang pangalan para sa aming account (Maaari mong piliin ang anumang pangalan na gusto mo).

![img](/img/quicknode/new-account.png)

:::note

Maaaring gamitin ang mga parirala ng mnemonic para mabawi ang isang account o i-import ang account sa iba pang [<ins>non-custodial wallet</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode). Ang account na nakikita mo sa larawan sa itaas ay nilikha lamang para sa gabay na ito.

:::

Kopyahin ang address ng account para makakuha kami ng ilang test MATIC, na kakailanganin na i-deploy ang aming kontrata.

## Pagkuha ng Testnet MATIC {#getting-testnet-matic}

Kakailanganin namin ang ilang test MATIC token para magbayad para sa mga bayad sa gas para i-deploy ang smart contract namin.

Kopyahin ang address ng iyong account na binuo namin sa tutorial na ito, i-paste ito sa address field ng [gripo](https://faucet.polygon.technology/) ng Polygon, at i-click ang **Isumite** Ang gripo ay magpapadala sa iyo ng 0.2 na pagsubok na MATIC.

![img](/img/quicknode/faucet.png)

## Pag-deploy ng iyong Smart Contract {#deploying-your-smart-contract}

Bago i-deploy ang kontrata, kailangan mong i-compile ito gamit ang:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Ibukas ang `scripts/token.py`sa iyong text editor, at gawin ang mga sumusunod na pagbabago:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Paliwanag

Gamit ang code sa itaas, mayroon kaming import na `testac`account na nilikha namin kanina, at iniimbak ito nang `acct`iba-iba. Gayundin, sa susunod na linya, nag-edit kami ng `'from':`bahagi para makatanggap ng data mula sa `acct`variable.

:::

Sa wakas, i-deploy namin ang aming smart contract:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`ay ang pangalan ng custom network na nilikha namin kanina. Hihilingin ka ng prompt ang **password** na itinakda namin nang mas maaga habang gumagawa ng account.

Pagkatapos patakbuhin ang command sa itaas, dapat mong makuha ang hash ng transaksyon, at maghihintay si Brownie para makumpirma ang transaksyon. Kapag nakumpirma na ang transaksyon, ibabalik nito ang address kung saan naka-deploy ang aming kontrata sa testnet ng Polygon Mumbai.

![img](/img/quicknode/brownie-run.png)

Maaari mong tingnan ang naka-deploy na kontrata sa pamamagitan ng pag-copy at paste sa address ng kontrata sa [Polygonscan Mumbai](https://mumbai.polygonscan.com/).

![img](/img/quicknode/polygonscan.png)

## Pag-test sa Kontrata {#testing-the-contract}

Nag-aalok din si Brownie ng opsyon ng pagsubok ng matalino mga pag-andar ng kontrata. Ginagamit nito ang `pytest` na framework para madaling makabuo ng mga pagsubok ng unit. Makakahanap ka ng higit pang impormasyon tungkol sa pagsulat ng mga pagsubok sa Brownie [sa kanilang dokumentasyon](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#).

**Ito ay kung paano na-deploy ang mga kontrata sa Polygon gamit ang Brownie at QuickNode.**

Ang QuickNode, tulad ng Polygon, ay laging may isang unang diskarte sa education-first nagbibigay ng mga gabay sa [developer](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [docs](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [tutorial videos](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) at isang [komunidad ng mga developer ng Web3](https://discord.gg/DkdgEqE) na sabik na tumulong sa isa't isa.
