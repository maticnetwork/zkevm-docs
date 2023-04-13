---
id: consensus-mechanism
title: Mekanismo ng Consensus
description: "PoW, PoS, DPoS, PoSpace, at PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Mekanismo ng Consensus {#consensus-mechanism}

Ang Mekanismo ng consensus ay isang fault-tolerant mechanism na ginagamit sa mga computer at blockchain system para makamit ang mga kinakailangang kasunduan sa single data value o sa single state ng network sa mga ipinamahaging proseso o multi-agent system, gaya ng nasa mga cryptocurrency.

## Mga uri Mekanismo ng Consensus {#types-of-consensus-mechanism}

### Proof of Work {#proof-of-work}
Inilalarawan ng proof of work ang system na nangangailangan ng hindi mahalaga pero posibleng dami ng pagsisikap para mapigilan ang mga pag-atakeng dos(denial-of-service) at iba pang malisyosong pag-atake. Nangangailangan itong malutas ang isang mapaghamong computational puzzle para makalikha ng mga bagong block sa Ethereum.

### Proof of Stake {#proof-of-stake}
Nakamit ng mekanismo ng Proof-of-Stake ang pinagkasunduan sa pamamagitan ng paghingi ng mga gumagamit na mag-stake ng isang halaga ng kanilang mga token para magkaroon ng pagkakataon na mapili na mag-validate ng mga block ng mga transaksyon, at validate para sa paggawa nito. Ibinibigay ang priyoridad sa mga miner na bumili ng pinakamaraming stake sa blockchain system.

### Itinalagang Proof of Stake {#delegated-proof-of-stake}
Ipinapakita ng anyo ng consensus na ito ang paghahalal ng mga miyembro ng mga pamunuan. Sa halip na itigil ang kanilang mga ari-arian mismo, puwedeng mag-deliver ang mga stakeholder ng aktibidad na ito sa mga third party, ang mga witness o delegado, na makikibahagi sa proseso ng consensus. Ang mga saksi, ang mga who ng mga transaksyon, ay karaniwang nag-aalok ng isang panukala, humihingi ng mga boto at inihahalal ng mga stakeholder. Karaniwang ibinabahagi ang mga gantimpala na nakuha ng mga entity na iyon sa mga kalahok ng network.

### Proof of Space {#proof-of-space}
Kapaki-pakinabang ang ganitong uri ng mekanismo ng consensus sa mga desentralisadong application ng imbakan ng file tulad ng sa Storj.io, Filecoin, at Crust, kung saan pinatunayan ng node na may lehitimong kapasidad sila sa kanilang hardware. Gayunpaman, sa halip na gumamit ng mabigat na computation tulad ng sa mekanismo ng PoW, kinukuha nito ang kapasidad ng imbakan ng bawat node. Kung minsan, tinutukoy rin ito bilang PoStorage o PoCapacity.

### Proof of Elapsed Time {#proof-of-elapsed-time}
Mas mahusay na alternatibo sa PoW, na kumokonsumo ng mas kaunting computational resource. Kailangang maghintay ang bawat kalahok na node ng isang random na halaga ng oras at ang unang node na magising mula sa pagtulog ay nakakakuha ng pagkakataon na lumikha ng bagong block, na saka pinapalaganap sa pamamagitan ng network. Nangangailangan ito ng Mga Trusted Execution Environment (TEE ) tulad ng Intel SGX, na isang nakahiwalay na bahagi ng memorya at maaari lamang i-access ang isang tiyak na set ng mga tagubilin.

## **Mga mapagkukunan**

- [Fault ng Byzantine](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [Uri ng Mga Consensus Mechanisms](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [Pangkalahatang-ideya at Kasaysayan ng Consensus System Development](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [Ipinamamahagi ang Pag-unawa](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [Problema ng mga General ng Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)