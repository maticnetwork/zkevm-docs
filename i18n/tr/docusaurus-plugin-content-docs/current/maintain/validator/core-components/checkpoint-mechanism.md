---
id: checkpoint-mechanism
title: Denetim Noktası Mekanizması
sidebar_label: Checkpoints
description: Sistem durumunu Ethereum mainnet'e kontrol etmek
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygon bir Katman 1 platformu değildir

Polygon Ethereum Mainnet'e katman 1 Yerleşim Katmanı olarak bağlıdır. Tüm staking mekaniklerinin Ethereum mainnet'teki sözleşmelerle senkronize olması gerekir.

:::

Bir kontrol noktası için [teklif edenler](/docs/maintain/glossary.md#proposer) başlangıçta [Tendermint'in ağırlıklı yuvarlak robin algoritması](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) üzerinden seçilir. Denetim noktası gönderiminin başarılı olmasına bağlı olarak daha ileri bir özel kontrol uygulanır. Bu, Polygon sisteminin Tendermint teklifçi seçiminden bağımsızlaşmasına imkân verir ve Polygon'a bir teklifçinin yalnızca Ethereum mainnet'teki denetim noktası işlemi başarılı olduğunda seçilmesi ya da daha önce başarısız olmuş denetim noktalarına ait bloklar için bir denetim noktası gönderilmesi gibi yetenekler kazandırır.

Bir denetim noktasının Tendermint'te başarıyla gönderilmesi 2 evreli bir işleme (commit) sürecidir:

* Round-robin algoritması vasıtasıyla seçilen bir teklifçi, teklifçi alanında teklifçinin adresi ve Merkle hash'i belirtilmiş olarak bir denetim noktası gönderir.
* Diğer tüm teklifçiler teklifçi alanındaki verileri Merkle hash'i kendi durumlarına eklemeden önce doğrularlar.

Bunun üzerine bir sonraki teklifçi bir önceki [denetim noktası işleminin](/docs/maintain/glossary.md#checkpoint-transaction) Ethereum mainnet'te başarılı olduğunu kanıtlamak için bir onay (acknowledgement) işlemi gönderir. Her doğrulayıcı kümesi değişikliği, doğrulayıcı düğümüne gömülü [Heimdall](/docs/maintain/glossary.md#heimdall)'daki doğrulayıcı düğümleri tarafından iletilir. Bu, Heimdall'ın Ethereum mainnet'teki Polygon sözleşme durumuyla her zaman senkronize halde kalmasına imkân verir.

Etherum mainnet'te devreye alınan Polygon sözleşmesinin gerçeğin en nihai kaynağı olduğu kabul edilir, dolayısıyla tüm doğrulama Ethereum mainnet sözleşmesinin sorgulanması yoluyla yapılır.
