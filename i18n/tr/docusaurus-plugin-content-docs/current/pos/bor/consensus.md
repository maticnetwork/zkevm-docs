---
id: consensus
title: Bor Konsensüsü
description: Yeni üreticilerin getirilmesine yönelik Bor mekanizması
keywords:
  - docs
  - matic
  - Bor Consensus
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Bor Konsensüsü {#bor-consensus}

Bor konsensüsü Clique konsensüsünden esinlenilmiştir: [https://eips.ethereum.org/EIPS/eip-225](https://eips.ethereum.org/EIPS/eip-225). Clique önceden tanımlanmış birden fazla üretici ile çalışır. Tüm üreticiler Clique API'lerini kullanarak yeni üreticilere oy verir. Bu sayede blok oluşturarak dönüşler alırlar.

Bor yeni üreticileri span ve sprint mekanizması aracılığıyla getirir.

## Doğrulayıcılar {#validators}

Polygon bir Hisse Kanıtı sistemidir. Herkes Matic token'larını Ethereum akıllı sözleşmesinde ("staking sözleşmesi") stake edebilir ve sistem için bir doğrulayıcı olabilir.

```jsx
function stake(
	uint256 amount,
	uint256 heimdallFee,
	address signer,
	bool acceptDelegation
) external;
```

Doğrulayıcılar Heimdall üzerinde aktif olduktan sonra, `bor` modülü aracılığıyla üretici olarak seçilirler.

Span yönetimini daha ayrıntılı olarak anlamak için Bor genel bakışını kontrol edin: [Bor Genel Bakış](https://www.notion.so/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab)

## Span {#span}

Mevcut tüm doğrulayıcılar arasında bir doğrulayıcı kümesi seçildiği bir blok kümesi. Heimdall span ayrıntılarını API'ler aracılığıyla sağlar.

```go
// HeimdallSpan represents span from heimdall APIs
type HeimdallSpan struct {
	Span
	ValidatorSet      ValidatorSet `json:"validator_set" yaml:"validator_set"`
	SelectedProducers []Validator  `json:"selected_producers" yaml:"selected_producers"`
	ChainID           string       `json:"bor_chain_id" yaml:"bor_chain_id"`
}

// Span represents a current bor span
type Span struct {
	ID         uint64 `json:"span_id" yaml:"span_id"`
	StartBlock uint64 `json:"start_block" yaml:"start_block"`
	EndBlock   uint64 `json:"end_block" yaml:"end_block"`
}

// Validator represents a volatile state for each Validator
type Validator struct {
	ID               uint64         `json:"ID"`
	Address          common.Address `json:"signer"`
	VotingPower      int64          `json:"power"`
	ProposerPriority int64          `json:"accum"`
}
```

Geth (Bu durumda, Bor) konsensüs ile ilgili veriler de dâhil olmak üzere blok verilerini depolamak için blok `snapshot` kullanır.

Span'deki her doğrulayıcı oylama gücüne sahiptir. Doğrulayıcılar, güçlerine dayalı olarak blok üreticisi olarak seçilir. Doğrulayıcının gücü ne kadar yüksekse, blok üreticisi olma olasılığı da o kadar yüksek olur. Bor aynısını yapmak için Tendermint algoritmasını kullanır. Kaynak: [https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go](https://github.com/maticnetwork/bor/blob/master/consensus/bor/validator_set.go)

## Sprint {#sprint}

Blok üretmek için yalnızca tek bir blok üreticisinin seçilmiş olduğu, bir span içindeki bir blok kümesi. Sprint boyutu açıklık büyüklüğünün bir faktörüdür. Bor, mevcut sprint için mevcut teklif sahibini/üreticiyi almak için `validatorSet` kullanır.

```go
currentProposerForSprint := snap.ValidatorSet().Proposer
```

Mevcut teklif sahibi dışında, Bor yedek üreticiler de seçer.

## Bir bloku yetkilendirme {#authorizing-a-block}

**İmzanın kendisi dışındaki her şeyi** içeren blokun hash'ini üreticinin ağ için bir bloku yetkilendirmek için imzalaması gerektiğinden, Bor'daki üreticilere aynı zamanda imzalayan da denir. Bu da hash'in üst bilginin her alanını ve ayrıca 65 baytlık imza son eki dışında `extraData` de içerdiği anlamına gelir.

Bu hash, standart `secp256k1` eğrisi kullanılarak imzalanır ve bunun sonucundaki 65 baytlık imza, sona eklenen 65 baytlık son ek olarak `extraData` içine gömülür.

İmzalanan her blok, Bloka ağırlık veren bir zorluğa atanır. Sırası geldiğinde imzalamak, sırası gelmeden imzalamaktan (`DIFF_NOTURN`) daha fazla ağırlığa (`DIFF_INTURN`) sahiptir.

### Yetkilendirme stratejileri {#authorization-strategies}

Üreticiler yukarıdaki spesifikasyonlara uyduğu sürece, blokları uygun gördükleri şekilde yetkilendirebilir ve dağıtabilirler. Bununla birlikte, aşağıda önerilen strateji ağ trafiğini ve küçük çatallanmaları azaltacaktır ve bu nedenle de önerilen bir özelliktir:

- Eğer bir üreticinin bir bloku imzalamasına izin verilmişse (yetkilendirilenler listesinde ise)
    - Bir sonraki blokun optimum imzalanma süresini hesaplayın (ana blok + `Period`)
    - Eğer üreticinin sırası gelmişse, tam olarak ulaşma zamanını bekleyin, derhal imzalayın ve yayımlayın
    - Eğer üreticinin sırası gelmemişse, imzalamayı `wiggle` geciktirin

Bu küçük strateji, sırası gelen üreticinin (ki bloku daha ağırlıklıdır) sırası gelmeden imzalayanlar karşısında imzalamak ve yaymak için küçük bir avantaja sahip olmasını sağlayacaktır. Ayrıca, bu düzen üreticilerin sayısı arttığında biraz ölçeklendirme de sağlar.

### Sırası gelmeden imzalama {#out-of-turn-signing}

Bor, sırası gelen üretici bir blok üretmediğinde yedek olarak devreye girecek birden çok blok üreticisi seçer. Bu durum, şu gibi çeşitli nedenlerle olabilir:

- Blok üreticisi düğüm, hizmet dışıdır
- Blok üreticisi, bloku bekletmeye çalışıyordur
- Blok üreticisi, bir bloku kasıtlı olarak üretmemektedir.

Yukarıdaki durumlardan biri gerçekleştiğinde, Bor’un yedekleme mekanizması devreye girer.

Herhangi bir anda, doğrulayıcılar kümesi, imzalayan adresine göre sıralanmış bir dizi olarak depolanır. Doğrulayıcı kümesinin A, B, C, D olarak sıralanmış olduğunu ve blok üretme sırasının C'de olduğunu varsayalım. Eğer C yeterli bir süre zarfında bir blok üretmezse, blok üretme sırası D'ye geçer. Eğer D de üretmezse sıra önce A ve sonra da B'ye geçer.

Bununla birlikte, C'nin bir blok üretip yayılması biraz zaman alacağından, yedek doğrulayıcılar blok üretmeye başlamadan önce bir süre bekleyecektir. Bu bekleme süresine wiggle denir.

### Wiggle {#wiggle}

Wiggle, bir üreticinin blok üretmeye başlamadan önce beklemesi gereken süredir.

- Son blokun (n-1) saat `t` itibarıyla üretildiğini varsayalım.
- Değişken bir parametre olan `Period` ile, mevcut blok ve bir sonraki blok arasında bir minimum bekleme süresi uygularız.
- İdeal koşullar altında, C `Period` boyunca bekleyecek ve ardından bloku üretip yayacaktır. Polygon'da blok süreleri gayet düşük (2-4 s) olacak şekilde tasarlandığından, yaymadaki gecikmenin de `Period` ile aynı değerde olduğu varsayılır.
- Dolayısıyla, eğer D `2 * Period` zamanında yeni bir blok görmezse, hemen bir blok üretmeye başlar. Özellikle, D'nin wiggle süresi `2 * Period * (pos(d) - pos(c))` olarak tanımlanır ve `pos(d) = 3` ile `pos(c) = 2` doğrulayıcı kümesindedir. `Period = 1` olduğunu varsayarsak, D'nin wiggle süresi 2s olur.
- Şimdi eğer D de blok üretmezse, wiggle süresi olan `2 * Period * (pos(a) + len(validatorSet) - pos(c)) = 4s` dolduğunda A bir blok üretmeye başlayacaktır.
- Benzer şekilde, C'nin wiggle süresi de `6s` olur

### Çatallanmaları çözümleme {#resolving-forks}

Yukarıdaki mekanizma zincirin sağlamlığını belli bir ölçüde artırsa da çatallanma olasılığını ortaya çıkarır. Aslına bakarsanız, C'nin bir blok üretmiş ama yaymada beklenenden daha uzun bir gecikme yaşanmış olması ve bunun sonucunda da en az 2 çatallanma oluşması mümkündür.

Çözüm basittir: zorluğu daha yüksek olan zinciri seçin. Ancak bu durumda da yanıtlanması gereken soru şudur: Kurulumumuzda bir blokun zorluğunu nasıl tanımlayacağız?

### Zorluk {#difficulty}

- Sırası gelmiş bir imzalayan (diyelim ki c) tarafından üretilen bir blok, zorluğu en yüksek = `len(validatorSet)` olarak tanımlanır.
- Sıradaki üretici D olduğu için; D'nin bir blok üretmesi durumu eğer ortaya çıkarsa ve çıktığında; blokun zorluğu tıpkı wiggle'daki gibi `len(validatorSet) - (pos(d) - pos(c))` olarak tanımlanacak ve bu da `len(validatorSet) - 1` olacaktır
- Yedek olarak hareket ederken A tarafından üretilecek bir blokun zorluğu `len(validatorSet) - (pos(a) + len(validatorSet) - pos(c))` olacaktır ve bu da `2` olur

Şimdi her blokun zorluğunu tanımladıktan sonra, bir çatallanmanın zorluğu sadece o çatallanmadaki blokların zorluklarının toplamıdır. Bir çatallanmanın seçilmesi gerektiğinde zorluğu daha yüksek olan seçilir, çünkü bu, blokların sırası gelen blok üreticileri tarafından üretildiği gerçeğini yansıtır. Bu, basitçe Bor üzerinde kullanıcı için bir kesinlik duygusu sağlamaya yöneliktir.

## Görünüm değişikliği {#view-change}

Her span sonrasında, Bor görünümü değiştirir. Bu da Bor'un bir sonraki span için yeni üreticiler getirdiği anlamına gelir.

### Span'i iletme {#commit-span}

Mevcut span sona ermek üzere olduğunda (özellikle span içindeki sondan bir önceki sprint'in sonunda), Bor Heimdall'dan yeni bir span çeker. Bu, Heimdall düğümüne gönderilen basit bir HTTP çağrısıdır. Veriler alındıktan sonra, Sistem çağrısı ile BorValidatorSet genesis sözleşmesine bir `commitSpan` çağrısı gönderilir.

Bor ayrıca blokun üst bilgisinde üreticilerin baytlarını da belirler. Bu, Bor hızlı eşitlenirken gereklidir. Hızlı eşitleme sırasında Bor üst bilgileri toplu olarak eşitler ve blokların yetkilendirilmiş üreticiler tarafından oluşturulup oluşturulmadığını doğrular.

Her Sprint’in başında, Bor sonraki üreticiler için bir önceki üst bilgiden üst bilgi baytlarını alır ve `ValidatorSet` algoritmasına dayalı olarak blok oluşturmaya başlar.

Bir blokun üst bilgisi şuna benzer:

```js
header.Extra = header.Vanity + header.ProducerBytes /* optional */ + header.Seal
```

<img src={useBaseUrl("img/Bor/header-bytes.svg")} />

## Ethereum zincirinden durum eşitleme {#state-sync-from-ethereum-chain}

Bor, ana ethereum zinciri üzerindeki bazı özel olayların Bor'a iletildiği bir mekanizma sağlar. Plasma sözleşmelerine yapılan fon yatırmalar da bu şekilde işlenir.

1. Ethereum üzerindeki herhangi bir sözleşme `StateSender.sol` içerisinde [syncState](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L33) işlevini çağırabilir. Bu çağrı `StateSynced` olayını yayar: https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol#L38

  ```js
  event StateSynced(uint256 indexed id, address indexed contractAddress, bytes data)
  ```

2. Heimdall bu olayları dinler ve çağrılar için `function proposeState(uint256 stateId)`çağrılar - `StateReceiver.sol`böylece bekleyen durum değişikliği kimlikleri için bir mağaza olarak hareket eder. İşlem mevcut doğrulayıcı kümesindeki doğrulayıcılardan biri tarafından yapıldığı sürece, `proposeState` işleminin 0 gaz ücretiyle bile işleneceğini unutmayın: https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/StateReceiver.sol#L24

3. Her sprint’in başında, Bor, Heimdall'daki durumları kullanarak bekleyen durum değişiklikleri hakkındaki ayrıntıları çeker ve bir sistem çağrısı kullanarak bunları Bor durumuna iletir. `commitState` için buraya bakın: https://github.com/maticnetwork/genesis-contracts/blob/f85d0409d2a99dff53617ad5429101d9937e3fc3/contracts/StateReceiver.sol#L41
