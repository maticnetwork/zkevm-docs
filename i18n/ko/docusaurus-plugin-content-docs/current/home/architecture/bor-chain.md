---
id: bor-chain
title: BoR-Chain이란?
sidebar_label: Bor Chain
description: Polygon PoS를 위한 Bor 체인 또는 Sidechain VM 소개
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bor 체인 {#bor-chain}

Bor 노드 또는 블록 프로듀서 구현은 기본적으로 sidechain 운영자입니다. 사이드체인 VM은 EVM과 호환됩니다. 현재 Bor는 기본적인 Geth 구현으로서, 사용자 지정 변경 사항을 합의 알고리즘에 적용합니다. 그러나 이는 더욱 가볍고 집중적으로 근본부터 다시 구축될 예정입니다.

유효성 검사기 세트 중에서 블록 프로듀서가 선택되고 동일한 목적을 위해 과거의 이더리움 블록 해시를 사용해 셔플됩니다. 우리는 이 선택을 위한 임의성 확보 방안을 지속적으로 모색하고 있습니다.