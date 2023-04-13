---
id: technical-faqs
title: Domande tecniche frequenti
description: Domande frequenti relative all'esecuzione di un Validator sulla rete Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - faqs
  - technical
slug: technical-faqs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 1. Le chiavi private sono le stesse per i keystore Heimdall e Bor? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}

Sì, la chiave privata utilizzata per generare le chiavi validatrici e il keystore Bor è la stessa.
La chiave privata utilizzata in questo caso è l'indirizzo del tuo ETH wallet dove
sono conservati i tuoi Polygon testnet token.

### 2. Elenco dei comandi comuni {#2-list-of-common-commands}

Attualmente abbiamo per te un elenco di facile consultazione per i pacchetti Linux. In futuro
questo elenco verrà aggiornato regolarmente per offrire la massima comodità.

**Per i pacchetti Linux**

#### A. Dove trovare il file genesis Heimdall {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. Dove trovare heimdall-config.toml {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. Dove trovare config.toml {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. Dove trovare heimdall-seeds.txt {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Avviare Heimdall {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. Avviare il rest-server Heimdall {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. Avviare il bridge-server {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Registri Heimdall {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Dove trovare i file genesis Bor {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. Avviare Bor {#j-start-bor}

`sudo service bor start`

#### K. Controllare i registri Heimdall {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Controllare il rest-server Heimdall {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Controllare i registri bridge Heimdall {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. Controllare i registri Bor {#n-check-bor-logs}

`tail -f bor.log`

#### O. Interrompere il processo Bor {#o-kill-bor-process}

**Per linux**:

1. `ps -aux | grep bor`. Ottieni il PID per Bor e quindi esegui il seguente comando.
2. `sudo kill -9 PID`

**Per i binari**:

Vai a `CS-2003/bor` e quindi esegui, `bash stop.sh`

### 3. Errore: non è stato possibile sbloccare l'account (0x...) Nessuna chiave per l'indirizzo o il file fornito {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

Questo errore si verifica in quanto il percorso per il file password.txt è errato. Puoi seguire questi passaggi per correggerlo:

Questo errore si verifica in quanto il percorso per il file password.txt e Keystore non è corretto. Puoi seguire questi passaggi per correggerlo:

1. Copia il file keystore Bor su

    /etc/bor/dataDir/keystore

2. E password.txt su

    /etc/bor/dataDir/

3. Assicurati di aver aggiunto l'indirizzo corretto in `/etc/bor/metadata`

Per i binari:

1. Copia il file keystore Bor su:

`/var/lib/bor/keystore/`

2. E password.txt su

`/var/lib/bor/password.txt`


### 4. Errore: Block.Header.AppHash errato. xxxx previsto {#4-error-wrong-block-header-apphash-expected-xxxx}

Questo si verifica solitamente per via di un'installazione errata di Heimdall. Puoi seguire questi passaggi per correggerlo:

esegui

    ```heimdalld unsafe-reset-all```

e riavvia di nuovo i servizi heimdall. Puoi fare riferimento a questa guida - https://docs.polygon.technology/docs/validate/validate/run-validator

### 5. Da dove posso creare una chiave API? {#5-from-where-do-i-create-the-api-key}

