---
id: ipfs
title: IPFS
description: "IPFS: sistema distribuido para almacenar datos y acceder a ellos."
keywords:
  - IPFS
  - matic
  - docs
  - polygon
  - storage
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### Contexto {#context}

La cadena de bloques de Polygon reduce los costos de transacción para almacenar datos frente a la red principal de Ethereum. Sin embargo, aunque sean bajos, los costos se incrementan rápidamente al almacenar archivos de gran tamaño. Los desarrolladores también deben considerar las restricciones en el tamaño de los bloques y las limitaciones de velocidad de las transacciones cuando almacenan datos en la cadena. Una solución que aborda todas estas preocupaciones es el IPFS, el sistema de archivos interplanetario.

#### ¿Qué es IPFS? {#what-is-ipfs}

El IPFS es un sistema distribuido para almacenar archivos, sitios web, aplicaciones y datos, y acceder a ellos. El IPFS emplea la descentralización, el direccionamiento de contenido y una red robusta de pares con participantes activos para permitirles a los usuarios almacenar, solicitar y transferir datos verificables entre sí.

La descentralización posibilita descargar un archivo desde muchas ubicaciones que no son administradas por una organización, lo que proporciona resiliencia y resistencia a la censura inmediatas.

El direccionamiento de contenido utiliza la criptografía para crear un hash verificable único, basado en lo que hay en el archivo, y no en dónde se encuentra. El identificador de contenido (CID) resultante garantiza que un fragmento de datos sea idéntico, independientemente de dónde se almacene.

Por último, la creciente comunidad activa de usuarios hace posible ese intercambio de contenido entre pares. Los desarrolladores suben y anclan el contenido a IPFS mientras que los proveedores de almacenamiento de Filecoin o Crust ayudan a garantizar el almacenamiento persistente de ese contenido.


Con el almacenamiento basado en el IPFS, solo tienes que almacenar el CID de tu contenido, en lugar de cargar archivos completos en la cadena de bloques de Polygon, lo que permite reducir costos, cargar archivos de mayor tamaño y un almacenamiento persistente comprobado. Para obtener más detalles, consulte [los documentos de IPFS](https://docs.ipfs.io/).

### Proyectos de ejemplo {#example-projects}

1. Tutorial en el eth de andamios que demuestra cómo acuñar un NFT en Polygon con IPFS - [enlace](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)

2. Construir una aplicación completa de la pila web3 con Next.js, Polygon, Solidez, El gráfico, IPFS y Hardhat - [enlace](https://dev.to/dabit3/the-complete-guide-to-full-stack-web3-development-4g74)
