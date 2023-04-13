---
id: technical-faqs
title: Perguntas Técnicas Mais Frequentes
description: Perguntas frequentes relacionadas à execução de um Validador na rede Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - faqs
  - technical
slug: technical-faqs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 1. As chaves privadas são as mesmas para Heimdall e BOR Keystore? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}

Sim, a mesma chave privada é usada para gerar chaves do validador e BOR keystore. A chave privada usada nesta instância é o endereço ETH da sua carteira onde os tokens testnet da Polygon estão armazenados.

### 2. Lista de Comandos Comuns {#2-list-of-common-commands}

Atualmente, temos uma lista de fácil consulta para os pacotes Linux. Vamos continuar a atualizar esta lista regularmente para maior conveniência.

**Para pacotes Linux**

#### A. Onde encontrar o ficheiro de origem Heimdall {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. Onde encontrar heimdall-config.toml {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. Onde encontrar config.toml {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. Onde encontrar heimdall-seeds.txt {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Iniciar o Heimdall {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. Iniciar o servidor rest Heimdall {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. Iniciar o servidor bridge Heimdall {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Registos Heimdall {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Onde encontrar o ficheiro de origem BOR {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. Iniciar o BOR {#j-start-bor}

`sudo service bor start`

#### K Verificar os registos Heimdall {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Verificar o servidor rest Heimdall {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Verificar os registos bridge Heimdall {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. Verificar os registos BOR {#n-check-bor-logs}

`tail -f bor.log`

#### O. Eliminar o processo BOR {#o-kill-bor-process}

**Para Linux**:

1. `ps -aux | grep bor`. Obtenha o PID para a BOR e, então, execute os seguintes comandos.
2. `sudo kill -9 PID`

**Para Binários**:

Vá para `CS-2003/bor` e execute `bash stop.sh`

### 3. Error: Failed to unlock account (0x...) Sem chave para o endereço ou ficheiro fornecido {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

Este erro ocorre porque o caminho para o ficheiro password.txt está incorreto. Pode seguir as etapas abaixo para corrigir isso:

Este erro ocorre porque o caminho para o ficheiro password.txt e o repositório de ficheiros está incorreto. Pode seguir as etapas abaixo para corrigir isso:

1. Copie o ficheiro de armazenamento de chaves da BOR em

    /etc/bor/dataDir/keystore

2. E password.txt em

    /etc/bor/dataDir/

3. Verifique se adicionou o endereço correto em `/etc/bor/metadata`

Para Binários:

1. Copie o ficheiro de armazenamento de chaves da Bor em:

`/var/lib/bor/keystore/`

2. E password.txt em

`/var/lib/bor/password.txt`


### 4. Error: Wrong Block.Header.AppHash. Esperado xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

Isto geralmente ocorre devido a uma instalação incorreta de Heimdall. Pode seguir as etapas abaixo para corrigir isto:

execute

    ```heimdalld unsafe-reset-all```

e inicie os serviços Heimdall novamente. Pode consultar este guia - https://docs.polygon.technology/docs/validate/validate/run-validator

### 5. De onde eu posso criar a chave API? {#5-from-where-do-i-create-the-api-key}

