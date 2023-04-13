---
id: consensus-mechanism
title: Mecaniso de Consenso
description: "PoW, PoS, DPoS, PoSpace e PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Mecaniso de Consenso {#consensus-mechanism}

Um mecanismo de Consenso é um mecanismo tolerante a falhas, que é utilizado em sistemas computacionais e de blockchain para alcançar o acordo necessário em um único valor de dados ou um único estado da rede entre processos distribuídos ou sistemas multiagentes, como com as criptomoedas.

## Tipos de Mecanismo de Consenso {#types-of-consensus-mechanism}

### Prova de trabalho {#proof-of-work}
Proof of Work descreve um sistema que requer uma quantidade não insignificante mas viável de esforço para deter ataques DoS (denial-of-service) e outros ataques maliciosos. Ele precisa resolver um quebra-cabeça computacional desafiador para criar novos blocos no Blockchain.

### Proof of Stake {#proof-of-stake}
O mecanismo de prova de Stake consegue consenso exigindo que os usuários estabeleçam uma quantidade de seus tokens para ter a chance de serem selecionados para validar blocos de transações e serem recompensados por fazê-lo. A prioridade é dada a mineiros que compraram a maior quantidade de stake no sistema de blockchain.

### Prova de Stake Delegada {#delegated-proof-of-stake}
Esta forma de consenso espelha a escolha de membros em órgãos governamentais. Em vez de se hospedar os seus ativos, as partes interessadas podem delegar esta atividade a terceiros, a testemunha ou delegados, que participarão do processo de consenso. As testemunhas, aqueles que validam transações, geralmente apresentam uma proposta, pedem votos e são eleitos pelos stakeholders. As recompensas obtidas por essas entidades são geralmente compartilhadas com os participantes da rede.

### Prova de espaço {#proof-of-space}
Este tipo de mecanismo de consenso é útil em aplicativos de armazenamento de arquivos descentralizados como no Storj.io, Filecoin e Crust, onde nós provam que eles têm capacidade legítima no hardware. No entanto, em vez de usar computação pesada como no mecanismo PoW, ele aproveita a capacidade de armazenamento de cada nó. Algumas vezes também referido como PoStorage (Armazenamento Po) ou PoCapacity (Capacidade Po).

### Prova do tempo decorrido {#proof-of-elapsed-time}
Uma alternativa melhor à PoW, consumindo menos recursos computacionais. Cada nó participante precisa aguardar uma quantidade de tempo aleatória e o primeiro nó para acordar do sono tem a chance de criar um novo bloco, que é propagado pela rede. Ele requer Ambientes de Execução Confiáveis (TE) como o Intel SGX, que são uma parte isolada da memória e só podem ser acessados usando um determinado conjunto de instruções.

## **Recursos**

- [Tolerância de falhas](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [Tipo de mecanismos de consenso](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [Visão geral e histórico do desenvolvimento do sistema de consenso](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [Compreender o consenso distribuído](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [Problema dos generais bizantinos](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)