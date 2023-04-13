---
id: run-validator-binaries
title: Executar o nó do validador de Binários
sidebar_label: Using Binaries
description: Usar binários para configurar o nó do validador
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
Os passos neste guia envolvem a espera de que os serviços do H**eimdall **e do B**or **sejam sincronizados totalmente. Em alternativa, pode usar um snapshot com manutenção, que reduzirá o tempo de sincronização para poucas horas.
Para obter instruções detalhadas, ver [<ins>Instruções de snapshot para Heimdall e BOR</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Para links de download de instantâneos, consulte [<ins>Snapshots de Chains do Polygon</ins>](https://snapshot.polygon.technology/).

:::

Este guia irá orientá-lo através da execução de um nó de validador da Polygon de binários.

Para requisitos do sistema, siga o guia Requisitos do [Sistema de nó do](validator-node-system-requirements.md) Validador.

Se desejar iniciar e executar o nó do validador através do Ansible, consulte [Executar um nó do validador com](run-validator-ansible.md) Ansible.

:::caution

Há um espaço limitado para a aceitação de novos validadores. Os novos validadores só podem aderir ao conjunto ativo quando um validador já ativo não for obrigatório.

:::

## Pré-requisitos {#prerequisites}

* Duas máquinas — uma [sentry](/docs/maintain/glossary.md#sentry) e um [validador](/docs/maintain/glossary.md#validator).
* `build-essential` instalado nas máquinas sentry e validador.

  Para instalar:

  ```sh
  sudo apt-get install build-essential
  ```

* Go 1.18 instalado nas máquinas sentry e validador.

  Para instalar:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* O RabbitMQ instalado nas máquinas de sentinela e validador.

Aqui estão os comandos para instalar o RabbitMQ:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

Consulte mais informações sobre como baixar e instalar o RabbitMQ [<ins>aqui.</ins>](https://www.rabbitmq.com/download.html)

:::


:::info
Siga as [<ins>etapas</ins>](/maintain/validate/bloxroute.md) nas instruções do bloXroute para conectar seus nós aos gateways do bloXroute.
:::

## Visão geral {#overview}

Para chegar a um nó de validador em execução, realize o seguinte nesta **sequência exata de passos**:

:::caution

Irá deparar-se com problemas de configuração se estas etapas forem executadas fora da sequência.
É importante ter em mente que um nó sentry deve sempre ser configurado antes do nó de validador.

:::

1. Prepare duas máquinas, uma para o nó sentry e outra para nó de validador.
2. Instale os binários Heimdall e BOR nas máquinas sentry e de validador.
3. Configure os ficheiros de serviço Heimdall e BOR nas máquinas de sentry e de validador.
4. Configure os serviços Heimdall e BOR nas máquinas de sentry e de validador.
5. Configure o nó sentry.
6. Inicie o nó sentry.
7. Configure o nó de validador.
8. Defina as chaves do proprietário e do signatário.
9. Inicie o nó de validador.
10. Verifique o estado do nó com a comunidade.

## Instalar os binários {#installing-the-binaries}

Instalar os binários para as máquinas de sentry e de validador.

### Instalar Heimdall {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) é a camada de verificação proof-of-stake
responsável pelo checkpointing da representação dos blocos plasma para mainnet Ethereum.

A versão mais recente, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contém alguns aprimoramentos, como:
1. Restrição do tamanho dos dados em txs de sincronização de estado para:
    * **30Kb** quando representado em **bytes**
    * **60Kb** quando representado como **string**.
2. Aumento do **tempo de atraso** entre os eventos de contrato de diferentes validadores, para garantir que o mempool não é preenchido muito rapidamente em caso de uma sucessão de eventos que possam prejudicar o progresso da chain.

O exemplo a seguir mostra como o tamanho dos dados foi restringido:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Clonar o [repositório Heimdall](https://github.com/maticnetwork/heimdall/):

```sh
git clone https://github.com/maticnetwork/heimdall
```

Navegar até à [versão de lançamento](https://github.com/maticnetwork/heimdall/releases) correta:

```sh
git checkout RELEASE_TAG
```

onde `RELEASE_TAG` é a marca da versão de lançamento que se instala.

Por exemplo:

```sh
git checkout v0.3.0
```

Assim que estiver na versão correta, instale a Heimdall:

```sh
make install
source ~/.profile
```

Verifique a instalação Heimdall:

```sh
heimdalld version --long
```

:::note

Antes de prosseguir, Heimdall deve ser instalada nas máquinas de sentry e de validador.

:::

### Instalar BOR {#installing-bor}

[Bor](/docs/pos/bor) é o operador de sidechain que atua como camada de produção de blocos, que sincroniza com o Heimdall para selecionar produtores de blocos e verificadores para cada [extensão](/docs/maintain/glossary.md#span) e [sprint](/docs/maintain/glossary.md#sprint).

Clonar o [repositório BOR](https://github.com/maticnetwork/bor):

```sh
git clone https://github.com/maticnetwork/bor
```

Navegar até à [versão de lançamento](https://github.com/maticnetwork/bor/releases) correta:

```sh
git checkout RELEASE_TAG
```

onde `RELEASE_TAG` é a marca da versão de lançamento que se instala.

Por exemplo:

```sh
git checkout v0.3.3
```

Instalar BOR:

```sh
make bor-all
```

Criar links simbólicos:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Verificar a instalação BOR:

```sh
bor version
```

:::note

Antes de prosseguir, BOR deve ser instalado nas máquinas de sentry e de validador.

:::

## Configurar ficheiros de nó {#setting-up-node-files}

:::note

Ficheiros de nó precisam de ser configurados nas máquinas de sentry e de validador.

:::

### Obtenção do repositório de lançamento {#fetching-the-launch-repository}

Clonar o [repositório de lançamento](https://github.com/maticnetwork/launch):

```sh
git clone https://github.com/maticnetwork/launch
```

### Configurar o diretório de lançamento {#setting-up-the-launch-directory}

#### Na máquina sentry {#on-the-sentry-machine}

Criar um diretório `node`:

```sh
mkdir -p node
```

Copie os ficheiros e scripts do diretório `launch` para o diretório `node`:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### Na máquina validadora {#on-the-validator-machine}

Criar um diretório `node`:

```sh
mkdir -p node
```

Copie os ficheiros e roteiros do diretório `launch` para o diretório `node`:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### Configurar a rede de diretórios {#setting-up-the-network-directories}

:::note

Execute esta secção nas máquinas de sentry e de validador.

:::

#### Configurar Heimdall {#setting-up-heimdall}

Mudar para o diretório `node`:

```sh
cd ~/node/heimdall
```

Execute o roteiro de configuração:

```sh
bash setup.sh
```

#### Configurar BOR {#setting-up-bor}

Mudar para o diretório `node`:

```sh
cd ~/node/bor
```

Execute o roteiro de configuração:

```sh
bash setup.sh
```

## Configurar os serviços {#setting-up-the-services}

:::note

Execute esta secção nas máquinas de sentry e de validador.

:::

Navegar para o diretório `node`:

```sh
cd ~/node
```

Execute o roteiro de configuração:

```sh
bash service.sh
```

Copie o ficheiro de serviço para o diretório de sistema:

```sh
sudo cp *.service /etc/systemd/system/
```

## Configurar o nó de sentry {#configuring-the-sentry-node}

Comece por entrar na máquina sentry remota.

### Configurar os serviços Heimdall {#configuring-the-heimdall-services}

Abra o ficheiro de configuração Heimdall para editar:

```sh
vi ~/.heimdalld/config/config.toml
```

Em `config.toml`, altere os seguintes parâmetros:

* `moniker`— qualquer nome. Exemplo: `moniker = "my-sentry-node"`.
* `seeds`— os endereços de nó de semente que consistem numa identificação de nó, num endereço IP e numa porta.

  Use os seguintes valores:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex`— defina o valor `true` para permitir a troca entre pares. Exemplo: `pex = true`.
* `private_peer_ids`— a identificação de nó da Heimdall configurada na máquina validadora.

  Para obter a identificação de nó de Heimdall na máquina validadora:

  1. Inicie sessão na máquina validadora.
  2. Execute:
     ```sh
     heimdalld tendermint show-node-id
     ```

  Exemplo: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `true`— defina o valor `prometheus` para permitir as métricas do Prometheus. Exemplo: `prometheus = true`.
* `max_open_connections`— defina o valor para `100`. Exemplo: `max_open_connections = 100`.

Guarde as alterações em `config.toml`.

### Configurar o serviço BOR {#configuring-the-bor-service}

Abra o ficheiro de configuração BOR para editar:

```sh
`vi ~/node/bor/start.sh`
```

Em `start.sh`, adicione os endereços de nó de inicialização que consistem numa identificação de nó, num endereço IP e numa porta
adicionando a seguinte linha no final do ficheiro:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Guarde as alterações em `start.sh`.

### Configurar uma firewall {#configuring-a-firewall}

A máquina sentry deve ter as seguintes portas abertas para o mundo `0.0.0.0/0`:

* `26656`- O seu serviço Heimdall vai conectar o seu nó a outros nós usando o serviço Heimdall.

* `30303`- O seu serviço BOR vai conectar o seu nó a outros nós usando o serviço BOR.

* `22`- Para que o validador possa estabelecer conexão SSH de onde estiver.

## Iniciar o nó sentry {#starting-the-sentry-node}

Deve iniciar o serviço Heimdall primeiro. Assim que o serviço Heimdall sincroniza, iniciará o serviço BOR.

:::note

Como mencionado anteriormente, o serviço Heimdall leva vários dias para sincronizar totalmente a partir do zero.

Em alternativa, pode usar um snapshot com manutenção, que reduzirá o tempo de sincronização para poucas horas.
Para obter instruções detalhadas, ver [<ins>Instruções de snapshot para Heimdall e BOR</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Para obter links de download de snapshot, ver [Snapshot de Chains da Polygon.](https://snapshot.polygon.technology/)

:::

### Iniciar o serviço Heimdall {#starting-the-heimdall-service}

Inicie o serviço Heimdall:

```sh
sudo service heimdalld start
```

Inicie o servidor rest da Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Verifique os registos de serviço de Heimdall:

```sh
journalctl -u heimdalld.service -f
```

:::note

Nos registos, pode ver os seguintes erros:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Estes registos significam que um dos nós na rede recusou a conexão com o seu nó.
Aguarde que o seu nó rastreie mais nós na rede, não precisa de fazer nada
para abordar estes erros.

:::

Verifique os registos do servidor rest da Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Verifique o estado de sincronização da Heimdall:

```sh
curl localhost:26657/status
```

Na saída, o valor `catching_up` é:

* `true`— o serviço Heimdall está a sincronizar.
* `false`— o serviço Heimdall está totalmente sincronizado.

Aguarde que o serviço Heimdall sincronize totalmente.

### Iniciar o serviço BOR {#starting-the-bor-service}

Assim que o serviço Heimdall sincronizar, inicie o serviço BOR.

Inicie o serviço BOR:

```sh
sudo service bor start
```

Verifique os registos do serviço BOR:

```sh
journalctl -u bor.service -f
```

## Configurar o nó de validador {#configuring-the-validator-node}

:::note

Para concluir esta secção, é preciso ter um terminal RPC do seu nó de mainnet Ethereum totalmente sincronizado
já pronto.

:::

### Configurar o serviço Heimdall {#configuring-the-heimdall-service}

Faça login na máquina validadora remota.

Abra para editar `vi ~/.heimdalld/config/config.toml`.

Em `config.toml`, altere o seguinte:

* `moniker`— qualquer nome. Exemplo: `moniker = "my-validator-node"`.
* `pex`— defina o valor `false` para desativar a troca entre pares. Exemplo: `pex = false`.
* `private_peer_ids`— comente o valor para desativá-lo. Exemplo: `# private_peer_ids = ""`.

  Para obter a identificação do nó de Heimdall na máquina sentry:

  1. Faça login na máquina sentry.
  1. Execute `heimdalld tendermint show-node-id`.

Exemplo: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `true`— defina o valor `prometheus` permitir as métricas do Prometheus. Exemplo: `prometheus = true`.

Guarde as alterações em `config.toml`.

Abra para editar `vi ~/.heimdalld/config/heimdall-config.toml`.

Em `heimdall-config.toml`, altere o seguinte:

* `eth_rpc_url` — um terminal RPC para um nó mainnet Ethereum totalmente sincronizado,
i.e. Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Exemplo: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

Guarde as alterações em `heimdall-config.toml`.

### Configurar o serviço BOR {#configuring-the-bor-service-1}

Abra para editar `vi ~/.bor/data/bor/static-nodes.json`.

Em `static-nodes.json`, altere o seguinte:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — a identificação de nó e
o endereço IP da configuração de BOR na máquina sentry.

  Para obter a identificação do nó de BOR na máquina sentry:

  1. Faça login na máquina sentry.
  2. Execute `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Exemplo: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Guarde as alterações em `static-nodes.json`.

## Configurar a chave do proprietário e do signatário {#setting-the-owner-and-signer-key}

Na Polygon, recomenda-se que mantenha chaves diferentes do proprietário e do signatário.

* Signatário — o endereço que assina as
[transações de checkpoint](/docs/maintain/glossary.md#checkpoint-transaction). A recomendação é
manter pelo menos 1 ETH no endereço do signatário.
* Proprietário — o endereço que faz transações de staking. A recomendação é manter os tokens MATIC
no endereço do proprietário.

### Gerar uma chave privada Heimdall {#generating-a-heimdall-private-key}

Deve gerar uma chave privada Heimdall apenas na máquina validadora. Não gerar uma chave privada Heimdall
na máquina de sentry.

Para gerar a chave privada, execute:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

onde

* ETHEREUM_PRIVATE_KEY — a chave privada da carteira Ethereum.

Isto irá gerar `priv_validator_key.json`. Mova o ficheiro JSON gerado para o diretório de configuração
Heimdall:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Gerar um ficheiro BOR keystore {#generating-a-bor-keystore-file}

Deve gerar um ficheiro BOR keystore apenas na máquina validadora. Não gerar um ficheiro BOR keystore
na máquina sentry.

Para gerar a chave privada, execute:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

onde

* ETHEREUM_PRIVATE_KEY — a chave privada da carteira Ethereum.

Quando solicitado, configure uma senha para o ficheiro keystore.

Isto irá gerar um ficheiro keystore `UTC-<time>-<address>`.

Mova o ficheiro keystore gerado para o diretório de configuração do BOR:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Adicionar password.txt {#add-password-txt}

Crie um ficheiro `password.txt`ficheiro e, em seguida, adicione a palavra-passe do ficheiro BOR keystore no
`~/.bor/password.txt` ficheiro.

### Adicione o endereço Ethereum {#add-your-ethereum-address}

Abra para editar `vi /etc/matic/metadata`.

Em `metadata`, adicione o endereço Ethereum. Exemplo: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Guarde as alterações em `metadata`.

## Iniciar o nó de validador {#starting-the-validator-node}

Nesta altura, deve ter:

* O serviço Heimdall na máquina sentry sincroniza e está em execução.
* O serviço BOR na máquina sentry em execução.
* O serviço Heimdall e o serviço BOR na máquina validadora configurados.
* As suas chaves de proprietário e signatário configuradas.

### Iniciar o serviço Heimdall {#starting-the-heimdall-service-1}

Irá agora iniciar o serviço Heimdall na máquina validadora. Assim que a sincronização do serviço Heimdall for concluída,
irá iniciar o serviço BOR na máquina validadora.

Inicie o serviço Heimdall:

```sh
sudo service heimdalld start
```

Inicie o servidor rest da Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Inicie a ponte Heimdall:

```sh
sudo service heimdalld-bridge start
```

Verifique os registos de serviço de Heimdall:

```sh
journalctl -u heimdalld.service -f
```

Verifique os registos do servidor rest da Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Verifique os registos da ponte Heimdall:

```sh
journalctl -u heimdalld-bridge.service -f
```

Verifique o estado de sincronização da Heimdall:

```sh
curl localhost:26657/status
```

Na saída, o valor `catching_up` é:

* `true`— o serviço Heimdall está a sincronizar.
* `false` — o serviço Heimdall está sincronizado.

Aguarde que o serviço Heimdall sincronize totalmente.

### Iniciar o serviço BOR {#starting-the-bor-service-1}

Assim que o serviço Heimdall na máquina validadora estiver totalmente sincronizado, inicie o serviço BOR
na máquina validadora.

Inicie o serviço BOR:

```sh
sudo service bor start
```

Verifique os registos do serviço BOR:

```sh
journalctl -u bor.service -f
```

## Verificações de saúde com a comunidade {#health-checks-with-the-community}

Agora que os seus nós sentry e de validador estão em sincronia e em execução, vá para o
[Discord](https://discord.com/invite/0xPolygon) e peça à comunidade para verificar a saúde dos seus nós.

:::note

Como validadores, é obrigatório sempre ter uma verificação do endereço do assinante. Se o saldo do ETH atingir abaixo de 0,5 ETH, ele deve ser recarregado. Evitar isso irá expulsar nós da submissão de transações do checkpoint.

:::

## Próxima Etapa: Staking {#next-steps-staking}

Agora que o estado dos seus nós sentry e de validador foi verificado, prossiga para
o guia [Staking](/docs/maintain/validator/core-components/staking.md) para começar a apoiar a rede.