Pode aceder a este link: [https://infura.io/register](https://infura.io/register). Certifique-se de, depois de ter configurado a conta e o projeto, copiar a chave API na Ropsten, não na Mainnet.

A Mainnet está selecionada por padrão.

### 6. A Heimdall não está em funcionamento. Estou a receber um erro de Panic {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**Erro real**: meu heimdalld não está em funcionamento. No registo, a primeira linha é:
panic: Unknown db_backend leveldb, expected either goleveldb or memdb or fsdb

Mude a configuração para `goleveldb` em `config.toml`.


### 7. Como excluir os vestígios da Heimdall e Bor? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Caso deseje excluir os resquícios da Heimdall a Bor, então, pode executar os seguintes comandos
Bor:

Para o pacote Linux:

```$ sudo dpkg -i matic-bor```

E exclua o diretório da Bor:

```$ sudo rm -rf /etc/bor```

Para Binários:

```$ sudo rm -rf /etc/bor```

E

```$ sudo rm /etc/heimdall```


### 8. Quantos validadores podem estar ativos, simultaneamente? {#8-how-many-validators-can-be-active-concurrently}

Existem até 100 validadores ativos de cada vez. Traremos mais participantes se o limite for atingido na metade do evento também. Observe que os validadores ativos são principalmente aqueles cujo tempo de atividade é alto. Os participantes com tempo de inatividade elevado serão expulsos.

### 9. Quanto devo ter em stake? {#9-how-much-should-i-stake}

"stake-amount" e "heimdall-fee-amount" - quanto deveria ser?

É necessário um mínimo de 10 tokens MATIC para o valor de stake em que a taxa da Heimdall deve ser superior a 10. Por exemplo, seu valor de stake é de 400, então a taxa da Heimdall deve ser de 20. Sugerimos manter a taxa da Heimdall como 20.

Entretanto, por favor, observe que os valores inseridos no valor de stake e no valor da taxa da Heimdall devem ser inseridos com 18 casas decimais

Por exemplo,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. Fui selecionado para me tornar um validador, mas meu endereço ETH estava incorreto. O que eu faço? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

Casso tenha acesso ao endereço ETH que enviou anteriormente, pode transferir os tokens de teste dessa conta para a conta atual. Depois, pode iniciar o processo de definição dos seus nós.

Caso não possa aceder a esse endereço ETH, não vamos transferir seus tokens separadamente. Pode registar-se novamente no formulário com o endereço ETH correto.

### 11. Recebo um erro ao iniciar a bridge {#11-i-m-getting-an-error-starting-the-bridge}

**Error**: Object "start" is unknown, try "bridge help". Posso continuar a ignorar isso?

Verifique "which bridge" - caso seja `/usr/sbin/bridge`, não está a executar a "bridge" correta.

Tente `~/go/bin/bridge`, ao invés de `(or $GOBIN/bridge)`


### 12. Recebo o erro dpkg {#12-i-m-getting-dpkg-error}

**Erro**: "dpkg: erro a processar o ficheiro matic-heimdall_1.0.0_amd64.deb (--install): a tentar sobrescrever '/heimdalld-rest-server.service', que também está no pacote matic-node 1.0.0"

Isto ocorre principalmente devido a uma instalação anterior de Polygon na sua máquina. Para resolver, pode executar:

`sudo dpkg -r matic-node`


### 13. Não está claro em qual Chave Privada devo adicionar ao gerar uma chave validadora {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

A Chave Privada a ser utilizada é o seu endereço de Carteira ETH, onde seus tokens Polygon testnet são armazenados. Pode completar a configuração com um par de chaves público-privadas vinculadas ao endereço enviado no formulário.


### 14. Existe algum modo de saber se a Heimdall está sincronizada? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

Pode executar o seguinte comando para verificar isso:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

Verifique o valor de catching_up. Se for falso, então o nó está totalmente sincronizado.


### 15. E se uma pessoa se tornar um staker Top 10, como ela receberá sua recompensa MATIC no final? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

As recompensas de Estágio 1 não são baseadas em stakes. Por favor, consulte https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ para detalhes sobre a recompensa. Os participantes com stake elevado não se qualificam automaticamente para uma recompensa neste estágio.


### 16. Qual deve ser a minha versão da Heimdall? {#16-what-should-be-my-heimdall-version}

Para verificar a sua versão da Heimdall, basta executar:

```heimdalld version```

A versão correta da Heimdall para o estágio 1 deve ser `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. Que valores devo adicionar ao valor do stake e valor da taxa? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

É necessário um mínimo de 10 tokens MATIC para o valor de stake em que a taxa da Heimdall deve ser superior a 10. Por exemplo, seu valor de stake é de 400, então a taxa da Heimdall deve ser de 20. Sugerimos manter a taxa da Heimdall como 20.

Entretanto, por favor, observe que os valores inseridos no valor de stake e no valor da taxa da Heimdall devem ser inseridos com 18 casas decimais

Por exemplo,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. Qual é a diferença entre `/var/lib/heimdall` e `/etc/heimdall?`

`/var/lib/heimdall` é o dir heimdall quando usa o método de instalação binário. `/etc/heimdall` é para o método de instalação de pacote Linux.


### 19. Quando faço a transação de stake, recebo o erro "Gas Exceeded" {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

Este erro pode ocorrer devido ao formato do valor do stake ou da taxa. Os valores inseridos durante o comando de stake devem ter 18 casas decimais.

Entretanto, por favor, observe que os valores inseridos no valor de stake e no valor da taxa da Heimdall devem ser inseridos com 18 casas decimais

Por exemplo,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. Quando terei a chance de me tornar um Validador? {#20-when-will-i-get-a-chance-to-become-a-validator}

Estamos a adicionar progressivamente validadores ao longo do curso do evento de Estágio 1. Vamos, gradualmente, lançar uma lista de novos validadores externos. Esta lista será anunciada no canal Discord.


### 21. Onde posso encontrar a localização de informações da conta da Heimdall? {#21-where-can-i-find-heimdall-account-info-location}

Para Binários:

    /var/lib/heimdall/config folder

Para o pacote Linux:

    /etc/heimdall/config


### 22. Em que arquivo devo adicionar a chave API? {#22-which-file-do-i-add-the-api-key-in}

Depois de ter criado a chave API, precisa adicionar a chave API no ficheiro `heimdall-config.toml`.


### 23. Em que ficheiro devo adicionar o persistent_peers? {#23-which-file-do-i-add-the-persistent_peers}

Pode adicionar o persistent_peers ao seguinte arquivo:

    /var/lib/heimdall/config/config.toml


### 24. “Redefiniu o Tendermint sem redefinir os dados da sua aplicação?” {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

Neste caso, pode redefinir dados de config. da Heimdall e tentar executar a instalação novamente.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Error: Unable to unmarshall config Error 1 error(s) decoding {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

Error: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

Isso ocorre principalmente porque há erros de digitação, algumas partes ausentes ou um ficheiro de config. que ainda é um resquício. Terá de limpar todos os resquícios e tentar configurá-lo novamente.

### 26.  Para parar os serviços da Heimdall e Bor {#26-to-stop-heimdall-and-bor-services}

**Para pacotes Linux**:

Parar Heimdall: `sudo service heimdalld stop`

Parar Bor: `sudo service bor stop` ou

1. `ps -aux | grep bor`. Obtenha o PID para a BOR e, então, execute os seguintes comandos.
2. `sudo kill -9 PID`

**Para Binários**:

Parar Heimdall: `pkill heimdalld`

Parar Bridge: `pkill heimdalld-bridge`

Parar Bor: vá para CS-2001/bor e, então, execute `bash stop.sh`

### 27. Para remover os diretórios Heimdall e Bor {#27-to-remove-heimdall-and-bor-directories}

**Para pacotes Linux**:
Excluir a Heimdall: `sudo rm -rf /etc/heimdall/*`

Excluir a Bor: `sudo rm -rf /etc/bor/*`

**Para Binários**:

Excluir a Heimdall: `sudo rm -rf /var/lib/heimdall/`

Excluir a Bor: `sudo rm -rf /var/lib/bor`

### 28. O que fazer quando obtém o erro "Wrong Block.Header.AppHash" {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

Este erro geralmente ocorre devido a excesso de solicitações da Infura. Ao configurar um nó na Polygon, adicione uma chave Infura ao arquivo Config (Heimdall). Por padrão, é possível permitir 100 mil Solicitações por dia; caso esse limite seja ultrapassado, então ocorreriam tais problemas. Para resolver isto, pode criar uma nova chave API e adicionar ao ficheiro `config.toml`.

:::tip Mantenha-se informado

Manter-se a par das últimas atualizações sobre nós e validadores da
da equipa e comunidade da Polygon subscrevendo os [Grupos de notificação da Polygon](https://polygon.technology/notifications/).

:::
