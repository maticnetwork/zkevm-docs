---
id: set-proof-api
title: Configuración de ProofApi
keywords:
    - setProofApi
    - polygon
    - sdk
description: Configura la API de prueba.
---

Algunas de las funciones en  se are con el término más rápido. Como su nombre lo sugiere, generan resultados más rápido en comparación con sus homólogos no rápidos. Lo hacen utilizando la API de generación de Proof como el backend que puede ser alojado por cualquier persona.

[https://apis/matic.network](https://apis/matic.network) es una API de generación de prueba disponible públicamente, organizada por Polygon.

El `setProofApi`método puede ayudar a configurar la URL de la API de generación de Pro en la instancia .

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

Utilizar un servicio de la API de generación de pro autónoma ofrecerá un mejor rendimiento en comparación con uno públicamente .

Sigue las instrucciones de instalación que se proporcionan en el archivo README.md de https://github.com/maticnetwork/proof-generation-api para organizar el servicio.

Por ejemplo, si desplegaste la API de prueba y el URL base es `https://abc.com/`, es necesario que establezcas el URL base en `setProofApi`

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
Recomendamos utilizar API más rápidas, ya que algunas de las API, en particular en las que se está generando pruebas, hacen muchas llamadas de RPC y podría ser muy lento con las de RPC públicas.
:::
