---
id: widget
title: Widget de Carteira
sidebar_label: Wallet Widget
description: "Ferramentas da IU para executar transações bridge."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

O widget de carteira é uma ferramenta UI que pode ser integrada em qualquer aplicação web para executar transações bridge - Depositar e Retirar.

Cada widget é identificado por um nome exclusivo que pode obter a partir do [Painel de widgets](https://wallet.polygon.technology/widget-dashboard).

### Painel de widgets {#widget-dashboard}

Os widgets podem ser criados a partir da página do painel de widgets, na aplicação da carteira. Permite ao utilizador criar um widget novo com algumas opções personalizáveis.

Assim que o widget for criado, pode criar um fragmento do código e adicioná-lo à sua aplicação ou usar o nome do widget e configurá-lo por si próprio.

Aqui fica o link para o painel do widget -

* mainnet - https://wallet.polygon.technology/widget-dashboard
* testnet - https://wallet-dev.polygon.technology/widget-dashboard

## Instalar {#install}

O widget é exportado como uma biblioteca javascript e está disponível como um pacote NPM.

```bash
npm i @maticnetwork/wallet-widget
```

## Exemplos {#examples}

Criámos exemplos de diferentes quadros e ferramentas para ajudar no desenvolvimento. Todos os exemplos estão presentes em - [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## Como usar {#how-to-use}
### Com alvo {#with-target}

Suponha que tem um botão na aplicação e que quer mostrar o widget quando o botão for clicado -

```html
<button id="btnMaticWidget"></btn>
```

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'mainnet' // network to be used - testnet or mainnet
});
```

Criar um widget sempre que esteja preparado. É melhor fazer CALL da função criar depois do documento ser carregado.

```javascript
await widget.create();
```
O widget está criado, agora clique no botão e o widget será mostrado.

### Sem alvo {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

O widget já está criado, mas para mostrar o widget terá de fazer CALL da API`show`.

```
widget.show();
```

Pode simplesmente ocultar o widget fazendo CALL `hide`da API.

```
widget.hide();
```

### Nota Importante 👉 {#important-note}

1. Com base na rede “testnet” ou “mainnet”, tem de criar a sua aplicação no respetivo painel. Recomendamos criar a aplicação com o mesmo nome tanto na testnet como na mainnet para que não tenha qualquer dificuldade quando mudar de rede.

2. O widget de carteira é a biblioteca da UI e terá um visual distinto nas diferentes páginas da web, podendo apresentar alguns problemas, como cores, capacidade de resposta, etc. Assim, invista algum tempo para o testar e personalizar. Se necessitar de ajuda, entre contacto com a [equipa de suporte](https://support.polygon.technology/).

3. O widget de carteira é apresentado em ecrã inteiro nos dispositivos móveis, mas pode ser personalizado através da configuração `style`.

## Configuração {#configuration}

A configuração pode ser fornecida no construtor do widget.

## A configuração disponível é {#available-configuration-are}

- **alvo** : string - seletor CSS para mostrar o widget ao clicar no elemento. Por exemplo, “#btnMaticWidget” será o alvo no código abaixo.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **rede** : string - rede a ser usada. Estão disponíveis duas opções - “testnet” ou “mainnet”.
- **largura** : número - Largura do widget
- **altura** : número - Altura do widget
- **autoShowTime** : número - mostrar o widget automaticamente em milissegundos e após o período definido
- **appName** : string - nome da sua aplicação, que pode ser obtido no painel do widget.
- **posição** : string - Define a posição do widget. As opções disponíveis são -
    - centro
    - inferior-direito
    - inferior-esquerdo
- **valor** : string - preencher previamente o valor na caixa de texto
- **página**: string - selecione a página. As opções disponíveis são - `withdraw`, `deposit`.
- **sobreposição**: booleano - mostrar a sobreposição quando o widget for aberto. Por defeito, é falso.
- **estilo**: objeto - aplique alguns estilos css para o widget.

```
var widget = new MaticWidget({
    appName: "<your app id>", //appName from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'testnet' // network to be used - testnet or mainnet,
    style:{
      color:'red'
    }
});
```

## Eventos {#events}

O widget emite alguns eventos que podem ser usados para saber o que está a acontecer dentro da aplicação.

### Subscrever eventos {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### Cancelar a subscrição de eventos {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> O callback deve ser igual ao usado para subscrever o evento. Por isso é aconselhável armazenar o callback numa variável. `

## Lista de eventos: {#list-of-events}

- **carregar** - o widget é carregado
- **fechar** - o widget é fechado
- **approveInit** - a transação de aprovação é iniciada
- **approveComplete** - a transação de aprovação está concluída
- **approveError** - a transação de aprovação falhou devido a um erro, ou o utilizador recusou a transação na MetaMask
- **depositInit** - a transação de depósito é iniciada
- **depositComplete** - a transação de depósito está concluída
- **depositError** - a transação de depósito falhou devido a um erro, ou o utilizador recusou a transação de conclusão do depósito na MetaMask
- **burnInit** - a transação de retirada é iniciada
- **burnComplete** - a transação de retirada está concluída
- **confirmWithdrawInit** - a retirada inclui um checkpoint e a transação de confirmação é iniciada
- **confirmWithdrawComplete** - a confirmação da transação de retirada é concluída
- **confirmWithdrawError** - a transação de confirmação da retirada falhou devido a um erro, ou o utilizador recusou a transação de confirmação da retirada na MetaMask
- **exitInit** - a transação de saída da retirada é iniciada
- **exitComplete** - a transação de saída da retirada está concluída
- **exitError** - a transação de saída da retirada falhou devido a um erro, ou o utilizador recusou a transação de saída da retirada na MetaMask

## APIS {#apis}

- **mostrar**
mostrar o widget

```javascript
widget.show()
```

- **ocultar** -
ocultar o widget

```javascript
widget.hide()
```

- **iniciar**
subscrever eventos

```javascript
widget.on('<event name>', callback)
```

- **terminar**
cancelar a subscrição de eventos

```javascript
widget.off('<event name>', callback)
```
