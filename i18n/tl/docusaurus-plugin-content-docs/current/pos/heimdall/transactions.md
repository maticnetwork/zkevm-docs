---
id: transactions
title: Mga Transaksyon
description: Ano ang mga transaksyon at kapag ginamit ang mga
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Mga Transaksyon {#transactions}

Ang mga transaksyon ay binubuo ng metadata na gaganapin sa mga [konteksto](https://docs.cosmos.network/main/core/context.html) at [mensahe](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) na nag-trigger ng mga pagbabago ng estado sa loob ng isang module, sa pamamagitan ng Handler ng module.

Kapag gusto ng mga user na makipag-ugnayan sa isang aplikasyon at gumawa ng mga pagbabago sa estado (hal. pagpapadala ng mga barya), gumagawa sila ng mga transaksyon. Ang bawat transaksyon ay `message`dapat na nilagdaan gamit ang pribadong key na nauugnay sa naaangkop na account bago ang transaksyon ay nai-broadcast sa network. Ang isang transaksyon ay dapat na isama sa isang bloke, napatunayan, at pagkatapos ay naaprubahan ng network sa pamamagitan ng proseso ng pinagkasunduan. Upang basahin ang higit pa tungkol sa lifecycle ng transaksyon magklik [dito](https://docs.cosmos.network/main/basics/tx-lifecycle.html).

## Depinisyon ng mga Uri {#type-definition}

Mga bagay na transaksyon ay mga SDK type na nagpapatupad ng `Tx`interface.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

Higit pang mga detalye sa mga Transaksyon: [https://docs.cosmos.network/main/core/transactions.html](https://docs.cosmos.network/main/core/transactions.html)
