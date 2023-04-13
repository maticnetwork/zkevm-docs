---
id: adding-a-custom-token
title: Özel Token Ekleme
sidebar_label: Adding a Custom Token
description: Bir sonraki blok zinciri uygulamanızı Polygon'da geliştirin.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

**Add Custom Token** (Özel Token Ekle) özelliği sayesinde bir token'ı görünebilir şekilde ekleyebilir ve Polygon Cüzdan ile kullanabilirsiniz. Tek yapmanız gereken ekleyeceğiniz token'ı ya kök ya da alt sözleşme adresine göre aramaktır:

* **Kök** sözleşme Ethereum'daki token sözleşmesidir
* **Alt** sözleşme Polygon'daki sözleşmedir

### Token sözleşmesini nasıl bulabilirim? {#how-do-i-find-the-token-contract}

Token'ı adıyla ya [Coingecko](http://coingecko.com)'da ya da [Coinmarketcap](https://coinmarketcap.com/)'de arayabilirsiniz; burada token'ın Ethereum zincirindeki adresini (ERC 20 token'ları için) ve Polygon gibi diğer desteklenen alt zincirlerdeki adresini görebilirsiniz. Diğer zincirlerdeki token adresi güncellenmiş olmayabilir ama tabii kök adresini her türlü amaç için kullanabilirsiniz.

Dolayısıyla, bir token seçerken şu bilgilerle arama yapabilirsiniz:
* token sembolü
* token adı
* sözleşme

Şöyle çalışır:

1. Bir token'ı listenize, token'ın sözleşme adresini bir özel (custom) token olarak ekleyerek kolayca ekleyin

(sözleşme adreslerini hem Polygon'da hem Ethereum'da destekliyoruz):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. Token bilgileri getirildiğinde, tüm token bilgilerinin bulunduğu bir onay ekranı göreceksiniz. Sonra bu token'ı özel token olarak ekleyebilirsiniz; bu token sisteminizde yerel olarak saklanacaktır. Çok fazla klon veya sahte token mevcut olduğundan, token sözleşmelerini iki kez yeniden doğrulamanızı öneririz:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. Eklediğiniz token bir token seçilirken gösterilir:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

Ayrıca doğrudan bir token ekleyebilirsiniz ve doğrudan bir token ekranın **Yönet** sekmesi:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>