---
id: accounts
title: Ano ang mga Account?
sidebar_label: Accounts
description: "Mga EOA at mga Kontrata na Account."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Ano ang mga Account? {#what-are-accounts}

Binubuo ng mga account na nakikipag-ugnayan sa isa't isa sa pamamagitan ng framework na nagpapadala ng mensahe ang pandaigdigang komunidad ng Ethereum. Ang pinaka-pangunahing pakikipag-ugnayan ay ang pagpapadala ng ilang value - tulad ng mga token ng MATIC, katutubong token ng Polygon o $ETH, ang katutubong token ng Ethereum.

Ang bawat account ay kinilala ng isang 20-byte hex identifier na tinatawag na isang address - na nabubuo mula sa pampublikong key ng account.

May dalawang uri ng mga account: **Externally** owned Account at **Contract owned Accounts**.

## Mga Account na Galing sa Labas {#externally-owned-accounts}

Ang EOA ay mga account na kinokontrol ng isang pribadong key, na may kakayahang magpadala ng mga token at mensahe.

1. Maaari silang magpadala ng mga transaksyon (either transfer o mag-trigger ng contract code),
2. ay kinokontrol ng mga pribadong key,
3. at walang kaugnay na code.

## Mga Account na Galing sa Kontrata {#contract-owned-accounts}
Ang Contract owned Account ay mga account na may nauugnay na smart contract code sa mga ito at hindi pag-aari ng kanilang pribadong key ang sinuman.

1. May nauugnay silang code,
2. Ang kanilang pagpapatupad ng code ay na-trigger ng mga transaksyon o mensahe (tawag) na natanggap mula sa iba pang kontrata,
3. at kapag isinagawa ang code na ito - gumaganap ito ng mga operasyon ng arbitraryong kumplikado (Turing completeness) - nagmanipula ng sarili nitong tiyagang imbakan at maaaring tumawag ng iba pang kontrata.

### Mga Resources {#resources}

- [Magbasa pa tungkol sa mga account](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
