---
id: plugin
title: Plugin
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Menggunakan plugin untuk menyuntikkan kode ke Matic.js.'
---

Menggunakan plugin yang Anda dapat menyuntikkan kode ke `matic.js`. Ini dapat digunakan untuk menulis set kode generik umum yang dapat disediakan kepada siapa pun yang menggunakan paket.

:::info

Plugin membuat `matic.js` menjadi ringan karena ini hanya mengimplementasikan bagian logika yang penting.

:::

Bahkan, pustaka web3 didukung menggunakan plugin yang memungkinkan kita menggunakan pustaka favorit.

### Pengembangan plugin {#plugin-development}

Plugin adalah kelas yang mengimplementasikan `IPlugin`.

```
import { IPlugin } from "@maticnetwork/maticjs";

export class MyPlugin implements IPlugin {

    // variable matic is - default export of matic.js
    setup(matic) {

        // get web3client
        const web3Client = matic.Web3Client ;
    }
}
```

Seperti yang terlihat - Anda hanya perlu mengimplementasikan metode `setup` yang akan dipanggil dengan ekspor `matic.js` default.

### Menggunakan Plugin {#use-plugin}

`matic.js` mengekspos metode `use` untuk menggunakan plugin.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

Anda dapat menggunakan beberapa plugin dan plugin akan dipanggil dengan urutan yang sama ketika disebutkan.

**Beberapa repo plugin adalah -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
