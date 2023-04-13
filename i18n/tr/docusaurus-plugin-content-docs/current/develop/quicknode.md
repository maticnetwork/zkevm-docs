---
id: quicknode
title: QuickNode Kullanarak Akıllı Bir Sözleşme Dağıtın
sidebar_label: Using QuickNode
description:  Brownie ve Quicknode. kullanarak Polygon üzerinde Akıllı Sözleşmeleri dağıtın.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Genel Bakış {#overview}

Python en çok yönlü programlama dillerinden biridir; test modellerini çalıştıran araştırmacılardan ağır üretim ortamlarında kullanan geliştiricilere kadar, mümkün olan her teknik alanda kullanım durumları vardır.

Bu eğitimde [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) çerçevesini kullanarak Polygon için [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) testnet düğümlerinden yararlanarak akıllı bir sözleşme yazıp dağıtmak için nasıl kullanılacağını öğreneceksiniz.

:::tip

Quicknode ekibi ile iletişime geçmek için onlara bir mesaj gönderin veya [@QuickNode](https://twitter.com/QuickNode) ile onları Twitter'da etiketleyin.

:::

## Ön Koşullar {#prerequisites}

- Python3 yüklü
- Bir Polygon düğümü
- Kod editörü
- Komut satırı arayüzü

## Neler yapacaksınız? {#what-you-will-do}

1. Brownie'yi kurmak
2. Quicknode test düğümlerine erişmek
3. Bir akıllı sözleşmeyi Derlemek ve Devreye Almak
4. Konuşlandırılan sözleşme verilerini kontrol edin

## Brownie nedir? {#what-is-brownie}

Akıllı sözleşme geliştirmesi büyük ölçüde [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/) ve [Hardhat](https://hardhat.org/) gibi JavaScript tabanlı kütüphanelerin hakimiyetindedir. Python çok yönlü ve çok kullanılan bir dildir ve akıllı sözleşmeler / Web3 geliştirme için de kullanılabilir; [web3.py](https://web3py.readthedocs.io/en/stable/) Web3 gereksinimlerini karşılayan zorlayıcı bir Python kütüphanesidir. Brownie framework üzerine inşa `web3.py`edilmiştir.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie), akıllı sözleşmelerin geliştirilip test edileceği Python tabanlı bir altyapıdır. Brownie hem Solidity hem de Vyper sözleşmelerini destekler, hatta [pytest](https://github.com/pytest-dev/pytest) vasıtasıyla sözleşmeyi test etme imkânı sağlar.

Brownie ile akıllı sözleşme yazma ve devreye alma işlemini göstermek için, şablon projeler olan [Brownie-mix'ler](https://github.com/brownie-mix) kullanacağız. Spesifik olarak, ERC-20 uygulamasının bir şablonu olan bir [token mix](https://github.com/brownie-mix/token-mix) kullanacağız.

## Bağımlılıkları yükleyin {#install-dependencies}

Brownie python3 üzerine inşa edilmiştir, bu yüzden Brownie ile çalışmak için yüklü olması gerekir. Sistemimizde python3 yüklü olup olmadığını kontrol edelim. Bunu yapmak için komut satırı aracınıza aşağıdaki formu yazın:

```bash
python3 -V
```

Bu, yüklü python3 sürümünü döndürecektir. Yüklü değilse, bunu resmi [python web sitesinden](https://www.python.org/downloads/) indirip kurun.

Brownie'yi yüklemeden önce bir proje dizini oluşturalım ve bu proje dizinini geçerli çalışma dizinimiz yapalım:

```bash
mkdir brownieDemo
cd brownieDemo
```

Şimdi python3'ü sisteminize yüklediğinize göre, Python'un paket yöneticisi olan pip'i kullanarak brownie'yi yükleyelim. JavaScript için npm ne ise pip de odur. Komut satırınıza aşağıdaki kodu yazın:

```bash
pip3 install eth-brownie
```

:::tip

Yükleme başarısız olursa, bunun yerine aşağıdaki komutu kullanabilirsiniz:`sudo pip3 install eth-brownie`

:::

Brownie'nin doğru şekilde kurulup kurulmadığını kontrol etmek için komut `brownie`satırınızı yazın ve aşağıdaki çıktıyı vermelidir:

![img](/img/quicknode/brownie-commands.png)

Jeton karışımını almak için komut satırınıza aşağıdaki kodu yazın:

```
brownie bake token
```

Bu durum dizinimizde yeni bir `token/`dizin `brownieDemo`oluşturacaktır.

### Dosya yapısı {#file-structure}

Öncelikle dizine `token`gidin:

```bash
cd token
```

Şimdi, `token`dizini metin editörünüzde açın. `contracts/`Klasör altında ana sözleşmemiz olan `Token.sol`bu da bulacaksınız. Kendi sözleşmenizi yazabilir veya dosyayı `Token.sol`değiştirebilirsiniz.

Bu `scripts/`klasörün altında `token.py`Python betiğini bulacaksınız. Bu komut dosyası sözleşmeyi dağıtmak için kullanılacak ve sözleşmelere göre modifikasyonlar gereklidir.

![img](/img/quicknode/token-sol.png)

Bu sözleşme bir ERC-20 sözleşmesidir. ERC-20 standartları ve sözleşmeleri hakkında bu [kılavuzda bulunan ERC-20 tokenları hakkında](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) daha fazla bilgi edinebilirsiniz.

## Polygon düğümünüzü booting {#booting-your-polygon-node}

QuickNode Polygon Mainnet ve Mumbai testnet düğümlerinden oluşan küresel bir ağa sahiptir. Ayrıca [ücretsiz bir Polygon RPC](https://docs.polygon.technology/docs/operate/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) çalıştırırlar, ancak oran sınırlı kalırsa [QuickNode üzerinden ücretsiz bir deneme düğümü](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) için kaydolabilirsiniz.

![img](/img/quicknode/http_URL.png)

Bu işlemin ardından yararlı olacak **HTTP URL**'sini kopyalayın.

## Ağ ve Hesap kurulumu {#network-and-account-setup}

QuickNode uç noktamızı Brownie ile kurmamız gerekiyor. Bunu yapmak için komut satırınıza aşağıdaki formu yazın:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Polygon düğümümüzü önyükleme sırasında az önce aldığımız **Mumbai Testnet HTTP URL'si** `YOUR_QUICKNODE_URL`ile değiştirin.

Yukarıdaki komutta, `Ethereum` ortamın adıdır, `matic_mumbai` ise ağın özel adıdır; özel ağınıza dilediğiniz adı verebilirsiniz.

Burada yapmamız gereken bir sonraki şey, Brownie kullanarak yeni bir cüzdan oluşturmaktır, bunu komut satırınıza yazmaktır:

```
brownie accounts generate testac
```

Hesabınız için bir şifre oluşturmanız istenecektir! Adımları tamamladıktan sonra, bu bir mnemonik cümle ile birlikte bir hesap oluşturacak ve çevrimdışı olarak will Bu isim hesabımızın `testac`adıdır (İstediğiniz herhangi bir adı seçebilirsiniz).

![img](/img/quicknode/new-account.png)

:::note

Mnemonic ifadeleri bir hesabı kurtarmak veya hesabı [<ins>diğer gözetim dışı</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode) cüzdanlara aktarmak için kullanılabilir. Yukarıdaki resimde gördüğünüz hesap sadece bu kılavuz için oluşturulmuştur.

:::

Hesap adresini kopyalayın, böylece sözleşmemizi dağıtmak için gerekli olan MATIC testi yaptıralım.

## Testnet MATIC almak {#getting-testnet-matic}

Akıllı sözleşmemizi dağıtmak için gaz ücretlerini ödemek için MATIC token'ları test etmemiz gerekecek.

Bu eğitimde oluşturduğumuz hesabınızın adresini kopyalayın, [Polygon musluğunun](https://faucet.polygon.technology/) adres alanına yapıştırın ve **Gönder'e** tıklayın. Faucet size 0,2 adet test MATIC gönderecektir.

![img](/img/quicknode/faucet.png)

## Akıllı Sözleşmenizi Dağıtmak {#deploying-your-smart-contract}

Sözleşmeyi dağıtmadan önce, aşağıdaki işlemleri kullanarak derlemeniz gerekir:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Şimdi metin editörünüzde `scripts/token.py`açın ve aşağıdaki değişiklikleri yapın:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Açıklama

Yukarıdaki kodu kullanarak, daha önce oluşturduğumuz `testac`hesabı ithal ettik ve bunu değişken olarak `acct`sakladık. Ayrıca, bir sonraki satırda, değişkenden veri almak için bir `'from':`parça `acct`düzenledik.

:::

Son olarak, akıllı sözleşmemizi uygulayacağız:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`Bu nedenle daha önce oluşturduğumuz özel ağın adı. Bu istem, hesabı yaparken daha önce ayarladığımız **şifreyi** isteyecektir.

Yukarıdaki komutu çalıştırdıktan sonra işlem hash'ini alacaksınız ve Brownie işlemin onaylanmasını bekleyecektir. İşlem onaylandıktan sonra sözleşmemizin Polygon Mumbai test ağı üzerinde devreye alındığı adresi döndürecektir.

![img](/img/quicknode/brownie-run.png)

[Polygonscan Mumbai](https://mumbai.polygonscan.com/) üzerindeki sözleşme adresini kopyalayıp yapıştırarak devreye alınan sözleşmeyi kontrol edebilirsiniz.

![img](/img/quicknode/polygonscan.png)

## Sözleşmeyi Test Etme {#testing-the-contract}

Brownie akıllı sözleşme işlevlerini test etme seçeneğini de sunar. `pytest` altyapısını kullanarak kolayca birim testler üretir. Brownie'de testler yazma hakkında daha fazla bilgiyi Brownie [belgelerinde](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#) bulabilirsiniz.

**Sözleşmeler Brownie ve QuickNode kullanarak Polygon üzerinde böyle devreye alınmaktadır.**

QuickNode, tıpkı Polygon gibi, geliştirici [kılavuzları](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [dokümanlar](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [öğretici videoları](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) ve birbirlerine yardım etmeye istekli [Web3 geliştiricileri topluluğunu](https://discord.gg/DkdgEqE) sağlayan bir education-first yaklaşıma sahipti.
