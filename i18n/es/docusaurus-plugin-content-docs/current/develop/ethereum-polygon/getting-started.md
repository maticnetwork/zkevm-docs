---
id: getting-started
title: Puente Polygon↔Ethereum
sidebar_label: Overview
description: Un canal bidireccional de transacciones entre Polygon y Ethereum
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon te ofrece un canal de transacciones bidireccional, que no requiere de confianza, entre Polygon y Ethereum introduciendo el puente entre cadenas con seguridad de Plasma y PoS. De este modo, los usuarios pueden transferir tokens en Polygon sin incurrir en riesgos de terceros ni limitaciones de liquidez del mercado. **El puente de plasma y PoS está disponible tanto en la red de Mumbai como en la red de Polygon**.

**El puente Polygon proporciona un mecanismo de puente que es casi instantáneo, de bajo costo y bastante flexible**. Polygon utiliza una arquitectura de doble consenso (Plasma + plataforma de prueba de participación [PoS])
para optimizar la velocidad y la descentralización. Hemos diseñado conscientemente el sistema para que admita transiciones de estado arbitrarias en nuestras cadenas laterales, que están habilitadas para la máquina virtual de Ethereum (EVM).

**No hay ningún cambio en el suministro circulante de tu token cuando cruza el puente**;

- Los tokens que salen de la red Ethereum están bloqueados y el mismo número de tokens se acuñan en Polygon como un token pegado (1:1).
- Para trasladar los tokens a la red de Ethereum, los tokens se queman en la red de Polygon y se desbloquean en la red de Ethereum durante el proceso.

## PoS vs Plasma {#pos-vs-plasma}

|                                      | Puente de PoS (Recomendado) | Puente de Plasma |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Breve descripción** | Los desarrolladores de DApp que buscan flexibilidad y retiros más rápidos con la seguridad del sistema POS. | Desarrolladores de aplicaciones descentralizadas que buscan más garantías de seguridad con el mecanismo de salida de Plasma\. |
| **Estructura** | Muy flexible | Rígida, menos flexible |
| **Depósito\(Ethereum → Polygon** | 22-30 minutos | 22-30 minutos |
| **Retiro\(Polygon → Ethereum)** | 1 punto de control = ~ 30 minutos a 6 horas | Llama al procedimiento de salida del proceso en el contrato de Ethereum |
| **Seguridad** | Sistema de prueba de participación, asegurado por un robusto conjunto de validadores externos\. | Los contratos de Plasma de Polygon se suman a la seguridad de Ethereum. |
| **Estándares de compatibilidad** | ETH, ERC-20, ERC-721, ERC-1155 y otros | Solo ETH, ERC-20 y ERC-721 |

:::info

El  [**es**](/develop/l1-l2-communication/fx-portal.md) otro tipo de puente que es muy similar al puente . Comparten las mismas características que se mencionan en PoS en la tabla anterior. La única diferencia es que los tokens no deben ser mapeados en el puente de FxPortal antes de realizar un puente. El mapeo ocurre durante la primera transacción de depósito que se inicia para un token dado. Además, cualquiera puede hacer uso de FxPortal para construir sus propios túneles/puentes personalizados en la parte superior del puente . Se recomienda encarecidamente utilizar el  para cualquier caso de uso de puentes. Los nuevos mapeos de token en PoS y Plasma se desanimarán después del 31 de enero de 2023 para que el proceso de mapeo esté totalmente descentralizado y flexible.

:::

## Recursos adicionales {#additional-resources}

- [Introducción a los puentes de la cadena de bloques](https://ethereum.org/en/bridges/)
- [¿Qué son los puentes de cadena](https://www.alchemy.com/overviews/cross-chain-bridges)
