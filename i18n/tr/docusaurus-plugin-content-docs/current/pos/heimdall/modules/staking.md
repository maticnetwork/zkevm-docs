---
id: staking
title: Staking
description: validator-related ilgili işlemleri ve durumu yöneten modül
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Staking {#staking}

Staking modülü, doğrulayıcı ile ilgili işlemleri ve Heimdall için durumu yönetir. Doğrulayıcının Ethereum zinciri üzerinde token’larını stake ettiğini ve doğrulayıcı olduğunu unutmayın. İlgili doğrulayıcılar, Ethereum stake değişikliğini onaylamak için gerekli parametreleri kullanarak Heimdall üzerinde işlemler gönderirler. Doğrulayıcıların çoğunluğu stake üzerindeki değişikliği kabul ettiğinde bu modül Heimdall durumu üzerinde doğrulayıcı bilgilerini kaydeder.

## Anahtar yönetimi {#key-management}

Anahtar yönetimi için lütfen [Doğrulayıcı anahtar yönetimi](/docs/pos/heimdall/validator-key-management)’ne bakın

## Delegasyon {#delegation}

Bu modül yalnızca Heimdall üzerinde doğrulayıcı staking’ini yönetir. Delegasyon yalnızca Ethereum zinciri üzerindeki akıllı sözleşmelerde kullanılabilir. Akıllı sözleşmelerde delegasyon ödüllerinin hesaplanmasını optimize etmek için doğrulayıcı paylarını (doğrulayıcı başına ERC20) kullanıyoruz.

Daha fazla ayrıntıyı burada bulabilirsiniz: [Delegasyon (Doğrulayıcı payları)](/docs/pos/contracts/delegation)

## Ödüller {#rewards}

Tüm ödüller Ethereum zinciri üzerinde dağıtılır. Doğrulayıcılar ve delege edenler, `StakeManager.sol` üzerinde işlemi göndererek ödüllerini alır ya da yeniden stake ederler

Daha fazla ayrıntıyı burada bulabilirsiniz: [Ödüller](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## Mesajlar {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin`, sisteme yeni bir doğrulayıcı katıldığında staking ile ilgilenir. Doğrulayıcı Ethereum üzerinde `StakingManager.sol` içinde `stake` veya `stakeFor` çağırdığında yeni `Staked` olayı yayımlanır.

Kaynak: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

```jsx
/**
 * Staked event - emitted whenever new validator
 *
 * @param signer           Signer address for the validator
 * @param validatorId      Validator id
 * @param activationEpoch  Activation epoch for validator
 * @param amount           Staked amount
 * @param total            Total stake
 * @param signerPubKey     Signer public key (required by Heimdall/Tendermint)
 */
event Staked(
    address indexed signer,
    uint256 indexed validatorId,
    uint256 indexed activationEpoch,
    uint256 amount,
    uint256 total,
    bytes signerPubkey
);
```

`activationEpoch`, bir doğrulayıcının Heimdall üzerinde aktif olacağı denetim noktası sayısıdır.

Kullanılabilir slot yoksa akıllı sözleşmedeki stake çağrısı başarısız olur. Doğrulayıcı slotları, sistemdeki doğrulayıcı sayısını kısıtlamanın bir yoludur.  Slotlar Ethereum akıllı sözleşmelerinde yönetilir.

İşte Heimdall işlemi için `ValidatorJoin` mesajı:

```go
type MsgValidatorJoin struct {
	From         hmTypes.HeimdallAddress `json:"from"`
	ID           hmTypes.ValidatorID     `json:"id"`
	SignerPubKey hmTypes.PubKey          `json:"pub_key"`
	TxHash       hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex     uint64                  `json:"log_index"`
}
```

### MsgStakeUpdate {#msgstakeupdate}

`MsgStakeUpdate`, bir doğrulayıcı yeniden stake ettiğinde ya da yeni delegasyon geldiğinde stake güncellemesiyle ilgilenir. Her iki durumda da yeni `StakeUpdate` olayı yayımlanır.

```jsx
/**
 * Stake update event - emitted whenever stake gets updated
 *
 * @param validatorId      Validator id
 * @param newAmount        New staked amount
 */
event StakeUpdate(
	uint256 indexed validatorId,
	uint256 indexed newAmount
);
```

İşte Heimdall işlemi için `MsgStakeUpdate` mesajı:

```go
// MsgStakeUpdate represents stake update
type MsgStakeUpdate struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgValidatorExit {#msgvalidatorexit}

`MsgValidatorExit`, doğrulayıcı Ethereum üzerinde çıkış işlemini başlattıktan sonra doğrulayıcı çıkış işlemiyle ilgilenir. `SignerUpdate` olayını yayımlar.

```jsx
/**
 * Unstake init event - emitted whenever validator initiates the exit
 *
 * @param user                Signer
 * @param validatorId         Validator id
 * @param deactivationEpoch   Deactivation epoch for validator
 * @param amount              Unstaked amount
 */
event UnstakeInit(
    address indexed user,
    uint256 indexed validatorId,
    uint256 deactivationEpoch,
    uint256 indexed amount
);
```

İşte Heimdall işlemi için `MsgValidatorExit` mesajı:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate`, bir doğrulayıcı Ethereum üzerinde imzalayan anahtarını güncellediğinde imzalayan güncellemesiyle ilgilenir. `SignerUpdate` olayını yayımlar.

```jsx
/**
 * Signer change event - emitted whenever signer key changes
 *
 * @param validatorId      Validator id
 * @param oldSigner        Current old signer
 * @param newSigner        New signer
 * @param signerPubkey     New signer public key
 */
event SignerChange(
    uint256 indexed validatorId,
    address indexed oldSigner,
    address indexed newSigner,
    bytes signerPubkey
);
```

İşte Heimdall işlemi için `MsgSignerUpdate` mesajı:

```go
// MsgSignerUpdate signer update struct
type MsgSignerUpdate struct {
	From            hmTypes.HeimdallAddress `json:"from"`
	ID              hmTypes.ValidatorID     `json:"id"`
	NewSignerPubKey hmTypes.PubKey          `json:"pubKey"`
	TxHash          hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex        uint64                  `json:"log_index"`
}
```

## CLI komutları {#cli-commands}

### Doğrulayıcı ayrıntıları {#validator-details}

**İmzalayan adresine göre**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

Bu komut şu çıktıyı görüntülemelidir:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

**Doğrulayıcı adresine göre**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

Bu komut şu çıktıyı görüntülemelidir:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

### Doğrulayıcı katılımı {#validator-join}

Bu komut, CLI üzerinden doğrulayıcı katılım komutunu gönderir:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

`tx-hash` değeri, `Staked` olayını yayımlamış olan Ethereum TX hash’i ile aynı ve `log-index`, olayın yayımlandığı dizin ile aynı olmalıdır.

## REST API’leri {#rest-apis}

| Ad | Yöntem | Bitiş noktası |
|----------------------|------|------------------|
| Heimdall doğrulayıcı kümesini alma | GET | /staking/validator-set |
| Doğrulayıcı ayrıntılarını alma | GET | /staking/validator/validator-id |


Tüm sorgu API’leri aşağıdaki formatta sonuçlanır:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
