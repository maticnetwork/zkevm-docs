---
id: bor-chain
title: Что такое BoR-Chain?
sidebar_label: Bor Chain
description: Введение в цепочку Bor или VM Sidechain для Polygon PoS
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Цепочка Bor {#bor-chain}

Узел Bor или реализация продюсера блока — в основном оператор sidechain. VM сайдчейна совместима с EVM. В настоящее время это базовая реализация Geth с пользовательскими изменениями, внесенными в алгоритм консенсуса. Но решение будет построено с нуля, чтобы сделать его легким и сфокусированным.

Блок продюсеров выбирают из набора валидаторов и перетасовывают с использованием исторических хэшей блоков Ethereum с той же целью. Тем не менее мы исследуем источники случайности для этого выбора.