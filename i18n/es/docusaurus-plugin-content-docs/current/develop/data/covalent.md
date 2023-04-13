---
id: covalent
title: Uso de Covalent
sidebar_label: Covalent
description: Aprende a utilizar la API unificada de Covalent para datos
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Introducción {#introduction}

Polygon le da a Ethereum una escala colosal usando una versión adaptada de Plasma
con cadenas laterales basadas en PoS que ofrece una solución para realizar transacciones más rápidas y
de muy bajo costo con finalización en la cadena principal. La red Polygon asegura
la actividad utilizando puntos de control con PoS que se envían a la cadena principal de Ethereum.
Esto permite que una única cadena lateral de Polygon logre teóricamente `2^16`transacciones
por bloque, y probablemente millones de transacciones en múltiples cadenas en el futuro.

### Algunos datos de interés {#quick-facts}

<TableWrap>

| Propiedad | Valor |
|---|---|
| Identificación de la cadena de la red principal de Polygon | `137` |
| Identificación de la cadena de la red de pruebas de Polygon Mumbai | `80001` |
| Explorador de la cadena de bloques de Polygon | https://polygonscan.com/ |
| Tiempo del bloque | ~3 segundos |
| Latencia de actualización de datos | ~6 segundos o 2 bloques |

</TableWrap>

:::tip Inicio rápido

Mira **[<ins>este video de presentación</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**
para empezar.

:::

## Terminales admitidos {#supported-endpoints}

Todos los terminales [__de clase A__](https://www.covalenthq.com/docs/api/#tag--Class-A) son compatibles con la red principal de MATIC y la red de pruebas de Mumbai. Puedes consultar cualquiera de las dos redes a través de la API unificada cambiando la `chainId`.

:::info Terminales

Una lista completa de todas las solicitudes que puedes hacer en la red de Polygon con Covalent
está disponible en la [<ins>documentación de la API de Covalent</ins>](https://www.covalenthq.com/docs/api/).

:::

---

## Apéndice {#appendix}

### Token de gas de MATIC {#matic-gas-token}

Para interactuar con la red de MATIC, se requieren tokens MATIC para pagar como tarifas de gas. Las respuestas de Covalent
devuelven automáticamente campos `gas_*` en las unidades de MATIC.

### Mapeo de los tokens {#token-mapping}

Covalent mantiene un mapeo en la cadena en tiempo real de las direcciones de los tokens entre la red principal de Ethereum y la cadena de MATIC. Estas direcciones se utilizan para la búsqueda inversa de precios en MATIC y también para mostrar las URL correctas de los logotipos de los tokens

Algunos ejemplos de tokens mapeados:

| Token | Red principal de Ethereum | Red principal de MATIC |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| UNI de Uniswap | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Precios de los tokens {#token-prices}

Para los tokens que tengan un mapeo que se remonta a la red principal de Ethereum, Covalent puede mostrar los precios mapeados.
