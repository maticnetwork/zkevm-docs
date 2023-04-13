---
id: tutorial-template
title: Plantilla de Tutorial General
sidebar_label: Tutorial template
description: Sigue la plantilla de tutorial al redactar un tutorial técnico.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - tutorial
  - contribute
  - template
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: tutorial-template
---

Esta plantilla debe usarse cuando contribuyas con un tutorial a Polygon Wiki. Puedes elegir contribuir con un tutorial sobre un tema de tu elección.

## Guías generales {#general-guidelines}

* El ámbito del tutorial debe quedar claro desde el título.
* El tutorial debe ser capaz de describir con precisión las características y funcionalidades de los productos o servicios.
* Trata de mantener el tutorial fluido y conciso, pero expande en los conceptos clave donde sea apropiado. Proporciona información de antecedentes y más contexto cuando sea posible.
* Para la configuración e implementación de los pasos, sé específico.
* Haz todo lo posible para agregar imágenes, iconos o capturas de pantalla de apoyo que complementen el contenido escrito.
  > El equipo de documentación también estaría encantado de trabajar contigo en la creación de diagramas.
* Recuerda la audiencia para quien escribes. Si el material tiene un cierto nivel de dificultad debes ser mencionarlo en el tutorial.
  > Si hay pasos que un usuario debe dar antes de repasar un tutorial, por favor enuméralos.
* El equipo de documentación estaría encantado de colaborar en la creación de un tutorial.
* Recuerda considerar la **[guía de Estilo](writing-style.md)**.

:::caution Actualización de los tutoriales existentes

Si notas que los tutoriales existentes en el Polygon Wiki no usan esta plantilla es porque el equipo de documentación decidió implementar un estándar, por lo que el flujo tutorial es consistente con todos los tutoriales. El equipo está trabajando en la actualización de estos tutoriales para que se parezcan a esta plantilla. Si estás interesado, también puedes actualizar un tutorial existente para reestructurarlo.

:::

## Secciones del tutorial {#tutorial-sections}

### Resumen {#overview}

Explica el/los producto(s) o servicio(s) sobre el/los que versa el tutorial. Facilita información de antecedentes para el propósito del tutorial y explica lo que el tutorial pretende presentar. El tutorial debe estar siempre basado en el uso de un producto Polygon.

### Lo que aprenderás {#what-you-ll-learn}

Resume lo que el usuario aprenderá a lo largo del tutorial.

:::note Ejemplo

Explorarás cómo usar la Suite Truffle para construir aplicaciones descentralizadas Polygon.

:::

#### Resultados del aprendizaje {#learning-outcomes}

Describe los resultados del aprendizaje.

:::note Ejemplo

1. Aprenderás sobre la Fauna.
2. Aprenderás cómo puedes usar ReactJS para la interfaz de usuario de tu aplicación descentralizada.
3. Aprenderás cómo proteger los datos de tu aplicación descentralizada.

:::

Menciona los prerrequisitos y con lo que el usuario ya debe de estar familiarizado. Enlaza la documentación necesaria para las áreas sobre las que el usuario ya debe de estar bien informado.

:::note Ejemplo

Antes de comenzar este tutorial debes entender los fundamentos del desarrollo de la aplicación descentralizada basada en EVM. Para obtener más información, consulta "estos documentos".

:::

### Lo que harás {#what-you-ll-do}

Describe los pasos en el tutorial y las herramientas que se van a utilizar.

:::note Ejemplo

Utilizarás Solidity para crear un contrato inteligente en un entorno de ChainIDE.

1. Configurar una billetera
2. Escribe un contrato inteligente ERC-721
3. Compila un contrato inteligente ERC-721
4. Despliega un contrato inteligente ERC-721
5. Crea un archivo aplanado utilizando la biblioteca de Flattener
6. Verifica un contrato inteligente
7. Acuñando NFT

:::

### El tutorial en sí mismo {#the-tutorial-itself}

En general, el tutorial puede ser presentado en la mejor categorización que si el escritor lo considera conveniente; esto debe reflejarse en la sección [que harás](#what-youll-do)
. Sin embargo, el tutorial debería referirse a estas tres categorías principales:

> Asegúrate de considerar las palabras clave y ten en cuenta el SEO cuando llegues a las secciones.

#### Construye tu aplicación {#build-your-application}

El principal contenido del tutorial. Este puede incluir secciones como "instalación", "configuración", e "implementación" para mencionar algunos.

#### Ejecuta o despliega tu aplicación {#run-or-deploy-your-application}

Explica cómo el usuario debe ejecutar o desplegar su aplicación.

#### Prueba tu aplicación {#test-your-application}

Estas podrían ser las pruebas escritas para un contrato inteligente, verificación de un contrato inteligente, etc.

### Siguientes pasos {#next-steps}

Concluye el tutorial y reflexiona sobre los resultados del aprendizaje. Describe los siguientes pasos que el usuario puede dar.

:::note Ejemplo

Enhorabuena por desplegar tu contrato inteligente. Ahora sabes cómo utilizar ChainIDE para crear y desplegar contratos inteligentes. Considera probar "este tutorial".

:::
