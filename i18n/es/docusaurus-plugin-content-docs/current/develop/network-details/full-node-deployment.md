---
id: full-node-deployment
title: Ejecuta un nodo completo con Ansible
description: Despliega un nodo completo utilizando Ansible
keywords:
  - docs
  - polygon
  - matic
  - node
  - full node setup
  - ansible
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Este tutorial te guía a través de iniciar y ejecutar un nodo completo con el uso de Ansible.

Un [libro de reproducción visible](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) se utiliza para configurar y administrar un nodo completo. Consulta la guía de [requisitos técnicos mínimos](technical-requirements.md) para los requisitos del sistema.

:::tip

Pasos en esta guía implican la sincronización plena de los servicios de Heimdall y Bor. Este proceso demora varios días.

Alternativamente, puedes utilizar una instantánea mantenida, reduciendo el tiempo de sincronización a unas horas. Para obtener instrucciones detalladas, consulta [<ins>Instrucciones de instantánea para Heimdall y Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Para los enlaces de descarga de instantáneas, consulta la página [<ins>de instantáneas de las cadenas de</ins>](https://snapshot.polygon.technology/) Polygon.

:::

## Prerrequisitos  {#prerequisites}

- Instala Ansible en tu máquina local con Python3.x. La configuración no funcionará si tienes Python2.x.
    - Para instalar Ansible con Python 3.x, puedes utilizar Si no tienes pip en tu máquina, Sigue los pasos [descritos aquí](https://pip.pypa.io/en/stable/). Ejecuta `pip3 install ansible`para instalar Ansible.
- Revisa el [repositorio Ansible PoS](https://github.com/maticnetwork/node-ansible#requirements) de Polygon para requerimientos.
- También deberás asegurarte de que Go **no** esté instalado en tu entorno. Tendrás problemas si intentas configurar el nodo completo a través de Ansible con Go instalado, ya que Ansible requiere la instalación de paquetes específicos de Go.
- Verifica también que tu equipo o VM no tenga configuraciones previas del validador de Polygon, Heimdall o Bor. Elimínalas para evitar problemas con la configuración.

:::info Mejoras de la fuente

La última versión de Heimdall , **[v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)**, contiene algunas mejoras. El tiempo de retraso entre los eventos de los contratos de diferentes validadores **se ha aumentado** para garantizar que el  no se llena rápidamente en caso de una explosión de eventos que podrían obstaculizar el progreso de la cadena.

Además, el tamaño de los datos **se ha restringido en los tx de sincronización de estado a 30Kb (cuando se representa en bytes) y 60Kb (cuando se define como cadena)**. Por ejemplo:

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## Configuración completa del nodo {#full-node-setup}

- Asegúrate de tener acceso a la máquina remota o  en la que se está configurando el nodo completo.
  > Consulta   [para](https://github.com/maticnetwork/node-ansible#setup) obtener más información.
- Clona el repositorio [https://github.com/maticnetwork/node-ansible](https://github.com/maticnetwork/node-ansible).
- Navega a la carpeta ansible del nodo:`cd node-ansible`
- Edita el `inventory.yml`archivo e inserta tus IP en la `sentry->hosts`sección.
  > Consulta    [para](https://github.com/maticnetwork/node-ansible#inventory) obtener más información.
- Comprueba si la máquina remota es accesible ejecutando:`ansible sentry -m ping`
- Para probar si la máquina correcta está configurada, ejecuta el siguiente comando:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- A continuación, configura el nodo completo con este comando:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- En caso de que te encuentres con cualquier problema, elimina y limpia toda la configuración utilizando:
  ```
  ansible-playbook playbooks/clean.yml
  ```

- Una vez que inicies el libro de reproducción de Ansible, inicia sesión en la máquina remota.

- Nodos de semillas Heimdall:

  ```bash
  moniker=<enter unique identifier>

  # Mainnet:
  seeds="d3a8990f61bb3657da1664fe437d4993c4599a7e@3.211.248.31:26656,d3d7d397339c9126235dfab11bf925e269776f4f@3.212.183.151:26656,68254d33685fad151e45bfe1ed33d538ba6ec8cb@3.93.224.197:26656,d26c54ebbf274896f12977bb13d83ac1237a8226@184.73.124.158:26656,f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656"

  # Testnet:
  seeds="b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656,4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,7a6c7b5d25b13ce3448b047dbebeb1a19cc2e092@18.213.200.99:26656"
  ```
- Bootnodes:

  ```bash
  # Mainnet:
  bootnode ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]

  # Testnet:
  bootnodes ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]
  ```

- Para comprobar si Heimdall está sincronizado
    - En la máquina remota o VM, ejecuta `curl localhost:26657/status`
    - En la respuesta, el valor de `catching_up` debe ser `false`

- Una vez que Heimdall se sincroniza, ejecuta
    - `sudo service bor start`

Has configurado correctamente un nodo completo con Ansible.

:::note

Si Bor presenta un error de permiso para datos, ejecuta este comando para hacer del usuario de Bor el propietario de los archivos Bor:

```bash
sudo chown bor /var/lib/bor
```

:::
## Registros {#logs}

Los registros pueden ser gestionados por la herramienta `journalctl`. Aquí hay un tutorial para uso avanzado: [Cómo utilizar Journalctl para ver y manipular los registros de Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Revisa los registros del nodo de Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Comprueba los registros del servidor de Bor**

```bash
journalctl -u bor.service -f
```

## Configuración de puertos y firewall {#ports-and-firewall-setup}

Ábrele los puertos 22, 26656 y 30303 al mundo (0.0.0.0/0) en el cortafuegos del nodo centinela.

Puedes usar una VPN para restringir el acceso del puerto 22, según tus requisitos y pautas de seguridad.