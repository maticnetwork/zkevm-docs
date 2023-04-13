---
id: did-implementation
title: Implementação DID da Polygon
sidebar_label: Identity
description: Saiba mais sobre implementação DID na Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Este é um guia de inicialização para os utilizadores que desejam usar os pacotes de implementação publicados pela equipa da Polygon para gerar e publicar um DID da Polygon no ledger da Polygon.

A implementação do método DID da Polygon é composta por 3 pacotes, nomeadamente o  polygon-did-registrar, o polygon-did-resolver e o polygon-did-registry-contract. Um utilizador que deseje incorporar a funcionalidade para registar ou ler um DID na rede da Polygon pode usar o seguinte guia.

Um DID é essencialmente um identificador único, criado sem a presença de uma autoridade central.  O DID no contexto de Credenciais Verificáveis é usado para assinar documentos, facilitando assim a prova de propriedade do documento quando necessário.

## Método DID da Polygon {#polygon-did-method}

A definição do método DID da Polygon está em conformidade com as especificações e padrões DID-Core. Um URI DID é composto por três componentes separados por dois pontos, o esquema, seguido pelo nome do método e, por fim, um identificador específico do método. Para Polygon o URI se parece com:

```
did:polygon:<Ethereum address>
```

Aqui o esquema é `did`o nome do método `polygon`e o identificador específico do método é um endereço do ethereum.

## Implementação DID da Polygon {#polygon-did-implementation}

O DID da Polygon pode ser implementado com a ajuda de dois pacotes; o utilizador pode importar as respetivas bibliotecas NPM e usá-las para incorporar as metodologias DID da Polygon nas respetivas aplicações. Os detalhes de implementação são fornecidos na secção seguinte.

Para começar, primeiro é necessário criar um DID. A criação, no caso da Polygon, é um encapsulamento de duas etapas, primeiro onde um utilizador tem de criar um uri DID para si e, a seguir, registá-lo no ledger da Polygon.

### Criar um DID {#create-did}

No projeto para criar um polígono DID URI primeiro é necessário instalar:

```
npm i @ayanworks/polygon-did-registrar --save
```

Assim que a instalação for concluída, o utilizador pode usá-la da seguinte forma:

```
import { createDID } from "polygon-did-registrar";
```

A `createdDID`função ajuda o usuário a gerar um URI DID. Ao criar um DID, pode haver dois cenários.

  1. O utilizador já possui uma carteira e deseja gerar um DID correspondente para a mesma carteira.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Se o usuário não tiver uma carteira existente e quiser gerar uma, o usuário pode usar:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

O parâmetro de rede nos dois casos se refere a se o usuário deseja criar o DID no Polygon Mumbai Testnet ou no Polygon Mainnet.

Entrada da amostra:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

Depois de criar DID, terá um URI DID gerado.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### Registar {#register-did}

Para registrar o URI DID e o documento DID correspondente no ledger, o usuário primeiro precisa usar `polygon-did-registrar`da seguinte forma:

```js
import { registerDID } from "polygon-did-registrar";
```

Como pré-requisito para registrar DID, o usuário precisa ter certeza de que a carteira de corrsponding para DID tem o saldo de tokens necessário disponível. Assim que o utilizador tiver um saldo de token na carteira, uma chamada pode ser feita à funcionalidade registerDID como mostrado abaixo:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

Parâmetros `did`e `privateKey`são obrigatórios, enquanto é opcional inserir `url`e .`contractAddress` Se o utilizador não introduzir os dois últimos parâmetros, a biblioteca vai buscar as configurações padrão da rede do URI DID.

Se todos os parâmetros correspondem às especificações e tudo for fornecido na ordem correta, a `registerDID`função retorna um hash da transação, caso contrário, um erro correspondente

E com isso, concluiu com sucesso a tarefa de registrar um DID na Rede Polygon.

## Resolver DID {#resolve-did}

Para iniciar, instale as seguintes bibliotecas:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Para ler um documento DID registado no ledger, qualquer utilizador com um URI DID da Polygon pode primeiro importar o seu projeto,

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

Depois de importar os pacotes, o documento DID pode ser recuperado usando o seguinte:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

onde o `didResolutionResult`objeto é o seguinte:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Note-se que nenhum custo de gás será suportado pelo utilizador enquanto tenta resolver um DID.

## Atualizar documento DID {#update-did-document}

Para encapsular o projeto com a capacidade de atualizar o documento DID, o usuário primeiro precisa usar `polygon-did-registrar`da seguinte forma:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

Em seguida, chame a função:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

Note-se que para atualizar o documento DID, apenas o proprietário do DID pode enviar a solicitação. A chave privada aqui também deve conter alguns tokens MATIC correspondentes.

Se o utilizador não fornecer a configuração com `url` e `contractAddress`, a biblioteca irá obter as configurações padrão da rede do URI DID.

## Eliminar o documento DID {#delete-did-document}

Com a implantação do Polygon DID, um usuário pode também revogar o Documento DID do ledger. Primeiro é necessário usar `polygon-did-registrar`da seguinte forma:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

A seguir, usar

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Entre os parâmetros, é de notar que `url` e `contractAddress` são parâmetros opcionais que, se não forem fornecidos pelo utilizador, então será obtida uma configuração padrão pela função com base no URI DID.

É importante que a chave privada contenha os tokens MATIC necessários, conforme a configuração da rede do DID, ou a transação irá falhar.

## Contribuir para o repositório {#contributing-to-the-repository}

Use o fluxo de trabalho padrão de fork, branch e pedido pull para propor alterações aos repositórios. Por favor, informe nomes de ramificações incluindo o problema ou o número de bugs, por exemplo.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
