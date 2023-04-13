---
id: glossary
title: Sözlük
description: Anahtar Polygon terimleri
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Blok üreticisi {#block-producer}

Blok üreticisi, bir [span](#span) boyunca blok üreticisi olarak hareket etmek üzere seçilen aktif bir [doğrulayıcıdır](#validator).

Blok üreticisi, blokları oluşturmaktan ve oluşturulan blokları ağ üzerinde yayınlamaktan sorumludur.

## Bor {#bor}

Bor düğümü, Polygon Ağı üzerinde bloklar üreten bir düğümdür.

Bor, [Go Ethereum](https://geth.ethereum.org/) üzerinde yer alır.

## Denetim noktası işlemi {#checkpoint-transaction}

Denetim noktası işlemi, [Bor](#bor) katmanı bloklarının Merkle kökünü denetim noktası aralıkları arasında içeren bir işlemdir.

Bu işlem Ethereum mainnet üzerindeki Polygon staking sözleşmelerine bir [Heimdall](#heimdall) düğümü tarafından işlenir.

Ayrıca bakınız:

* [Heimdall mimarisi: Denetim noktası](/docs/pos/heimdall/checkpoint)
* [Denetim Noktası Mekanizması](/docs/maintain/validator/core-components/checkpoint-mechanism)

## Komisyon {#commission}

Komisyon, [doğrulayıcıların](#validator) doğrulayıcılara stake eden [delegatörlerden](#delegator) aldıkları ödüllerin yüzdesidir.

Ayrıca bakınız: [Doğrulayıcı Komisyon Operasyonları](/docs/maintain/validate/validator-commission-operations).

## Delegatör {#delegator}

Delegatörler Polygon Ağının güvenliğini sağlamak için MATIC token'larını mevcut [doğrulayıcılara](#validator) stake ederler ama kendileri düğümler çalıştırmazlar.

Ayrıca bakınız [Delegatör Kimdir](/docs/maintain/polygon-basics/who-is-delegator).

## Tam düğüm {#full-node}

Tam düğüm, hem [Heimdall](#heimdall)'ı hem [Bor](#bor)'u çalıştıran tamamen senkronize bir [sentry düğümdür](#sentry).

Ayrıca bakınız: [Tam Düğüm Devreye Alma](/docs/operate/full-node-deployment).

## Heimdall {#heimdall}

Heimdall düğümü, Ethereum mainnet'e paralel çalışan, Ethereum mainnet üzerinde devreye alınan sözleşmeler kümesini izleyen ve Polygon Ağı [denetim noktalarını](#checkpoint-transaction) Ethereum mainnet'e işleyen bir düğümdür.

Heimdall, [Tendermint](https://tendermint.com/) üzerinde yer alır.

## Sahip adresi {#owner-address}

Sahip adresi, Ethereum mainnet üzerinde stake etmek, tekrar stake etmek, imzalayan adresini değiştirmek ve delegasyona ilişkin parametreleri yönetmek için kullanılan adrestir.

[İmzacı anahtarı](#signer-address) düğüm üzerinde tutulur ve bir **sıcak** cüzdan olarak görülür, buna karşılık sahip anahtarı çok güvenli tutulmalı ve seyrek kullanılmalıdır, ve bir **soğuk** cüzdan olarak görülür.

Ayrıca bakınız: [Anahtar Yönetimi](validator/core-components/key-management.md).

## Teklifçi {#proposer}

Teklifçi, yeni bir blok teklif etmesi için algoritmanın seçtiği [doğrulayıcıdır](#validator).

Teklifçi ayrıca belli bir [denetim noktası](#checkpoint-transaction) için tüm imzaları toplamaktan ve denetim noktasını Ethereum mainnet'e işlemekten sorumludur.

## Sentry {#sentry}

Sentry düğüm hem [Heimdall](#heimdall) düğümünü hem de [Bor](#bor) düğümünü çalıştırarak ağdaki diğer düğümlerden verileri indiren ve [doğrulayıcı](#validator) verilerini ağda çoğaltan bir düğümdür.

Sentry düğüm ağ üzerindeki diğer tüm sentry düğümlere açıktır.

## Span {#span}

Mantıksal olarak belirlenmiş bir bloklar kümesi olup, bu bloklar kümesi için bir [doğrulayıcılar](#validator) kümesi mevcut tüm doğrulayıcılar arasından seçilir.

Her bir span'ın seçimine, doğrulayıcıların staking gücü bakımından en az 3'te 2 çoğunluğu tarafından karar verilir.

Ayrıca bakınız: [Bor Konsensüsü: Span](/docs/pos/bor/consensus.md#span).

## Staking {#staking}

Staking, bir blok zincirinde bloklar doğrulama ve üretme hakkı elde etmek için bir mevduata token'lar kilitleme işlemidir. Tipik olarak staking ağ için yerel token'da yapılır - çünkü MATIC tokeni Polygon Ağındaki doğrulayıcılar / stakers tarafından kilitlenir. Diğer örnekler arasında Ethereum (birleşme sonrası), Cosmos içinde ATOM, vb.

Ayrıca bkz. [Hisse Kanıtı Nedir?](polygon-basics/what-is-proof-of-stake.md)

## İmzacı adresi {#signer-address}

İmzacı adresi, [Heimdall](#heimdall) doğrulayıcı düğümünün bir Ethereum hesabının adresidir. İmzacı adresi, [denetim noktası işlemlerini](#checkpoint-transaction) imzalar ve gönderir.

İmzacı anahtarı düğüm üzerinde tutulur ve bir **sıcak** cüzdan olarak görülür, buna karşılık **sahip anahtarı** çok güvenli tutulmalı ve seyrek kullanılmalıdır, ve bir [soğuk](#owner-address) cüzdan olarak görülür.

Ayrıca bakınız: [Anahtar Yönetimi](validator/core-components/key-management.md).

## Doğrulayıcı {#validator}

Doğrulayıcılar [MAT token'larını](/docs/maintain/validate/validator-staking-operations) Ethereum mainnet'inde konuşlandırılan staking sözleşmeleri üzerinden take ederler ve ağ kontrol noktalarını Ethereum ana ağına işlemek ve ağ üzerinde blok üretmek için hem [Heimdall](#heimdall) düğümünü hem de [Bor](#bor) düğümünü çalıştırırlar.

Doğrulayıcı düğümü yalnızca kendi [sentry](#sentry) düğümüne açıktır ve ağın geri kalanına kapalıdır.

Ayrıca bakınız [Doğrulayıcı Kimdir](polygon-basics/who-is-validator.md).
