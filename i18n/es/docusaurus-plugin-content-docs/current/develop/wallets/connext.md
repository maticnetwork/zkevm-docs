---
id: connext
title: Transferencias entre cadenas mediante Connext
description: Desarrolla tu próxima aplicación de cadena de bloques en Polygon.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Connext es una red de liquidez entre cadenas que impulsa intercambios rápidos y totalmente sin custodia entre cadenas compatibles con la máquina virtual de Ethereum (EVM) y sistemas de capa 2 (L2) de Ethereum.

Ethereum se está volviendo multicadena. Con la creciente adopción de las cadenas compatibles con la EVM y la L2, surgió un nuevo desafío en torno a la fragmentación de la liquidez dentro del ecosistema. Connext resuelve ese problema conectando los grupos separados de liquidez de cada cadena en una red global, sin introducir nuevas consideraciones de confianza significativas para los usuarios. Los desarrolladores pueden aprovechar esa liquidez para construir una nueva clase de aplicaciones descentralizadas (DApp) nativas, agnósticas en lo que a la cadena se refiere, en Connext.

A un alto nivel, Connext les permite a los usuarios intercambiar el activo A por el activo B en la cadena B usando transferencias condicionales. Eso se hace en unos pocos pasos simples:

Alice, una usuaria de Connext, le envía una transferencia condicional de activos A a Bob.
Bob, un proveedor de liquidez (también conocido como enrutador), le envía un monto equivalente del activo B a Alice.
Alice desbloquea su transferencia condicional para recibir el activo B, lo que, a su vez, le permite a Bob hacer lo mismo.
Los enrutadores son la columna vertebral de nuestra red, ya que proveen liquidez en diferentes cadenas y ganan comisiones por hacerlo. Puedes aprender más sobre el funcionamiento sin confianza en el manual de nuestro protocolo.

Para configurar las transferencias de crosschain desde la red de Ethereum Goerli a la red de  Polygon en una dApp del navegador, por favor, visita esta [guía.](https://docs.connext.network/quickstart-polygon-matic-integration)
