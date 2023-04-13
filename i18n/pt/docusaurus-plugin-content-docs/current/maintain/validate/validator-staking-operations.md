---
id: validator-staking-operations
title: Stake na Polygon
description: Saiba como fazer stake como validador na Rede Polygon
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Pré-requisitos {#prerequisites}

### Configuração de nó completo {#full-node-set-up}

Seu nó de validador está totalmente configurado e sincronizado. Ver também:

* [Executar um nó do validador](run-validator.md)
* [Execute um Nó Validador com Ansible](run-validator-ansible.md)
* [Executar um Nó de Validador a partir de Binários](run-validator-binaries.md)

### Configuração da conta {#account-setup}

No nó do validador, verifique se a conta está configurada. Para verificar, execute o seguinte comando **no nó de validador**:

```sh
    heimdalld show-account
```

O seu resultado deve aparecer no seguinte formato:

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

Isto irá mostrar o seu endereço e a chave pública para o seu nó de validador. Observe que **este endereço deve corresponder com o endereço do seu signer no Ethereum**.

### Mostrar a chave privada {#show-private-key}

Esta etapa é opcional.

No nó do validador, verifique se a chave privada está correta. Para verificar, execute o seguinte comando **no nó de validador**:

```sh
heimdalld show-privatekey
```

Deve aparecer o seguinte resultado:

```json
{
    "priv_key": "0x********************************************************"
}
```

## Stake na Polygon {#stake-on-polygon}

Pode fazer stake na Polygon usando o [painel de validador](https://staking.polygon.technology/validators/).

### Stake usando o painel de staking {#stake-using-the-staking-dashboard}

1. Aceder ao [painel de validador](https://staking.polygon.technology/validators/).
2. Entrar com a sua carteira. MetaMask é a carteira recomendada. Tem de certificar-se de que faz login usando o mesmo endereço onde estão presentes os tokens MATIC.
3. Clique **em Tornar um Validador**. Será solicitado que configure o seu nó. Se ainda não configurou o seu nó, terá de fazê-lo, caso contrário, se prosseguir, receberá um erro quando tentar fazer stake.
4. No próximo ecrã, adicione os seus detalhes de validador, a taxa de comissão e o valor de staking.
5. Clique em **Stake Agora**.

Assim que a transação estiver concluída, terá feito stake com sucesso para se tornar um validador. Ser-lhe- á solicitado três vezes que confirme a transação.

* Aprovar a Transação — isto irá aprovar a sua transação stake.
* Stake — Isto irá confirmar a sua transação stake.
* Salvar —ß Isto irá salvar os seus detalhes de validador.

:::note

Para que as alterações produzam efeito no [painel de staking](https://staking.polygon.technology/account), é necessário no mínimo confirmações de 12 blocos.

:::

### Verificar o saldo {#check-the-balance}

Para verificar o saldo do seu endereço:

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

onde

* ENDEREÇO_DE_SIGNATÁRIO — o seu [endereço de signatário](/docs/maintain/glossary.md#validator).
* CHAIN_ID — a identificação da chain mainnet da Polygon com o título do cliente: `heimdall-137`.

Deve aparecer o seguinte resultado:

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### Reivindicar recompensas como validador {#claim-rewards-as-a-validator}

Uma vez estabelecido e feito stake como um validador, irá ganhar recompensas por cumprir as funções de validador. Quando desempenha as funções de validador com diligência, é recompensado.

Para reivindicar recompensas pode ir para o seu [painel de validador](https://staking.polygon.technology/account).

Verá dois botões no seu perfil:

* Retirar recompensa
* Restake recompensa

#### Retirar recompensa {#withdraw-reward}

Na qualidade de validador, ganha recompensas desde que esteja a desempenhar as suas funções de validador corretamente.

Ao clicar em **Retirar Recompensa** recebe as suas recompensas de volta na sua carteira.

O painel será atualizado após confirmações de 12 blocos.

#### Restake recompensa {#restake-reward}

Restaking as suas recompensas é uma maneira fácil de aumentar o seu stake como um validador.

Ao clicar em **Restake Recompensa** irá fazer restake das suas recompensas e aumentar a sua stake.

O painel será atualizado após confirmações de 12 blocos.
