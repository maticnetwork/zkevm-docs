---
id: overview
title: Genel Bakış
description: Bor düğümü temelde yan sidechain operatörüdür
keywords:
  - docs
  - matic
  - polygon
  - bor
  - geth
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor {#bor}

Bor düğümü ya da Blok Üreticisi uygulaması (implementation) temelde yan zincir işleticisidir. Yan zincir sanal makinesi (VM) EVM uyumludur. Bu, şu anda, konsensüs algoritmasında yapılan özel değişiklikleri içeren temel bir Geth uygulamasıdır (implementation). Ancak, bu uygulama en temel adımdan başlanarak geliştirilip hafif ve odaklanmış hale getirilecektir.

Blok üreticileri Doğrulayıcı kümesinden seçilir ve aynı amaç doğrultusunda tarihsel Ethereum blok hash'leri kullanılarak karıştırılır. Ancak biz bu seçim için rastgelelik kaynakları araştırıyoruz.