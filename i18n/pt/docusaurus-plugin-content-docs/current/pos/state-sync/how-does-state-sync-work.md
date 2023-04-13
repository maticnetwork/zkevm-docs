---
id: how-state-sync-works
title: Como funciona a sincronização de estado?
description: "Enviar o estado da chain Ethereum para a chain BOR."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# Como funciona a sincronização de estado? {#how-does-state-sync-work}

A gestão do estado envia o estado da chain Ethereum para a chain BOR. É chamado **de sync**.

A transferência de estado do Ethereum para o Bor acontece através da chamada do sistema. Suponha que um usuário deposite USDC ao gerenciador de depósitos no Ethereum. Os validadores escutam esses eventos, validam e os armazenam no estado de Heimdall. A BOR obtém os mais recentes registos de sincronização de estado e atualiza o estado BOR (faz mint uma quantidade igual de USDC na BOR) usando uma CALL do sistema.

## Remetente do estado {#state-sender}

Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Para sincronizar o estado, o contrato chama o seguinte **contrato do remetente do estado** do método na chain Ethereum.

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

O contrato `receiver` tem de estar presente na chain filha, que recebe os `data` do estado assim que o processo termina. `syncState` emite um evento `StateSynced` na Ethereum, que é o seguinte:

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

Assim que o evento `StateSynced` é emitido no contrato `stateSender` da chain Ethereum, a Heimdall escuta esses eventos e adiciona-os ao estado Heimdall depois de mais de 2/3 dos validadores concordarem com o mesmo.

Depois de cada sprint (atualmente 64 blocos na BOR), a BOR obtém um novo registo de sincronização de estado e atualiza o estado usando uma CALL de `system`. Aqui está o código para o mesmo: [https://github.com/maticnetwork/bor/blob/6f008daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

Durante o `commitState`, a BOR executa `onStateReceive`, com `stateId` e `data` como argumentos, no contrato de destino.

## Interface do destinatário do estado na BOR {#state-receiver-interface-on-bor}

O contrato `receiver` na chain BOR tem de implementar a seguinte interface.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Apenas `0x0000000000000000000000000000000000001001` — `StateReceiver.sol` deve ter permissão para fazer CALL da função `onStateReceive` no contrato de destino.

## CALL de sistema {#system-call}

Apenas o endereço do sistema, `2^160-2`, permite fazer uma CALL do sistema. A BOR chama-o internamente com o endereço do sistema como `msg.sender`. Altera o estado do contrato e atualiza a raiz de estado para um determinado bloco. Inspirado em [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) e [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

A CALL do sistema é útil para alterar o estado do contrato sem efetuar qualquer transação.

## Registos de sincronização de estado e recibo do bloco da BOR {#state-sync-logs-and-bor-block-receipt}

Os eventos emitidos por chamadas do sistema são tratados de uma maneira diferente dos registos normais. Aqui está o código: [https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90).

O Bor produz um novo tx/recibo apenas para o cliente que inclui todos os logs para sincronização de estado. O hash de Tx é derivado do número do bloco e do hash do bloco (último bloco nesse sprint):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

Isto não altera nenhuma lógica de consenso, apenas alterações do cliente. `eth_getBlockByNumber``eth_getTransactionReceipt`, e `eth_getLogs`inclui logs de sincronização de estado com derivados. Note que o filtro bloom do bloco não inclui a inclusão de logs de sincronização de estado. Ele também não inclui tx derivado `transactionRoot`ou .`receiptRoot`