---
id: installation
title: 설치
keywords:
    - pos client
    - erc20
    - withdrawExit
    - polygon
    - sdk
description: Matic.js 및 이더리움 라이브러리를 설치합니다.
---

Maticjs는 두 부분으로 구성되어 있습니다.

1. 메인 라이브러리
2. 이더리움 라이브러리

### 메인 라이브러리 {#main-library}

메인 라이브러리는 핵심 논리를 포함하고 있으며 다양한 API를 제공합니다. 사용자는 대부분 이 라이브러리와 상호작용합니다.

```
npm i @maticnetwork/maticjs
```

### 이더리움 라이브러리 {#ethereum-library}

이더리움 라이브러리를 통해 선호하는 이더 라이브러리를 사용할 수 있습니다. 플러그인을 통해 maticjs에 삽입됩니다.

matic.js는 두 개의 인기있는 라이브러리를 지원합니다.

1. [Web3.js](https://web3js.readthedocs.io/)
2. [Ethers](https://docs.ethers.io/)

#### Web3.js {#web3-js}

```
npm install @maticnetwork/maticjs-web3
```

#### ethers {#ethers}

```
npm install @maticnetwork/maticjs-ethers
```
