---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain é um Blockchain de alto desempenho construído para Oracle de dados para consultar dados de APIs da web tradicionais
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

O protocolo de Band permite-lhe fazer uma consulta de dados a partir das APIs da web tradicionais e usá-los na blockchain. Os desenvolvedores podem fazer consultas através **do BandChain, um blockchain baseado** em cosmos para facilitar solicitações de oráculos e pagamentos e, em seguida, usar os dados do dApp por meio de comunicação interchain. A integração dos dados da oracle pode ser feita em 3 etapas simples:

1. **Escolher os scripts da oracle**

    O script da Oracle é um hash que identifica exclusivamente o tipo de dados a serem solicitados pela band-chain. Estes scripts podem ser encontrados [**aqui**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). Estes scripts são usados como um dos parâmetros para fazer uma solicitação oracle.

2. **Solicitar dados da BandChain**

Isso pode ser feito de duas maneiras:

    - **Usando o explorador BandChain**

    Pode clicar no script de oracle da sua escolha e, em seguida, na guia **Executar** pode passar nos parâmetros e obter a resposta do BandChain. A resposta irá conter o resultado e também uma prova de evm. Esta prova tem de ser copiada e será usada na etapa final. Os documentos BandChain para consulta oracle usando o explorador estão disponíveis [**aqui**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Dado acima é um exemplo de fazer uma solicitação de oracle para obter os valores de números aleatórios. O valor 100 é passado para o `max_range`parâmetro da solicitação de oráculo. Recebemos um hash como resposta. Ao clicar neste hash são apresentados todos os detalhes da resposta.

    - **Usando a Biblioteca JS BandChain-Devnet**

    Pode consultar o BandChain diretamente usando a biblioteca BandChain-Devnet. Quando consultado, dá uma **prova de evm** como resposta. Esta prova pode ser usada para a etapa final da integração BandChain. Os documentos do BandChain para consulta oráculo usando a Biblioteca JS do BandChain-Devnet estão disponíveis [**aqui**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). O payload da solicitação para o número aleatório oracle será parecido com isto. Certifique-se de que a solicitação é passada no formato da application/json.

3. **Usar os dados nos contratos inteligentes**

  A etapa final é implantar um contrato de validação e armazenar as respostas da solicitação oracle nas variáveis de estado dos contratos de validação. Assim que estas variáveis de estado estiverem configuradas, podem ser acedidas como e quando for necessário através da DApp. Mais, estas variáveis de estado podem ser atualizadas com novos valores, fazendo uma nova consulta dos scripts oracle a partir da DApp. Abaixo consta um contrato de validação que armazena o valor aleatório, usando o script oracle de número aleatório.

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

Ao implantar, 3 parâmetros têm de ser passados. O **primeiro parâmetro** `codeHash`é o hash do script oracle. O **segundo parâmetro** é o objeto dos parâmetros de solicitação de script oracle Isto tem de ser passado no formato de bytes. A BandChain fornece uma API REST para converter o parâmetro do objeto JSON no formato byte. Os detalhes da API podem ser consultados [**aqui**](https://docs.bandchain.org/references/encoding-params). Um 0x tem de ser anexado à resposta recebida desta API. O **terceiro parâmetro** é o endereço do contrato do BandChain que já está implantado na rede Polygon. O Protocolo Band suporta Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Outra coisa a observar é que o contrato de validação deve importar a biblioteca de ajuda e interface que é chamada `BandChainLib.sol`e `IBridge.sol`respectivamente. Eles podem ser encontrados nos seguintes links: Biblioteca de [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) e interface do [**IBridge**](https://docs.bandchain.org/references/ibridge-interface).

  Assim que o contrato de validação for implantado, as variáveis de estado podem ser acedidas através de uma consulta à DApp. Da mesma forma, vários contratos de validação podem ser criados para diferentes scripts de oracle embutidos. A interface do IBridge tem um método chamado `relayAndVerify()`que verifica os valores que estão sendo atualizados cada vez no contrato de validação. O `update()`método no contrato de validação tem a lógica para atualizar as variáveis de estado. A prova de EVM obtida na consulta do script de oracle tem de ser passada para o `update()`método. Sempre que um valor é atualizado, o contrato BandChain implantado no Polygon verifica os dados antes de armazená-los na variável do estado do contrato.

A BandChain fornece uma rede descentralizada de oráculos que pode ser usada pelo dApps para impulsionar a lógica do seu contrato inteligente. Os documentos do BandChain na implantação do contrato, no armazenamento dos valores e na atualização dos mesmos podem ser encontrados [**aqui**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library).