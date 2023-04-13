---
id: quicknode
title: Implementa un contrato inteligente utilizando
sidebar_label: Using QuickNode
description:  Despliega contratos inteligentes en Polygon mediante Brownie y Quicknode.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Descripción general {#overview}

Python es uno de los lenguajes de programación más versátiles; desde investigadores que ejecutan sus modelos de pruebas hasta desarrolladores que lo utilizan en entornos de producción pesada, cuenta con casos de uso en todos los campos técnicos posibles.

En este tutorial, aprenderás a utilizar el marco de [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) para escribir y desplegar un contrato inteligente mediante el uso [de](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) nodos de  para Polygon.

:::tip

Para comunicarte con el equipo de QuickNode, envíales un mensaje o etiquétalos en Twitter [@QuickNode](https://twitter.com/QuickNode).

:::

## Prerrequisitos {#prerequisites}

- Python3 instalado
- Un nodo Polygon
- Editor de código
- Interfaz de la línea de comando

## Qué vas a hacer {#what-you-will-do}

1. Configurar Brownie
2. Obtener acceso a los nodos de prueba de QuickNode
3. Compilar e implementar contratos inteligentes
4. Consulta los datos del contrato desplegados

## ¿Qué es Brownie? {#what-is-brownie}

El desarrollo de contratos inteligentes está dominado principalmente por bibliotecas basadas en JavaScript, como [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/) y [Hardhat](https://hardhat.org/). Python es un lenguaje versátil y altamente utilizado y también se puede utilizar para contratos inteligentes / desarrollo de Web3; [web3.py](https://web3py.readthedocs.io/en/stable/) es una biblioteca de Python convincente que satisface las necesidades de Web3. El marco de Brownie se basa en `web3.py`.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) es un marco basado en Python para desarrollar y someter a pruebas los contratos inteligentes. Brownie es compatible con contratos en Solidity y Vyper y además ofrece la posibilidad de someter a prueba los contratos mediante [Pytest](https://github.com/pytest-dev/pytest).

Para demostrar el proceso de escritura e implementación de contratos inteligentes con Brownie, usaremos [Brownie-mixes](https://github.com/brownie-mix), que son plantillas de proyectos. En concreto, usaremos una [mezcla de tokens](https://github.com/brownie-mix/token-mix) (token mix), que es una plantilla de implementación de ERC-20.

## Instala las dependencias {#install-dependencies}

Brownie se construye sobre  , por lo que necesitamos que se instale para trabajar con . Comprobemos si tenemos instalado  en nuestro sistema. Para ello, escribe lo siguiente en la herramienta de la línea de comandos:

```bash
python3 -V
```

Eso debería mostrar la versión de Python 3 instalada. Si no está instalada, descárgala e instálala desde el [sitio web oficial de Python](https://www.python.org/downloads/).

Crea un directorio del proyecto antes de instalar Brownie y configura el directorio de ese proyecto como el directorio de trabajo actual:

```bash
mkdir brownieDemo
cd brownieDemo
```

Ahora que tienes instalado Python 3 en el sistema, instala Brownie usando PIP, el administrador del paquete de Python. PIP es similar a lo que es NPM para JavaScript. Escribe lo siguiente en tu línea de comandos:

```bash
pip3 install eth-brownie
```

:::tip

Si la instalación falla, puedes utilizar el siguiente comando en su lugar:`sudo pip3 install eth-brownie`

:::

Para comprobar si Brownie se ha instalado correctamente, `brownie`escribe tu línea de comandos y debería dar la siguiente salida:

![img](/img/quicknode/brownie-commands.png)

Para obtener la mezcla de tokens, simplemente escribe lo siguiente en tu línea de comandos:

```
brownie bake token
```

Esto creará un nuevo directorio `token/`en nuestro `brownieDemo`directorio.

### Estructura de los archivos {#file-structure}

En primer lugar, navega hasta el `token`directorio:

```bash
cd token
```

Ahora, abre el `token`directorio en tu editor de texto. Bajo la `contracts/`carpeta que encontrarás , `Token.sol`que es nuestro contrato principal. Puedes escribir tus propios contratos o modificar el `Token.sol`archivo.

Debajo de la `scripts/`carpeta, encontrarás el script de `token.py`Python. Este script se utilizará para desplegar el contrato y las modificaciones se necesitan en función de los contratos.

![img](/img/quicknode/token-sol.png)

El contrato es un contrato ERC-20. Puedes aprender más sobre las normas y contratos ERC-20 en esta [guía en tokens ](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token).

## Arranque tu nodo Polygon {#booting-your-polygon-node}

QuickNode tiene una red global de nodos de  y  . También ejecutan un [RPC público gratuito](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) pero si te limita la tarifa, puedes inscribirte para un [nodo de prueba gratuito de QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Copia la **URL HTTP**, que será útil más adelante en el tutorial.

## Configuración de la red y de la cuenta {#network-and-account-setup}

Tenemos que configurar el terminal de QuickNode con Brownie. Para ello, escribe lo siguiente en tu línea de comandos:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Reemplaza con la **URL HTTP de**  que acabamos `YOUR_QUICKNODE_URL`de recibir mientras iniciamos nuestro nodo Polygon.

En el comando anterior, `Ethereum` es el nombre del entorno y `matic_mumbai` es el nombre personalizado de la red. Puedes darle el nombre que quieras a tu red personalizada.

Lo siguiente que debemos hacer aquí es crear una nueva billetera utilizando Brownie, para ello escribe lo siguiente en tu línea de comandos:

```
brownie accounts generate testac
```

¡Se te pedirá que configure una contraseña para tu cuenta! Después de completar los pasos, esto generará una cuenta junto con una frase mnemónica, guárdala sin conexión. El nombre `testac`es el nombre de nuestra cuenta (puedes elegir cualquier nombre que te guste).

![img](/img/quicknode/new-account.png)

:::note

Las frases Mnemonic se pueden utilizar para recuperar una cuenta o importar la cuenta a otras [<ins>billeteras no </ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode). La cuenta que ves en la imagen anterior se creó para esta guía.

:::

Copia la dirección de la cuenta para que podamos obtener alguna prueba de MATIC, que se requerirá para desplegar nuestro contrato.

## Obtención de  {#getting-testnet-matic}

Necesitaremos algunos tokens de prueba para pagar las tarifas de gas para desplegar nuestro contrato inteligente.

Copia la dirección de tu cuenta que generamos en este tutorial, pégala en el campo de dirección del [grifo de Polygon](https://faucet.polygon.technology/) y haz clic en **Enviar**. El grifo te enviará 0,2 MATIC de prueba.

![img](/img/quicknode/faucet.png)

## Implementar su contrato inteligente {#deploying-your-smart-contract}

Antes de desplegar el contrato, debes compilarlo utilizando los siguientes medios:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Ahora abre `scripts/token.py`el editor de texto y realiza los siguientes cambios:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Explicación

Utilizando el código anterior, hemos importado la `testac`cuenta que hemos creado anteriormente, y la hemos almacenado en `acct`variable. Además, en la siguiente línea, hemos editado `'from':`parte para recibir datos de `acct`variable.

:::

Finalmente, desplegaremos nuestro contrato inteligente:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`es el nombre de la red personalizada que hemos creado anteriormente. El aviso te pedirá la **contraseña** que configuramos anteriormente mientras hacemos la cuenta.

Después de ejecutar el comando anterior, deberías obtener el hash de la transacción y Brownie esperará hasta que se confirme la transacción. Una vez confirmada la transacción, se mostrará la dirección en la que se implementó el contrato en la red de pruebas Mumbai de Polygon.

![img](/img/quicknode/brownie-run.png)

Puedes revisar el contrato implementado copiando y pegando la dirección del contrato en [Polygonscan Mumbai](https://mumbai.polygonscan.com/).

![img](/img/quicknode/polygonscan.png)

## Pruebas del contrato {#testing-the-contract}

Brownie también ofrece la opción de someter a pruebas las funcionalidades de los contratos inteligentes. Este emplea el marco `pytest` para generar fácilmente pruebas de la unidad. Puedes encontrar más información sobre cómo escribir pruebas en Brownie [en la documentación](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#).

**Así se implementan los contratos en Polygon usando Brownie y QuickNode.**

QuickNode, al igual que Polygon, siempre ha tenido un enfoque de primera educación que ofrece [guías](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) de desarrolladores, [documentos](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [videos tutoriales](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) y una [comunidad de desarrolladores de Web3](https://discord.gg/DkdgEqE) que están ansiosos de ayudarse unos a otros.
