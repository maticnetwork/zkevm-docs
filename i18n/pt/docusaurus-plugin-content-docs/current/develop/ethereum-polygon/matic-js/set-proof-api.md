---
id: set-proof-api
title: Definir ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: Configurar prova API.
---

Algumas das funções do matic.js são suffixed com o termo mais rapidamente. Como o nome sugere, eles geram resultados mais rapidamente em comparação com as contrapartes não mais rápidos. Eles fazem isso utilizando a API de Geração de Proof como backend que pode ser hospedado por qualquer pessoa.

[https://apis/matic.network](https://apis/matic.network) é uma API de Geração de Proof publicamente disponível hospedada pelo Polygon.

O `setProofApi`método pode ajudar na configuração do URL da API da Geração de Prova para a instância do matic.js.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

A utilização de um serviço de API de Geração de Prova auto-hospedado irá oferecer melhor desempenho em comparação com um hospedado publicamente.

Siga as instruções de instalação fornecidas no ficheiro README.md de https://github.com/maticnetwork/proof-generation-api para self-host o serviço.

por exemplo - se você implantou a prova API e a URL base é - `https://abc.com/`, então precisa de estabelecer a URL base em `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Recomendamos usar APIs mais rápidas, porque algumas APIs, particularmente onde a prova está sendo gerada, fazem muitas chamadas de RPC e pode ser muito lento com as RPC públicas.
:::
