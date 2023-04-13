---
id: did-implementation
title: Implementación de la DID de Polygon
sidebar_label: Identity
description: Conoce sobre la implementación de la DID en Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Esta es una guía de inicio para los usuarios que deseen utilizar los paquetes de implementación publicados por el equipo de Polygon, para generar y publicar una DID de Polygon en el libro mayor de Polygon.

La implementación del método de la DID de Polygon consta de 3 paquetes, a saber: polygon-did-registrar, polygon-did-resolver y polygon-did-registry-contract. Un usuario que quiera incorporar la funcionalidad de registro o lectura de una DID en o desde la red de Polygon puede utilizar la siguiente guía.

Una DID es esencialmente un identificador único, que ha sido creado sin la presencia de una autoridad central. La DID en el contexto de las credenciales verificables se utiliza para firmar documentos, facilitándole al usuario probar que es el propietario del documento cuando sea necesario.

## Método de la DID de Polygon {#polygon-did-method}

La definición del método de la DID de Polygon se ajusta a las especificaciones y normas de DID-Core. Un URI tipo DID está formado por tres elementos separados por dos puntos, el esquema, seguido del nombre del método y, por último, un identificador específico del método. Para Polygon el URI se ve como:

```
did:polygon:<Ethereum address>
```

Aquí el esquema `did`es, el nombre del método es `polygon`y el identificador específico del método es una dirección .

## Implementación de la DID de Polygon {#polygon-did-implementation}

La DID de Polygon puede ser implementada con ayuda de dos paquetes, el usuario puede importar las respectivas bibliotecas de npm y utilizarlas para incorporar las metodologías de la DID de Polygon en sus respectivas aplicaciones. En la siguiente sección se ofrece más información de la implementación.

Para empezar, hay que crear una DID. La creación en el caso de la DID de Polygon es una encapsulación de dos pasos. En primer lugar, el usuario debe generar un URI tipo DID para sí mismo y luego registrarlo en el libro mayor de Polygon.

### Crea una DID {#create-did}

En tu proyecto para crear una URI DID  primero hay que instalar:

```
npm i @ayanworks/polygon-did-registrar --save
```

Una vez finalizada la instalación, el usuario puede utilizarla de la siguiente manera:

```
import { createDID } from "polygon-did-registrar";
```

La `createdDID`función ayuda a los usuarios a generar una URL DID Al crear una DID, puede haber dos escenarios.

  1. El usuario ya posee una billetera y desea generar una DID que corresponda a la misma billetera.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Si el usuario no tiene una billetera existente y quiere generar una, el usuario puede utilizar:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

El parámetro de la red en ambos casos se refiere a si el usuario quiere crear el DID en Polygon Mumbai Testnet o en Polygon Mainnet.

Entrada de muestra:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

Después de crear DID, tendrás una URI DID generada.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### Registrar DID {#register-did}

Para registrar el URI DID y el documento DID correspondiente en el libro mayor, el usuario primero debe utilizar de `polygon-did-registrar`la siguiente manera:

```js
import { registerDID } from "polygon-did-registrar";
```

Como requisito previo para registrar DID, el usuario debe asegurarse de que la billetera se corrsponding a la DID tenga el equilibrio de tokens necesario disponible. Una vez que el usuario tenga un saldo de token en la billetera, se puede hacer una llamada a la funcionalidad  como se muestra a continuación:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

Parámetros `did`y `privateKey`son obligatorios, mientras que es opcional entrar en el `url`.`contractAddress` Si el usuario no da los dos últimos parámetros, la biblioteca recoge las configuraciones por defecto de la red a partir del URI DID.

Si todos los parámetros coinciden con las especificaciones y todo se da en el orden correcto, la `registerDID`función devuelve un hash de transacción, se devuelve un error correspondiente de lo contrario.

Y con esto, has completado con éxito tu tarea de registrar un DID en la Red de Polygon.

## Resolución de una DID {#resolve-did}

Para comenzar, instala las siguientes bibliotecas:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Para leer el documento de una DID registrado en el libro mayor, cualquier usuario con un URI de Polygon tipo DID puede, primero, en su proyecto importar:

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

Después de importar los paquetes, el documento DID se puede recuperar mediante el uso:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

donde el `didResolutionResult`objeto es el siguiente:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Hay que tener en cuenta que el usuario no tendrá ningún costo de gas al tratar de resolver una DID.

## Actualización del documento de la DID {#update-did-document}

Para encapsular el proyecto con la capacidad de actualizar el documento DID, el usuario primero debe utilizar de `polygon-did-registrar`la siguiente manera:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

A continuación, llama a la función:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

Cabe señalar que para actualizar el documento DID solo el propietario de DID puede enviar la solicitud. La clave privada aquí también debe contener algunos tokens de MATIC correspondientes.

Si el usuario no proporciona la configuración con  `url`y `contractAddress`, la biblioteca recoge las configuraciones por defecto de la red desde el URI tipo DID.

## Eliminar el documento de la DID {#delete-did-document}

Con la implementación de Polygon DID un usuario también puede revocar su documento DID desde el libro mayor. El usuario primero debe utilizar de `polygon-did-registrar`la siguiente manera:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

Luego, debe usar:

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Entre los parámetros se destaca que `url`y `contractAddress`son parámetros opcionales que, de no proporcionarlos el usuario, la función basada en el URI tipo DID toma la configuración por defecto.

Es importante que la clave privada contenga los tokens de MATIC requeridos, según la configuración de red de la DID, para que la transacción no falle.

## Contribución al repositorio {#contributing-to-the-repository}

Utiliza el flujo de trabajo estándar de bifurcación, rama y solicitud de incorporación de cambios para proponer cambios en los repositorios. Por favor, haz los nombres de las sucursales informativos incluyendo el número de problema o el número de fallos, por ejemplo.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