Puoi accedere a questo link: [https://infura.io/register](https://infura.io/register) . Una volta configurato il tuo account e progetto, assicurati di copiare la chiave API per Ropsten e non per Mainnet

Mainnet è selezionata come impostazione predefinita.

### 6. Heimdall non funziona. Ricevo un errore Panic {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**Errore effettivo**: Il mio Heimdall non funziona. Nel registro, la prima riga è:
panic: db_backend leveldb sconosciuto, previsto goleveldb o memdb o fsdb

Cambia la configurazione a `goleveldb` in `config.toml`.


### 7. Come posso eliminare i residui di Heimdall Bor? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Se vuoi eliminare i residui di Heimdall e Bor, puoi eseguire i seguenti comandi.
Bor:

Per il pacchetto Linux:

```$ sudo dpkg -i matic-bor```

E rimuovi la directory Bor:

```$ sudo rm -rf /etc/bor```

Per i binari:

```$ sudo rm -rf /etc/bor```

E

```$ sudo rm /etc/heimdall```


### 8. Quanti validatori possono essere attivi contemporaneamente? {#8-how-many-validators-can-be-active-concurrently}

Sono previsti fino a 100 validatori attivi allo stesso tempo. Aggiungeremo altri partecipanti se il limite viene raggiunto a metà dell'evento. Ti ricordiamo che i validatori attivi sono principalmente quelli con un periodo di attività elevato. I partecipanti con un periodo di inattività elevato verranno esclusi.

### 9. A quanto ammonta lo stake necessario? {#9-how-much-should-i-stake}

"importo-stake" e "importo-commissioni-heimdall" - a quanto dovrebbero ammontare?

L'importo minimo dello stake è pari ad almeno 10 token Matice, mentre la commissione Heimdall dovrebbe essere superiore a 10. Ad esempio, nel caso l'importo del tuo stake sia pari a 400, la commissione Heimdall dovrebbe essere pari a 20. Consigliamo di mantenere la commissione Heimdall a 20.

Tuttavia, ricorda che i valori inseriti nell'importo dello stake e nell'importo della commissione Heimdall dovrebbero contenere 18 decimali

Ad esempio,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. Sono stato selezionato per diventare un validatore ma il mio indirizzo ETH non era corretto. Cosa posso fare? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

Se hai accesso all'indirizzo ETH da te precedentemente inviato, puoi trasferire i test token da tale account all'account attuale. Puoi quindi avviare il processo di configurazione dei tuoi nodi.

Se non hai accesso a tale indirizzo ETH, non ti trasferiremo i token separatamente. Puoi registrarti di nuovo nel modulo con l'indirizzo ETH corretto.

### 11. Ricevo un errore quando avvio il bridge {#11-i-m-getting-an-error-starting-the-bridge}

**Errore**: l'oggetto "avvia" è sconosciuto, prova "bridge help". Va bene ignorarlo?

Controlla "quale bridge" - Se è `/usr/sbin/bridge`, non stai eseguendo il programma "bridge" corretto.

Prova `~/go/bin/bridge` invece `(or $GOBIN/bridge)`


### 12. Ricevo un errore dpkg {#12-i-m-getting-dpkg-error}

**Errore**: "dpkg: errore nell'elaborazione dell'archivio matic-heimdall_1.0.0_amd64.deb (--install): cercando di sovrascrivere '/heimdalld-rest-server.service', che è anche in un pacchetto matic-node 1.0.0"

Questo si verifica principalmente per via di un'installazione precedente di Polygon sulla tua macchina. Per risolverlo puoi eseguire:

`sudo dpkg -r matic-node`


### 13. Non mi è chiaro quale chiave privata dovrei aggiungere quando genero una chiave validatrice {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

La chiave privata da utilizzare è l'indirizzo del tuo wallet ETH dove sono archiviati i tuoi token testnet Polygon. Puoi completare la configurazione con una coppia di chiavi pubblica-privata legata all'indirizzo inviato sul modulo.


### 14. Esiste un modo per sapere se Heimdall è sincronizzato? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

Puoi eseguire il seguente comando per controllarlo:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

Controlla il valore di catching_up. Se è falso, allora il nodo è completamente sincronizzato.


### 15. Se qualcuno diventasse un Top 10 staker, come riceverà la propria ricompensa in MATIC alla fine? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

Le ricompense della fase 1 non sono basate sullo stake. Consulta https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ per ulteriori informazioni sulla ricompensa. I partecipanti con uno stake elevato non hanno automaticamente diritto a una ricompensa in questa fase.


### 16. Quale versione di Heimdall dovrei usare? {#16-what-should-be-my-heimdall-version}

Per controllare la tua versione di Heimdall puoi eseguire:

```heimdalld version```

La versione corretta di Heimdall per la fase 1 dovrebbe essere `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. Quali valori dovrei aggiungere nell'importo dello stake e nell'importo della commissione? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

L'importo minimo dello stake è pari ad almeno 10 token Matice, mentre la commissione Heimdall dovrebbe essere superiore a 10. Ad esempio, nel caso l'importo del tuo stake sia pari a 400, la commissione Heimdall dovrebbe essere pari a 20. Consigliamo di mantenere la commissione Heimdall a 20.

Tuttavia, ricorda che i valori inseriti nell'importo dello stake e nell'importo della commissione Heimdall dovrebbero contenere 18 decimali

Ad esempio,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. Qual è la differenza tra `/var/lib/heimdall` e `/etc/heimdall?`

`/var/lib/heimdall` è la dir heimdall dove utilizzi il tuo metodo di installazione binario. `/etc/heimdall` sta per il metodo di installazione del pacchetto Linux.


### 19. Quando eseguo una transazione relativa allo stake, ricevo l'errore "Gas superato" {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

Questo errore può verificarsi a causa del formato dell'importo dello stake o della commissione. I valori inseriti al momento del comando relativo allo stake devono contenere 18 decimali.

Tuttavia, ricorda che i valori inseriti nell'importo dello stake e nell'importo della commissione Heimdall dovrebbero contenere 18 decimali

Ad esempio,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. Quando avrò l'opportunità di diventare un validatore? {#20-when-will-i-get-a-chance-to-become-a-validator}

Stiamo aggiungendo progressivamente validatori nel corso dell'evento Fase 1. Pubblicheremo man a mano un elenco dei nuovi validatori esterni. Tale elenco verrà annunciato sul canale di Discord.


### 21. Dove posso trovare la posizione delle informazioni sull'account Heimdall? {#21-where-can-i-find-heimdall-account-info-location}

Per binari:

    /var/lib/heimdall/config folder

Per il pacchetto Linux:

    /etc/heimdall/config


### 22. In quali file devo aggiungere la chiave API? {#22-which-file-do-i-add-the-api-key-in}

Una volta creata la chiave API, devi aggiungere la chiave API nel file `heimdall-config.toml`.


### 23. In quale file devo aggiungere i persistent_peers? {#23-which-file-do-i-add-the-persistent_peers}

Puoi aggiungere i persistent_peers nel seguente file:

    /var/lib/heimdall/config/config.toml


### 24. “Hai resettato Tendermint senza reimpostare i dati della tua applicazione?” {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

In questo caso, puoi resettare i dati di configurazione Heimdall e provare a eseguire nuovamente l'installazione.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Errore: unmarshall impossibile della decodifica di errore di configurazione 1 errore(i) {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

Errore: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

Questo si verifica principalmente se sono presenti degli errori di battitura, delle parti mancanti o dei residui di un vecchio file di configurazione. Devi rimuovere tutti i residui e quindi provare a configurarlo di nuovo.

### 26. Come interrompere i servizi Heimdall e Bor {#26-to-stop-heimdall-and-bor-services}

**Per i pacchetti Linux**:

Stop Heimdall: `sudo service heimdalld stop`

Arresta Bor: `sudo service bor stop`oppure

1. `ps -aux | grep bor`. Ottieni il PID per Bor e quindi esegui il seguente comando.
2. `sudo kill -9 PID`

**Per i binari**:

Stop Heimdall: `pkill heimdalld`

Stop bridge: `pkill heimdalld-bridge`

Stop Bor: vai a CS-2001/bor ed esegui, `bash stop.sh`

### 27. Come rimuovere le directory Heimdall e Bor {#27-to-remove-heimdall-and-bor-directories}

**Per i pacchetti Linux**:
Rimuovi Heimdall: `sudo rm -rf /etc/heimdall/*`

Rimuovi Bor: `sudo rm -rf /etc/bor/*`

**Per i binari**:

Rimuovi Heimdall: `sudo rm -rf /var/lib/heimdall/`

Rimuovi Bor: `sudo rm -rf /var/lib/bor`

### 28. Cosa fare quando ricevi l'errore "Block.Header.AppHash. errato" {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

Questo errore solitamente si verifica quando vengono esaurite le richieste Infura. Quando configuri un nodo su Polygon, aggiungi una chiave Infura al file di configurazione (Heimdall). Di default hai diritto a 100.000 richieste al giorno, se questo limite viene superato si verificherà questo tipo di problemi. Per risolverlo, puoi creare una nuova chiave API e aggiungerla al file `config.toml`.

:::tip Rimani informato

Non perderti gli ultimi aggiornamenti relativi ai nodi e ai validatori dal
team e dalla community di Polygon iscrivendoti ai
[gruppi di notifica di Polygon](https://polygon.technology/notifications/).

:::
