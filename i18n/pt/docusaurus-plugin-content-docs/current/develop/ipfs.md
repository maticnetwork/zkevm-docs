---
id: ipfs
title: IPFS
description: "IPFS - sistema distribuído para armazenar e aceder a dados."
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### Contexto {#context}

A blockchain da Polygon reduz os custos da transação para armazenar dados versus a Mainnet Ethereum, contudo, mesmo esses custos mais reduzidos avolumam-se rapidamente num armazenamento de ficheiros de tamanho considerável. Os programadores devem também ter em conta os limites inerentes ao tamanho do bloco e à velocidade da transação aquando do armazenamento de dados na chain. Uma solução que aborda todas estas preocupações é o IPFS, o Sistema de Ficheiros InterPlanetários.

#### O que é IPFS? {#what-is-ipfs}

O IPFS é um sistema distribuído para armazenar e aceder a ficheiros, websites, aplicações e dados. O IPFS usa a descentralização, o endereçamento de conteúdos e uma rede ponto a ponto robusta de participantes ativos para permitir aos utilizadores armazenar, solicitar e transferir dados verificáveis entre si.

A descentralização possibilita o download de um ficheiro a partir de várias localizações que não são geridas por uma só organização, oferecendo imediatamente resiliência e resistência contra a censura.

O endereçamento de conteúdos usa a criptografia para criar um hash verificável exclusivo com base no conteúdo do ficheiro e não na sua localização. O identificador do conteúdo (CID) resultante garante que um dado é idêntico independentemente do local onde é armazenado.

Finalmente, uma comunidade ativa de utilizadores cada vez maior torna esta partilha de conteúdo de ponto a ponto possível. Os desenvolvedores carregam e fixam conteúdo para IPFS enquanto os provedores de armazenamento de Filecoin ou and ajudam a garantir o armazenamento persistente desse conteúdo.


O armazenamento baseado no IPFS simplesmente permite armazenar o CID do seu conteúdo em vez de carregar ficheiros inteiros no blockchain da Polygon; permitindo uma redução dos custos, ficheiros de maior dimensão e armazenamento permanente comprovado. Para mais detalhes, consulte [os documentos do IPFS](https://docs.ipfs.io/).

### Projetos de exemplo {#example-projects}

1. Tutorial no andaime que demonstra como minerar um NFT no Polygon com IPFS - [link](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. Construir um aplicativo web3 de pilha completa com Next.js, Polygon, Solidity, The Graph, [IPFS](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74) e Hardhat
