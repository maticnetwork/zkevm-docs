---
id: matic-to-ethereum
title: Transferir dados da Polygon para a Ethereum
description: Transferência do estado ou dados da Polygon para a Ethereum através de Contratos
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

O mecanismo para a transferência de dados da Polygon para a Ethereum é um pouco diferente daquele para fazer o mesmo da Ethereum para a Polygon. As transações do **checkpoint** criadas pelos Validadores na chain Ethereum são usadas para alcançar isso. Basicamente, a transação é inicialmente criada na Polygon. Ao criar esta transação, tem de ser assegurado que o **evento é emitido** e os **registos do evento incluem os dados que pretendemos transferir** da Polygon para a Ethereum.

Num período de tempo (cerca de 10 a 30 min), esta transação é assinalada na chain Ethereum pelos validadores. Assim que o checkpoint estiver feito, a hash da transação criada na chain da Polygon pode ser apresentada como prova no contrato **RootChainManager** na chain Ethereum. Este contrato valida a transação, verifica se a transação está incluída no checkpoint e, finalmente, descodifica os registos do evento dessa transação.

Assim que esta fase terminar, podemos usar os **dados de registo do evento descodificados para realizar qualquer variação** no contrato ROOT implantada na chain Ethereum. Para isso, também precisamos de assegurar que a variação do estado na Ethereum só seja efetuada de uma forma segura. Assim, fazemos uso de um contrato de **Predicado**, que é um tipo especial de contrato que só pode ser acionado pelo contrato **RootChainManager**. A arquitetura garante que as variações do estado na Ethereum ocorrem apenas quando a transação na Polygon inclui checkpoint e está verificada na chain Ethereum pelo contrato **RootChainManager**.

# Visão geral {#overview}

- A transação é executada no contrato filho implantado na chain da Polygon.
- Um evento também é emitido nesta transação. Os parâmetros deste **evento incluem dados que devem ser transferidos** da Polygon para a Ethereum.
- Os validadores na rede da Polygon recolhem esta transação num determinado intervalo de tempo (provavelmente 10 a 30mins), validam-na e **adicionam-na ao checkpoint** na Ethereum.
- Uma transação checkpoint é criada no contrato **RootChain** e a inclusão do checkpoint pode ser verificada usando este [script](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)
- Assim que a adição do checkpoint for concluída, a biblioteca **matic.js** pode ser usada para fazer CALL da função para **sair** do contrato **RootChainManager**. A função **sair** pode ser chamada usando a biblioteca matic.js conforme demonstrado neste [exemplo](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js).

- Ao executar o script verificamos a inclusão do hash da transação Polygon na chain Ethereum e, por sua vez, faz a CALL da função **exitToken** do contrato de [predicado](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol).
- Isto garante que a **variação do estado do contrato na chain ROOT** é sempre feita de forma **segura** e **apenas através do contrato de predicado**.
- O importante a notar é que a **verificação do hash da transação** da Polygon e o **desencadeamento do contrato de predicado** ocorrem numa **transação única**, assim garantindo a segurança de qualquer variação do estado no contrato ROOT.

# Implementação {#implementation}

Esta é uma demonstração simples de como os dados podem ser transferidos da Polygon para a Ethereum. Este tutorial mostra um exemplo de transferência de um valor uint256 ao longo da chain. Pode transferir tipos de dados, mas é necessário codificar os dados em bytes e depois emiti-los a partir do contrato filho. Pode finalmente ser descodificado no contrato ROOT.

1. Primeiro, crie a chain ROOT e o contrato da chain filho. Certifique-se de que a função que trata da variação do estado também emite o evento. Este evento deve incluir os dados a serem transferidos como um dos seus parâmetros. Um formato de amostra do aspeto dos contratos Filho e ROOT é apresentado abaixo. Este é um contrato muito simples que tem uma variável de dados cujo valor é definido através de uma função setData. Fazer CALL da função setData emite o evento dos Dados. As restantes coisas do contrato serão explicadas nas próximas secções deste tutorial.

A. Contrato filho

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Contrato ROOT

Passar este `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` como o valor para `_predicate` no construtor do contrato ROOT.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Assim que os contratos filho e ROOT forem implantados na chain da Polygon e Ethereum, respetivamente, estes contratos têm de ser mapeados usando a PoS Bridge. Este mapeamento garante que é mantida uma conexão entre estes dois contratos nas diferentes chains. Para fazer este mapeamento, pode entrar em contacto com a equipa da Polygon no [discord](https://discord.com/invite/0xPolygon).

3. Uma coisa importante a notar é que no contrato ROOT há um modificador onlyPredicate. Recomenda-se que use sempre este modificador, porque garante que apenas o contrato de predicado é que faz a variação do estado no contrato ROOT. O contrato de predicado é um contrato especial que aciona o contrato ROOT apenas quando a transação que ocorreu na chain da Polygon é verificada pelo RootChainManager na chain da Ethereum. Isto garante uma variação segura do estado no contrato ROOT.

Para testar a implementação acima, podemos criar a transação na chain da Polygon, fazendo a CALL da função **setData** do contrato filho. Neste momento, temos de aguardar para que o checkpoint seja concluído. A inclusão do checkpoint pode ser verificada usando este [script](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js). Assim que o checkpoint for concluído, faça CALL da função sair do RootChainManager usando o SDK do matic.js.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Conforme demonstrado na captura de ecrã acima, o **txHash** é o hash da transação que ocorreu no contrato filho implantado na chain da Polygon.

O **logEventSignature** é o hash kecack-256 do evento de Dados. Este é o mesmo hash que incluímos no contrato de Predicado. Todos os códigos do contrato usados para este tutorial, bem como o script de saída, podem ser consultados [aqui](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

Assim que o script de saída for concluído, o contrato ROOT na chain Ethereum pode ser consultado para verificar se o valor dos **dados** variáveis que foi definido no contrato filho também foi refletido na variável de **dados** do contrato ROOT.
