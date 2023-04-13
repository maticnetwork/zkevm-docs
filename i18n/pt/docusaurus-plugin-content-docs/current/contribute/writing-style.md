---
id: writing-style
title: Diretrizes gerais para redação
sidebar_label: General writing guidelines
description: Siga estas diretrizes ao redigir.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - writing
  - contribute
  - style
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: writing-style
---

Esta diretriz concentra-se nas melhores práticas para redigir uma documentação técnica e
nas convenções de estilo para usar ao elaborar a documentação do Wiki da Polygon.
O objetivo deste guia é ajudar os colaboradores a redigir conteúdos claros, concisos
e consistentes. A equipa Polygon trata o Wiki da Polygon como um produto para documentos oficiais.

## Principais diretrizes {#primary-guidelines}

Acreditamos que uma das coisas que torna a Polygon especial é o seu design coerente e
procuramos preservar esta característica marcante. A equipa da Polygon trata o Wiki da Polygon
como um produto para documentos oficiais. Desde o início, definimos algumas diretrizes para garantir que novas
contribuições apenas melhorem o projeto geral:

- **Qualidade**: O código no projeto Polygon deve atender às diretrizes de estilo, com
casos de teste suficientes, mensagens de commit descritivas, evidência de que a contribuição
não viola nenhum compromisso de compatibilidade nem causa interações adversas entre os recursos
e evidência de alta qualidade de revisão por pares.
- **Tamanho**: a cultura do projeto da Polygon é uma das pequenas solicitações pull enviadas
regularmente. Quanto maior for a solicitação pull, mais provável é ser solicitado a
reenviar no formato de uma série de solicitações pull menores e revisáveis individualmente.
- **Facilidade de manutenção**: se o recurso precisar de manutenção contínua (por exemplo, suporte
para uma marca particular de banco de dados), podemos pedir que você aceite a responsabilidade por
manter este recurso.

O Guia de Estilo aproveita a motivação dos seguintes manuais de estilo:

> Se não conseguir encontrar a resposta para um estilo, voz ou pergunta sobre terminologia
> neste guia, consulte estes recursos.

