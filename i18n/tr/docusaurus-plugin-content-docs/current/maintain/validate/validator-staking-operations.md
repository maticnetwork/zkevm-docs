---
id: validator-staking-operations
title: Polygon üzerinde stake
description: Polygon Ağı'nda bir doğrulayıcı olarak nasıl bahis yapılacağını öğrenin
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Ön Koşullar {#prerequisites}

### Tam düğüm kurulumu {#full-node-set-up}

Doğrulayıcı düğümünüz tamamen ayarlanır ve senkronize edilir. Ayrıca bakınız:

* [Bir Validator Düğümü çalıştırın](run-validator.md)
* [Bir Doğrulayıcı Düğümünün Ansible ile Çalıştırılması](run-validator-ansible.md)
* [ikili Dosyalardan Doğrulayıcı Düğümü Çalıştırma](run-validator-binaries.md)

### Hesap kurulumu {#account-setup}

Doğrulayıcı düğümünüzde hesabın kurulduğunu kontrol edin. Kontrol etmek için aşağıdaki komutu **doğrulama düğümünde** çalıştırın:

```sh
    heimdalld show-account
```

Çıktınız aşağıdaki biçimde görünmelidir:

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

Bu çıktı doğrulayıcı düğümünüz için adresinizi ve genel anahtarınızı gösterecektir. **Bu adresin Ethereum üzerindeki imzalayan adresinizle eşleşmesi gerektiğini** unutmayın.

### Özel anahtarı göster {#show-private-key}

Bu adım isteğe bağlıdır.

Doğrulayıcı düğümünüzde özel anahtarın doğru olduğunu kontrol edin. Kontrol etmek için aşağıdaki komutu **doğrulama düğümünde** çalıştırın:

```sh
heimdalld show-privatekey
```

Aşağıdaki çıktı görünmelidir:

```json
{
    "priv_key": "0x********************************************************"
}
```

## Polygon üzerinde stake {#stake-on-polygon}

Polygon'da [doğrulayıcı panosunu](https://staking.polygon.technology/validators/) (validator dashboard) kullanarak stake edebilirsiniz.

### Staking panosunu kullanarak stake edin {#stake-using-the-staking-dashboard}

1. [Doğrulayıcı panosuna](https://staking.polygon.technology/validators/) girin.
2. Cüzdanınız ile oturum açın. MetaMask önerilen cüzdandır. MATIC token'larınızın mevcut olduğu aynı adresi kullanarak giriş yaptığınızdan emin olmanız gerekir.
3. **Bir Validator Ol** 'ı tıklayın. Düğümünüzü ayarlamanız istenecektir. Şu ana kadar düğüm kurmadıysanız, bunu yapmanız gerekecektir, aksi takdirde stake etmeye çalıştığınızda hata alırsınız.
4. Bir sonraki ekranda doğrulayıcı bilgilerinizi, komisyon oranınızı ve stake miktarınızı ekleyin.
5. **Stake Now**'ı (şimdi stake et) tıklayın.

işlem tamamlandıktan sonra bir doğrulayıcı olmak için başarıyla stake etmiş olacaksınız. İşlemi onaylamanız üç kez istenecektir.

* İşlemi Onaylayın - Bu sizin stake işleminizi onaylayacaktır.
* Stake - Bu sizin stake işleminizi onaylayacaktır.
* Save - Bu sizin doğrulayıcı bilgilerinizi kaydedecektir.

:::note

Değişikliklerin [staking panosunda](https://staking.polygon.technology/account) gerçekleşmesi için en az 12 blok onayı gerekir.

:::

### Bakiyeyi kontrol edin {#check-the-balance}

Adresinizin bakiyesini kontrol etmek için:

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

burada

* SIGNER_ADDRESS — [imzacı adresinizdir](/docs/maintain/glossary.md#validator).
* CHAIN_ID — istemci ön eki `heimdall-137` olan Polygon mainnet zincir kimliğidir.

Aşağıdaki çıktı görünmelidir:

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### Bir doğrulayıcı olarak ödüller talep edin {#claim-rewards-as-a-validator}

Bir doğrulayıcı olarak kurulum ve stake etme işlemlerini yaptıktan sonra doğrulayıcı görevlerini yerine getirdiğiniz için ödüller kazanacaksınız. Doğrulayıcı görevlerini gereği gibi yerine getirdiğinizde ödül kazanırsınız.

Ödülleri talep etmek için [doğrulayıcı panonuza](https://staking.polygon.technology/account) gidebilirsiniz.

Profilinizde iki düğme göreceksiniz:

* Withdraw Reward (ödül çek)
* Restake Reward (ödülü yeniden stake et)

#### Withdraw Reward (ödül çek) {#withdraw-reward}

Bir doğrulayıcı olarak doğrulayıcı görevlerini doğru bir şekilde yerine getirdiğiniz sürece ödüller kazanırsınız.

**Withdraw Reward**'ı tıkladığınızda ödülleriniz cüzdanınıza gönderilecektir.

Pano, 12 blok onayından sonra güncellenecektir.

#### Restake Reward (ödülü yeniden stake et) {#restake-reward}

Ödüllerinizi yeniden stake etmek bir doğrulayıcı olarak stake'inizi artırmanın kolay bir yoludur.

**Restake Reward**'ı tıkladığınızda ödülünüzü yeniden stake eder ve stake miktarınızı artırırsınız.

Pano, 12 blok onayından sonra güncellenecektir.
