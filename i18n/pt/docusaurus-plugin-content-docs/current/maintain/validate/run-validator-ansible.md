---
id: run-validator-ansible
title: Executar o nó do validador com Ansible
sidebar_label: Using Ansible
description: Usar o Ansible para configurar o nó do validador no Polygon
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
Os passos deste guia incluem aguardar que os serviços **Heimdall** e **BOR** sejam totalmente sincronizados. Este processo leva vários dias para ser concluído. Em alternativa, pode usar um snapshot com manutenção, que reduzirá o tempo de sincronização para poucas horas. Para obter instruções detalhadas, ver [<ins>Instruções de snapshot para Heimdall e BOR</ins>](/docs/operate/snapshot-instructions-heimdall-bor).

Para links de download de instantâneos, consulte [<ins>Snapshots de Chains do Polygon</ins>](https://snapshot.polygon.technology/).
:::

Esta secção orienta sobre como iniciar e executar o nó de validador através de um manual da Ansible.

Para requisitos do sistema, ver [Requisitos de sistema de nó de validador](validator-node-system-requirements.md).

Se quiser começar e executar o nó de validador de binários, veja [Executar um Nó de Validador de Binários](run-validator-binaries.md).

:::caution

Há um espaço limitado para a aceitação de novos validadores. Os novos validadores só podem aderir ao conjunto ativo quando um validador já ativo não for obrigatório.

:::

## Pré-requisitos {#prerequisites}

* Três máquinas — uma máquina local onde executa o manual da Ansible; duas máquinas remotas — uma [sentry](/docs/maintain/glossary.md#sentry) e um [validador](/docs/maintain/glossary.md#validator).
* Na máquina local, foi instalado o [Ansible](https://www.ansible.com/).
* Na máquina local, foi instalado o [Python 3.x](https://www.python.org/downloads/).
* Nas máquinas remotas, certifique-se de que o Go *não* está instalado.
* Nas máquinas remotas, a chave pública de SSH da sua máquina local está nas máquinas remotas para permitir que o Ansible se conecte a elas.
* Temos o Bloxroute disponível como uma rede de relés. Se precisar de um gateway para ser adicionado como seu Peer Confiável, entre em contato **com @equipe de suporte de validador** no [Polygon Discord](https://discord.com/invite/0xPolygon) > VALIDADORES DE POS | FORNECEDORES DE NODOS COMPLETO | PARCEIROS > bloxroute.

:::info

Siga as [<ins>etapas</ins>](/maintain/validate/bloxroute.md) nas instruções do bloXroute para conectar seus nós aos gateways do bloXroute.

:::

## Visão geral {#overview}

:::caution

Deve seguir a **sequência exata de ações** delineada, caso contrário, irá executar problemas. Por exemplo, **um nó do sentinela deve ser sempre configurado antes do nó do validador**.

:::

Para chegar a um nó de validador em execução, faça o seguinte:

1. Tenha as três máquinas preparadas.
1. Configure um nó sentry através do Ansible.
1. Configure um nó de validador através do Ansible.
1. Configure o nó sentry.
1. Inicie o nó sentry.
1. Configure o nó de validador.
1. Defina as chaves do proprietário e do signatário.
1. Inicie o nó de validador.
1. Verifique o estado do nó com a comunidade.

## Configure o nó sentry {#set-up-the-sentry-node}

Na sua máquina local, faça o clone do [repositório nó-ansible](https://github.com/maticnetwork/node-ansible):

```sh
git clone https://github.com/maticnetwork/node-ansible
```

Mude para o repositório clonado:

```sh
cd node-ansible
```

Adicione os endereços IP das máquinas remotas que se tornarão um nó sentry e um nó de validador para o ficheiro `inventory.yml`.

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

Exemplo:

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

Verifique se a máquina sentry remota é alcançável. Na máquina local, execute:

```sh
$ ansible sentry -m ping
```

Deverá obter isto como resultado:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Faça um teste de configuração do nó sentry:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

Este será o resultado:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Execute a configuração do nó sentry com privilégios sudo:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

Assim que a configuração for concluída, receberá uma mensagem de conclusão no terminal.

:::note

Se tiver algum problema e quiser reiniciar, execute:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## Configure o nó de validador {#set-up-the-validator-node}

Nesta altura, o nó sentry já está configurado.

Na sua máquina local, também tem um manual Ansible configurado para executar a configuração do nó de validador.

Verifique se a máquina validadora remota é alcançável. Na máquina local, execute `ansible validator -m ping`.

Deverá obter isto como resultado:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Faça um teste da configuração do nó de validador:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

Deverá obter isto como resultado:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Execute a configuração do nó de validador com privilégios sudo:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

Assim que a configuração for concluída, receberá uma mensagem de conclusão no terminal.

:::note

Se tiver algum problema e quiser reiniciar, execute:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## Configure o nó sentry {#configure-the-sentry-node}

Faça login na máquina sentry remota.

### Configure o Serviço Heimdall {#configure-the-heimdall-service}

Abra `config.toml` para editar `vi ~/.heimdalld/config/config.toml`.

Mude o seguinte:

* `moniker`— qualquer nome. Exemplo: `moniker = "my-full-node"`.
* `seeds`— os endereços de nó de semente que consistem numa identificação de nó, num endereço IP e numa porta.

  Use os seguintes valores:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex`— defina o valor `true` para permitir a troca entre pares. Exemplo: `pex = true`.
* `private_peer_ids`— a identificação de nó da Heimdall configurada na máquina validadora.

  Para obter a identificação de nó de Heimdall na máquina validadora:

  1. Faça login na máquina validadora.
  1. Execute `heimdalld tendermint show-node-id`.

  Exemplo: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `true`— defina o valor `prometheus` para permitir as métricas do Prometheus. Exemplo: `prometheus = true`.
* `max_open_connections`— defina o valor para `100`. Exemplo: `max_open_connections = 100`.

Guarde as alterações em `config.toml`.

### Configure o Serviço BOR {#configure-the-bor-service}

Abra para editar `vi ~/node/bor/start.sh`.

Em `start.sh`, adicione os endereços de nó de inicialização que consistem numa identificação de nó, num endereço IP e numa porta adicionando a seguinte linha no final:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Guarde as alterações em `start.sh`.

Abra para editar `vi ~/.bor/data/bor/static-nodes.json`.

Em `static-nodes.json`, altere o seguinte:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"`— a identificação de nó e o endereço IP de configuração de BOR na máquina validadora.

  Para obter a identificação de nó de BOR na máquina validadora:

  1. Faça login na máquina validadora.
  1. Execute `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Exemplo: `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

Guarde as alterações em `static-nodes.json`.

### Configure a firewall {#configure-firewall}

A máquina sentry deve ter as seguintes portas abertas para o mundo `0.0.0.0/0`:

* 26656- O seu serviço Heimdall irá conectar o seu nó a outros nós usando o serviço Heimdall.

* 30303- O seu serviço BOR irá conectar o seu nó a outros nós usando o serviço BOR.

* 22- Para que o validador possa estabelecer conexão SSH de onde estiver.

:::note

No entanto, se usam uma conexão VPN, podem permitir conexões SSH recebidas apenas a partir do endereço IP da VPN.

:::

## Inicie o nó sentry {#start-the-sentry-node}

Deve iniciar o serviço Heimdall primeiro. Assim que o serviço Heimdall sincroniza, iniciará o serviço BOR.

:::note

O serviço Heimdall leva vários dias para sincronizar totalmente do zero.

Em alternativa, pode usar um snapshot com manutenção, que reduzirá o tempo de sincronização para poucas horas. Para obter instruções detalhadas, ver [<ins>Instruções de snapshot para Heimdall e BOR</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Para obter links de download de snapshot, ver [Snapshots de Chains da Polygon](https://snapshot.polygon.technology/).

:::

### Inicie o Serviço Heimdall {#start-the-heimdall-service}

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

Isto significa que um dos nós da rede recusou uma conexão com o seu nó. Pode ignorar esses erros. Aguarde o seu nó rastrear mais nós na rede.

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

### Inicie o serviço BOR {#start-the-bor-service}

Assim que o serviço Heimdall estiver totalmente sincronizado, inicie o serviço BOR.

Inicie o serviço BOR:

```sh
sudo service bor start
```

Verifique os registos do serviço BOR:

```sh
journalctl -u bor.service -f
```

## Configure o nó de validador {#configure-the-validator-node}

:::note

Para concluir esta secção, é preciso ter um terminal RPC do seu nó de mainnet Ethereum totalmente sincronizado já pronto.

:::

### Configure o Serviço Heimdall {#configure-the-heimdall-service-1}

Entre na sua máquina validadora remota.

Abra `config.toml` para editar `vi ~/.heimdalld/config/config.toml`.

Mude o seguinte:

* `moniker`— qualquer nome. Exemplo: `moniker = "my-validator-node"`.
* `pex`— defina o valor `false` para desativar a troca entre pares. Exemplo: `pex = false`.
* `private_peer_ids`— comente o valor para desativá-lo. Exemplo: `# private_peer_ids = ""`.


  Para obter a identificação do nó de Heimdall na máquina sentry:

  1. Entre na máquina sentry.
  1. Execute `heimdalld tendermint show-node-id`.

  Exemplo: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `true`— defina o valor `prometheus` para permitir as métricas do Prometheus. Exemplo: `prometheus = true`.

Guarde as alterações em `config.toml`.

Abra para editar `vi ~/.heimdalld/config/heimdall-config.toml`.

Em `heimdall-config.toml`, altere o seguinte:

* `eth_rpc_url`— um terminal RPC para um nó mainnet Ethereum totalmente sincronizado, i.e Infura.`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Exemplo: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


Guarde as alterações em `heimdall-config.toml`.

### Configure o Serviço BOR {#configure-the-bor-service-1}

Abra para editar `vi ~/.bor/data/bor/static-nodes.json`.

Em `static-nodes.json`, altere o seguinte:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"`— a identificação do nó e o endereço IP da configuração de BOR na máquina sentry.

  Para obter a identificação do nó de BOR na máquina sentry:

  1. Entre na máquina sentry.
  1. Execute `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Exemplo: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Guarde as alterações em `static-nodes.json`.

## Defina as chaves de proprietário e signatário {#set-the-owner-and-signer-key}

Na Polygon, as chaves do proprietário e signatário devem ser diferentes.

* Signatário — o endereço que assina as [transações de checkpoint](../glossary#checkpoint-transaction). A recomendação é manter, pelo menos, 1 ETH no endereço do signatário.
* Proprietário — o endereço que faz transações de staking. A recomendação é manter os tokens MATIC no endereço do proprietário.

### Gerar uma chave privada Heimdall {#generate-a-heimdall-private-key}

Deve gerar uma chave privada Heimdall apenas na máquina validadora. **Não deve gerar uma chave privada Heimdall na máquina sentry.**

Para gerar a chave privada, execute:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

Ethereum_PRIVATE_KEY — chave privada da carteira Ethereum

:::

Isto irá gerar `priv_validator_key.json`. Mova o ficheiro JSON gerado para o diretório de configuração Heimdall:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Gerar um ficheiro BOR keystore {#generate-a-bor-keystore-file}

Deve gerar um ficheiro BOR keystore apenas na máquina validadora. **Não deve gerar um ficheiro BOR keystore na máquina sentry.**

Para gerar a chave privada, execute:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — a chave privada da carteira Ethereum.

:::

Quando solicitado, configure uma senha para o ficheiro keystore.

Isto irá gerar um ficheiro keystore `UTC-<time>-<address>`.

Mova o ficheiro keystore gerado para o diretório de configuração do BOR:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Adicionar`password.txt`

Crie um ficheiro `password.txt` e, em seguida, adicione a palavra-passe do ficheiro BOR keystore no ficheiro `~/.bor/password.txt`.

### Adicione o endereço Ethereum {#add-your-ethereum-address}

Abra para editar `vi /etc/matic/metadata`.

Em `metadata`, adicione o endereço Ethereum. Exemplo: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Guarde as alterações em `metadata`.

## Inicie o nó de validador {#start-the-validator-node}

Nesta altura, deve ter:

* O serviço Heimdall na máquina sentry totalmente sincronizado e em execução.
* O serviço BOR na máquina sentry em execução.
* O serviço Heimdall e o serviço BOR na máquina validadora configurados.
* As suas chaves de proprietário e signatário configuradas.

### Inicie o Serviço Heimdall {#start-the-heimdall-service-1}

Irá agora iniciar o serviço Heimdall na máquina validadora. Assim que a sincronização do serviço Heimdall for concluída, irá iniciar o serviço BOR na máquina validadora.

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
* `false`— o serviço Heimdall está totalmente sincronizado.

Aguarde que o serviço Heimdall sincronize totalmente.

### Inicie o serviço BOR {#start-the-bor-service-1}

Assim que o serviço Heimdall na máquina validadora estiver totalmente sincronizado, inicie o serviço BOR na máquina validadora.

Inicie o serviço BOR:

```sh
sudo service bor start
```

Verifique os registos do serviço BOR:

```sh
journalctl -u bor.service -f
```

## Verifique o estado do nó com a comunidade {#check-node-health-with-the-community}

Agora que os seus nós sentry e de validador estão sincronizados e em execução, vá para o [Discord](https://discord.com/invite/0xPolygon) e peça à comunidade para verificar o estado dos seus nós.

:::note

Como validadores, é obrigatório sempre ter uma verificação do endereço do assinante. Se o saldo do ETH atingir abaixo de 0,5 ETH, ele deve ser recarregado. Evitar isso irá expulsar nós da submissão de transações do checkpoint.

:::

## Prossiga para o staking {#proceed-to-staking}

Agora que o estado dos seus nós sentry e de validador foi verificado, prossiga para o [staking](/docs/maintain/validator/core-components/staking).