- [Guia de Estilo do Google](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)
- [O Manual de Estilo Oxford](https://global.oup.com/academic/product/new-oxford-style-manual-9780198767251?cc=nl&lang=en&)
- [O Manual de Estilo da Microsoft](https://docs.microsoft.com/en-us/style-guide/welcome/)

### Gerador de site estático {#static-site-generator}

O Wiki é construído usando o [Docusaurus](https://docusaurus.io/), um gerador de site estático para
criar sites de documentação em markdown. Wiki segue estes modelos de metadados
para seus ficheiros de markdown e devem ser adaptados para cada novo documento:

```
---
id: wiki-maintainers
title: Wiki Maintainers
sidebar_label: Maintainers
description: A list of Polygon Wiki maintainers
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - docs
  - maintainers
  - contributors
image: https://matic.network/banners/matic-network-16x9.png
slug: community-maintainers
---
```

Existem alguns aspectos importantes a considerar ao escrever os metadados em um ficheiro de markdown:
- Pedimos aos colaboradores que usem uma **identificação exclusiva**; evitem usar **apenas** palavras ou frases genéricas como "Introdução" ou "Visão geral".
- O **título** é a frase usada no início do artigo, "Diretrizes Gerais de Redação" deste artigo. Portanto, não é necessário adicionar um cabeçalho H1/H2 para introduzir cada artigo. Em vez disso, use este **título** dos metadados.
- A **descrição** não pode ser muito longa, já que é usada nos blocos de índice que têm uma limitação de número de caracteres. Por exemplo, a descrição "O blockchain é um ledger imutável para registrar transações" para o*basics-blockchain.md* aparece em um título de índice como:
![img](/img/contribute/index-tile.png)

  A **descrição** deve ter **até 60 caracteres**, considerando espaços entre caracteres.
- Palavras-chave são importantes para aumentar o SEO e descrever o artigo. Tente focar em pelo menos cinco palavras-chave.

:::note

Por favor, consulte a
[documentação de metadados oficiais](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) para mais detalhes.

:::

### Compartilhe a experiência com o leitor {#share-the-experience-with-the-reader}

- Primeira pessoa: não use "eu" ou "mim". Use o ponto de vista de primeira pessoa com moderação e
com intenção. Quando excessivamente usada, a narrativa em primeira pessoa pode exagerar no sentimento de
experiência compartilhada e ofuscar a jornada do leitor.
- Segunda pessoa: na maioria dos casos, dirija-se ao leitor diretamente. Para tutoriais, use a
primeira pessoa do plural, nós, nos, nossos e nossas, ou o ponto de vista da segunda pessoa. Como os tutoriais fornecem
uma abordagem mais direcionada a um determinado tópico, usar a primeira pessoa do plural é mais natural e
uma prática mais aceita do que em outros tipos de documentação.
- Terceira pessoa: não use “nós” para se referir à Polygon ou à Polygon Technology.
- Voz ativa: use o presente sempre que possível. Existem situações em que a voz passiva
é apropriada; mude para a voz passiva quando o agente precisar ser colocado como foco.
- Pense sempre no interlocutor como uma pessoa: manter um tom dinâmico ao descrever conceitos técnicos
ajuda a conectar o leitor ao material, em oposição a descrever o software (ou código)
apenas explicando o que ele faz.
- Pronomes: use pronomes neutros de gênero, como “eles”, sempre que possível. Geralmente, é possível
alterar qualquer substantivo de singular para plural para fazer a concordância entre sujeito-verbo-pronome e evitar o
uso de pronomes específicos de gênero, como “ele”, “dele” e "seu" ou “ela”, “dela” e "sua".
  - Tenha cuidado ao usar pronomes impessoais e potencialmente ambíguos. Se for usar qualquer um dos seguintes
  pronomes impessoais, verifique se eles respondem às perguntas “de que?”, “de quem?” ou “como o que?” na frase.
    - todos, outro, qualquer
    - cada um, qualquer um
    - poucos, muitos, nenhum, nenhuma,
    - um, outro,
    - mesmo, vários, alguns, tal
    - isso, eles, desses, dessas

### Seja direto e conciso {#being-swift-and-concise}

- A documentação é importante quando as palavras e frases certas são utilizadas.
  - Use palavras comuns e bem conhecidas sempre que possível.
  - Evite florear a linguagem ou usar frases excessivamente rebuscadas.
  - Evite jargão, coloquialismos e gírias.
  - Evite advérbios e declarações subjetivas. Por exemplo, não use palavras e frases que incluam
  facilmente, rapidamente, simplesmente, rapidamente. Se for necessário, também é melhor minimizar do que
  exagerar.
  - Não use frases que tragam ambiguidade. Por exemplo, em vez de “Quando esta versão estiver disponível..."
  use “Depois que esta versão estiver disponível...".
  - Preste bastante atenção à escolha das palavras. Opte por usar “desde que” (implicando período tempo), em vez
  de “porque” (implicando a causa e o resultado) ou usando “uma vez” (única ocorrência), em vez de “depois”
  (a cada vez).
  - Evite usar sinais de exclamação.
- Evite adicionar palavras ou frases desnecessárias. Alguns exemplos:
  - Em vez de dizer “e, em seguida, basta usar “depois”.
  - Em vez de dizer “A fim de”, basta usar “para”.
  - Em vez de dizer “e também", use “e”.
  - Em vez de dizer “via”, use um substituto apropriado em português "usando", "através" ou "por".
- Use um tom de conversação que não seja muito formal, mas que se mantenha profissional.
- Clareza: dê vida à palavra ou frase sempre que possível. Por exemplo:
  - Em vez de dizer “ex.", use “por exemplo”.
  - Em vez de dizer “i.e.”, use “isto é” ou reescreva a frase para deixar o significado claro sem
  precisar de uma qualificação extra.
  - Em vez de dizer “etc.”, use “e assim por diante” ou revise o conteúdo para tornar o termo desnecessário. Em vez de
  "etc." para terminar uma lista de exemplos, foque em um exemplo ou dois e use "tal como" ou "como".
  - Em vez de “caveat”, use um substituto em português como “aviso”, “cautela” ou “advertência”.
  - As contrações oferecem à documentação um tom de conversação mais natural, pelo menos para falantes de inglês.
  Esteja ciente de quando e por que você usa contrações.

## Estrutura {#structure}

Os documentos devem ser organizados em seções. Cada seção deve ser responsável por
apresentar um tema ou tópico. Em cada seção, teremos um ou vários parágrafos.
Cada parágrafo deve transmitir apenas um pensamento. Tente evitar repetir as mesmas ideias
em seções diferentes, e divida parágrafos que englobem vários pontos de discussão.
O leitor deve entender sobre o que um parágrafo trata desde a sua primeira frase.

## Documentação de produto {#product-documentation}

Se estiver a escrever sobre um produto específico, certifique-se de que o documento se assemelhe
ao produto. Anteriormente, a documentação da Polygon foi generalizada, com base no Polygon PoS.
Agora que existem vários produtos baseados na Polygon, os colaboradores precisam ter cuidado com
suas adições.

Por exemplo, "É ambíguo implantar um contrato inteligente na Polygon usando ###. Se este tutorial
estava se referindo à Polygon PoS, isso deve ficar claro,
em "Implantando um contrato inteligente no Polygon PoS usando ###". Usando o mesmo exemplo com um
Rollup da Polygon, como a Polygon Hermez, "Implantando um contrato inteligente na Polygon Hermez usando ###".

Certifique-se de que a documentação do produto, um guia geral ou tutorial, seja adicionada
ao hub de documentação do produto certo. Para a maioria dos documentos, a sua referência deve existir
sob um dos hubs gerais (por exemplo, "Desenvolver" ou "Validar"), mas o documento propriamente dito
ficará sob a documentação do produto. Você precisará fazer referência ao documento no Hub
ao adicioná-lo a `sidebars.js`.
No entanto, o próprio documento existirá no hub de documentação do seu respectivo produto,
e vai redirecionar o utilizador quando clicar nele. A mesma diretriz se aplica a maioria dos
documentos. A sua referência deve existir em um dos hubs gerais, mas o documento
propriamente dito ficará sob a documentação do produto.

A maioria das documentações baseadas em API no Wiki da Polygon está sob a forma de
documentação de referência, com exceção das APIs mencionadas em tutoriais.
Por exemplo, a documentação da API no Matic.js fornece informações sobre a
estrutura, os parâmetros e o retorno de cada função ou método na API.

## Documentação de API {#api-documentation}

Considere o seguinte ao documentar uma API:

* Uma introdução sólida que fornece um ponto de partida.
* Uma descrição clara da chamada ou solicitação. Descreva o que o ponto terminal faz.
* Uma lista de parâmetros completa:
  * Tipos de parâmetros
  * Expressões de sintaxe com placeholders mostrando parâmetros disponíveis
  * Formatação especial
* Exemplos de código para vários idiomas.
* Um call de amostra com a saída esperada.
* Códigos de erro. Casos extremos.
* Instruções sobre como adquirir chaves de API se necessário.
* Fornecer perguntas frequentes ou cenários comuns é sempre útil.
* Links para recursos adicionais, como postagens de mídia social, blogs ou conteúdo de vídeo.
