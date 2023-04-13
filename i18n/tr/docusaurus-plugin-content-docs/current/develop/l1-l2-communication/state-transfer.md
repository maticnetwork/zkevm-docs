---
id: state-transfer
title: Durum Aktarması
description: Ethereum'dan Polygon'a durumu veya verileri kolayca aktarın.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon doğrulayıcıları sürekli olarak Ethereum zinciri üzerinde adlandırılan bir sözleşmeyi `StateSender`izler. Ethereum zinciri üzerinde kayıtlı bir sözleşme bu sözleşmeyi her çağırdığında, bir olay yayınlar. Polygon doğrulayıcıları, bu olayı kullanarak veriyi Polygon zinciri üzerinde başka bir sözleşmeye yönlendirirler. Bu **Durum Senkronizasyon** mekanizması Ethereum'dan Polygon'a veri göndermek için kullanılır.

Buna ek olarak, Polygon doğrulayıcıları Polygon zinciri üzerindeki her işlemin bir Ethereum hash'ini düzenli olarak gönderirler. Polygon'da gerçekleşen herhangi bir işlemi doğrulamak için bu **kontrol noktasını** kullanabilirsiniz. Polygon zincirinde bir işlemin gerçekleştiği doğrulandıktan sonra, Ethereum uygun işlemi gerçekleştirmek için kullanılabilir.

Bu 2 mekanizma, Ethereum ve Polygon arasında iki yönlü veri (devlet) aktarımı için birlikte kullanılabilir. Bu etkileşimleri soyut etmek için (Ethereum `FxBaseRootTunnel`üzerinde) ve `FxBaseChildTunnel`(Polygon) sözleşmelerimizi doğrudan miras alabilirsiniz.

## Kök Tünel (Root Tunnel) Sözleşmesi {#root-tunnel-contract}

`FxBaseRootTunnel` sözleşmesini [buradan](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol) kullanın. Bu sözleşme aşağıdaki işlevlere erişim sağlar:

- `function _processMessageFromChild(bytes memory data)`: Bu işlem, gönderilen verileri işlemek için devralan sözleşmede uygulanması gereken sanal bir `ChildTunnel`işlevdir.
- `_sendMessageToChild(bytes memory message)`: Bu fonksiyon kendi içinde bir bayt verisiyle bir mesaj şeklinde çağrılabilir. Bu veri, alt tünele olduğu gibi gönderilecektir.
- `receiveMessage(bytes memory inputData)`: Bu işlevin tarafından yayılan iletiyi almak için çağrılması `ChildTunnel`gerekir. İşlem kanıtının calldata (çağrı verisi) olarak sağlanması gerekir **Matic.js** kullanılarak bir kanıt oluşturmak için örnek bir komut dosyası aşağıda yer almaktadır.

## Alt Tünel (Child Tunnel) Sözleşmesi {#child-tunnel-contract}

`FxBaseChildTunnel` sözleşmesini [buradan](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol) kullanın. Bu sözleşme aşağıdaki fonksiyonlara erişim sağlar:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: Bu durum bu işlevden gönderilen mesajları işlemek için mantığı uygulayan sanal bir `RootTunnel`fonksiyondur.
- `function _sendMessageToRoot(bytes memory message)`: Bu fonksiyon bir bytes mesajını kök tünele göndermek için dâhili olarak çağrılabilir.

## Ön Koşullar {#prerequisites}

- Ethereum üzerindeki kök sözleşmenizde `FxBaseRootTunnel`sözleşmeyi devralmanız gerekir. Örnek olarak bu [sözleşmeyi](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) takip edebilirsiniz. Benzer şekilde, çocuğunuzda Polygon üzerindeki `FxBaseChildTunnel`sözleşmeyi miras edin. Örnek olarak bu [sözleşmeyi](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) takip edin.
- Kök sözleşmenizi dağıtırken
  - **Goerli Testnet**, 0**x2890bA17EE978480615e330ecB6533b880928e** ve **0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA** `_fxRoot`olarak `_checkpointManager`adresini aktar.

  - **Ethereum Mainnet**`_checkpointManager`, **0x86e4dc95c7fbdbf52e33d563bbdb00823894c287**** **`_fxRoot`ve 0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2'dir.
- **Mumbai testnet**'te çocuk sözleşmesini dağıtmak için **0xCf73231F28B7331BBe3124B907840A94851f9f11** `_fxChild`ile konstrüktör olarak geçin. **Polygon mainnet**`_fxChild` için 0**x8397259c983751DAf40400790063935a11afa28a** olacaktır.
- Çocuk tüneli adresi ile konuşlandırılmış kök tünelini `setFxChildTunnel`çağırın. Örnek: [0x79cd30ace561a26258918b56ce098a08ce0c707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- Kök tüneli adresi ile konuşlandırılmış çocuk tünelini `setFxRootTunnel`çağırın. Örnek: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Durum aktarma köprüsü için örnek sözleşmeler {#example-contracts-of-state-transfer-bridge}

- **Sözleşmeler**: [Fx-Portal Github Deposu](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Ethereum'dan Devlet Transferi → Polygon {#polygon}

- Kök sözleşmeniz içinde dahili `_sendMessageToChild()`olarak arama yapmanız, verileri Polygon'a gönderilecek bir argüman olarak aktarmanız gerekir. Örnek: [0x28705fcae757a0c8694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- Alt sözleşmenizde, `FxBaseChildTunnel` içinde `_processMessageFromRoot()` sanal fonksiyonunu uygulayarak veriyi Ethereum'dan alın. Veri, durum senkronize edildiğinde durum alıcısından (state receiver) otomatik olarak alınacaktır.

## Polygon Devlet Transferi → Ethereum {#ethereum}

1. Alt sözleşmeniz içinde `_sendMessageToRoot()` çağrısını veriyi Ethereum'a gönderilecek bir parametre olarak belirleyerek yapın. Örnek: [0x3cc9f7e675bb4f6af87ee9947bf24c38cbffa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

İşlem hash dikkate alın, bir kontrol noktası olarak dahil edildikten sonra kanıt oluşturmak için kullanılacaktır.

2. **Proof Generation (Proof Generation) kök zincirinde çıkışı tamamlamak için**: **Tx hash** ve **the** kullanarak kanıtı üretin. Bu kanıtı oluşturmak için Polygon tarafından barındırılan proof oluşturma API'sini kullanabilirsiniz veya [buradaki](https://github.com/maticnetwork/proof-generation-api) talimatları izleyerek kendi proof oluşturma API'nizi de döndürebilirsiniz.

Polygon tarafından barındırılan proof nesil uç noktası [burada](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature}) mevcuttur.

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Mainnet ve Testnet için proof nesil API kullanım örnekleri aşağıdaki gibidir:

→ [Mumbai Testnet Proof üretimi](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Polygon Mainnet Proof üretimi](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Kök sözleşmeniz içinde `_processMessageFromChild()` uygulayın.

4. Alt tünelden sözleşmenize gönderilen veriyi almak için oluşturulan kanıtı `receiveMessage()` için bir girdi olarak kullanın. Örnek: [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b66166ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
