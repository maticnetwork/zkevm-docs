---
id: state-transfer
title: Transferência de Estado
description: Transferir o estado ou dados facilmente do Ethereum para o Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Os validadores do Polygon monitoram continuamente um contrato na chain do Ethereum chamado `StateSender`. Cada vez que um contrato registado na chain da Ethereum faz CALL deste contrato, este emite um evento. Usando este evento, os validadores Polygon retransmitem os dados para outro contrato na chain da Polygon. Este mecanismo de **sincronização** de estado é usado para enviar dados do Ethereum para o Polygon.

Além disso, os validadores do Polygon enviam um hash do Ethereum de cada transação na chain do Polygon regularmente. Pode usar este **checkpoint** para validar qualquer transação que tenha sido realizada no Polygon. Assim que uma transação tiver ocorrido na chain Polygon, o Ethereum pode ser usado para executar a ação apropriada.

Estes dois mecanismos podem ser usados juntos para permitir a transferência de dados (estado (de dois sentidos) entre Ethereum e Polygon. Para abstrair todas essas interações, pode herdar diretamente os nossos contratos (no Ethereum) e `FxBaseRootTunnel``FxBaseChildTunnel`(no Polygon).

## Contrato de túnel ROOT {#root-tunnel-contract}

Use o contrato `FxBaseRootTunnel` a partir [daqui](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol). Este contrato dá acesso às seguintes funções:

- `function _processMessageFromChild(bytes memory data)`: Esta é uma função virtual que precisa ser implantada no contrato que a herda para lidar com dados que são enviados `ChildTunnel`.
- `_sendMessageToChild(bytes memory message)`: Esta função pode ser executada internamente usando quaisquer dados de bytes como mensagem. Estes dados serão enviados, conforme estão, para o túnel filho.
- `receiveMessage(bytes memory inputData)`: Esta função precisa ser chamada para receber a mensagem emitida por `ChildTunnel`. A prova da transação tem de ser fornecida como calldata. Um script de exemplo para gerar provas usando **matic.js** está incluído abaixo.

## Contrato de Fúnel Filho {#child-tunnel-contract}

Use o contrato `FxBaseChildTunnel` a partir [daqui](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Este contrato dá acesso às seguintes funções:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: Esta é uma função virtual que precisa implementar a lógica para lidar com mensagens enviadas da `RootTunnel`.
- `function _sendMessageToRoot(bytes memory message)`: Esta função pode ser executada internamente para enviar qualquer mensagem de bytes para o túnel ROOT.

## Pré-requisitos {#prerequisites}

- Tem de herdar o `FxBaseRootTunnel`contrato no seu contrato de raiz no Ethereum. Como exemplo, pode seguir este [contrato](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) . Da mesma forma, herda o `FxBaseChildTunnel`contrato no seu filho no Polygon. Como exemplo, siga este [contrato](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol).
- Enquanto implantar o contrato de raiz
  - **Goerli Testnet**, passe o endereço de **como** **0x2890bA17EfE978480615e330ecB6533b880928e** `_fxRoot`e `_checkpointManager`como 0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA.

  - **Ethereum Mainnet**, `_checkpointManager`é **0x86e4dc95c7fbdbf52e33d563bbdb00823894c287**** **e `_fxRoot`é 0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2.
- Para implantar o contrato de criança no **testnet Mumbai**, passe **0xCf73231F28B7331BBe3124B907840A94851f9f11** como `_fxChild`no construtor. Para o **Polygon mainnet,**`_fxChild` será 0**x8397259c983751DAf40400790063935a11afa28a.**
- `setFxChildTunnel`Ligue o túnel de raiz implantado com o endereço do túnel de criança. Exemplo: [0x79cd30ace561a226258918b56ce098a08ce0c707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- Ligue `setFxRootTunnel`o túnel infantil implantado com endereço do túnel de raiz. Exemplo: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Exemplo de contratos da bridge de transferência do estado {#example-contracts-of-state-transfer-bridge}

- **Contratos**: [Repositório do Github do Fx-Portal](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Transferência de Estado do Ethereum → Polygon {#polygon}

- Tem de chamar `_sendMessageToChild()`internamente no seu contrato de raiz e passar os dados como argumento a serem enviados para o Polygon. Exemplo: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff96053764c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- No seu contrato filho, implemente uma função `_processMessageFromRoot()` virtual em `FxBaseChildTunnel` para obter dados da Ethereum. Os dados serão recebidos automaticamente do destinatário do estado quando o estado for sincronizado.

## Transferência de Estado do Polygon → Ethereum {#ethereum}

1. Faça CALL de `_sendMessageToRoot()` internamente no seu contrato filho com dados como um parâmetro a serem enviado à Ethereum. Exemplo: [0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c98164a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Observe o hash da transação como ele será usado para gerar provas depois de ter sido incluído como ponto de verificação.

2. **Geração de provas para concluir a saída da chain de raiz**: Gere a prova usando o **hash tx** e **MESSAGE_SENT_EVENT_SIG**. Para gerar a prova, pode usar a API de geração de provas hospedada pelo Polygon ou também criar a sua própria API de geração de provas seguindo as instruções [aqui](https://github.com/maticnetwork/proof-generation-api).

O endpoint da geração de provas hospedado pelo Polygon está disponível [aqui.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Os exemplos de uso da API de geração de provas para o Mainnet e Testnet são os seguintes: -

→ [Geração da prova de Testnet de Mumbai](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Geração da prova do Polygon Mainnet](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Implemente `_processMessageFromChild()` no seu contrato ROOT.

4. Use a prova gerada como uma entrada para `receiveMessage()` para obter dados enviados a partir do túnel filho para o seu contrato. Exemplo: [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
