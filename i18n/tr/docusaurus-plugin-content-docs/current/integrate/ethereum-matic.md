---
id: ethereum-polygon
title: Ethereum ↔ Polygon
description: Bir sonraki blok zinciri uygulamanızı Polygon'da geliştirin.
keywords:
  - docs
  - matic
  - polygon
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Ethereum ↔ Polygon {#ethereum-polygon}

Varlıklarınızı Ethereum'dan Polygon'a ve Polygon'dan Ethereum'a aktarmak için Plasma Güvenceli Çözüm.
* Polygon Plasma sözleşmeleri ile etkileşim kurmak için [matic.js](https://github.com/maticnetwork/matic.js) kullanın.

## Akış {#flow}
Polygon üzerindeki sözleşmelerinizin devreye alınması ve Ethereum↔Polygon Desteği için Akışı burada bulabilirsiniz.

1. Kullanıcı ERC-20 token'ını Ethereum'da devreye alır - XToken

2. Şimdi sözleşme adresinizi [Polygon](https://t.me/joinchat/HkoSvlDKW0qKs_kK4Ow0hQ) ile paylaşın. İşte örnek bir istek...

> Herkese merhaba, Biz Polygon üzerinde devreye alınan AwesomeDApp'iz. Varlıklarımı Ethereum'dan Polygon'a ve Polygon'dan Ethereum'a aktarmak için bir çözüm arıyorum. <br/><br/>
> AwesomeDApp'ime dair kısa bir açıklama...<br/><br/>
> Ropsten üzerindeki Token_Address-> "0x.."<br/>
> Token_Name-> "XToken"<br/>
> Token_Symbol-> "X"<br/>
> Token_Decimals-> "18"<br/><br/>
> Bu token'ları Polygon Test Ağı Sürümü ile eşlemenizi istiyorum.<br/>

Gereksinimlere bağlı olarak esnek olabilecek ve Ethereum ↔ Polygon token'larınız ile eşlenebilecek bir Alt Öğe Sözleşmesini sizin için Polygon üzerinde devreye alacağız.( Polygon üzerinde devreye alma, Polygon'un yerel token'ını gerektirir ve bu token Ethereum'dan Polygon'a yatırılabilir veya İkincil Pazar Yerinden satın alınabilir.)

3. Kullanıcı Xtoken'ları mint edebilir ve Ethereum üzerinde Aktarabilir. Örneğin, diyelim ki 100 XToken mint edildi ve başka bir hesaba aktarıldı.

4. Bu token'ları Polygon Zinciri üzerinde avail etmek için fon yatır işlevini çağırın. Bu işlev iki işlem çağıracaktır. Bunların ilki onaylama, ikincisi ise ERC20'lerin yatırılmasıdır.

5. Şimdi 100 XToken Polygon Zinciri üzerindeki aynı adreste kullanılabilir.

6. YourAddress'ten NewAddress'e 50 XToken aktarabilirsiniz. Yine Polygon üzerindeki işlemler için, tıpkı Ethereum gibi Polygon da kendi Yerel token'ını kullanır.

7. Kullanıcılar Ethereum Zinciri üzerindeki bu Xtoken'ları geri almak isterlerse, bu token'ları childTokenContract'tan çekecek ve Polygon Zinciri üzerinde yakacak olan StartWithdraw'ı çağırırlar. Herhangi bir kötü amaçlı katılımı önlemek için bir dizi doğrulama yapılacaktır. Bunlar tamamlandığında, token'lar Ethereum Zinciri üzerinde kullanılabilecektir.

8. Bu token'ları EOA'nıza veya hesap adresinize geri almak için processExits()'i çağırın.

9. 50 XToken'ı Ethereum mainnet üzerindeki Hesap Adresinizde görmeniz gerekir.
