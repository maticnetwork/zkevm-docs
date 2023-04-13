---
id: mapping-assets
title: Memetakan Aset Menggunakan POS
description: "Memetakan aset dari Polygon ke Ethereum."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### Pengantar {#introduction}

Pemetaan diperlukan untuk mentransfer aset Anda ke dan dari Ethereum dan Polygon.

- **Rantai root** :: mengacu pada Mainnet Goerli atau Ethereum Mainnet
- **Rantai anak** :: mengacu pada Polygon Mumbai atau Mainnet Polygon

Jika Anda sudah menyebarkan kontrak token di rantai Root dan ingin memindahkannya ke rantai Anak, maka Anda harus mengikuti panduan ini, tetapi jika Anda ingin menyebarkan kontrak di Mainnet Polygon terlebih dahulu, buat token di rantai Anak dahulu, kemudian pindahkan kembali ke rantai Root. Maka Anda harus mengikuti [panduan](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets) ini.

## Token Anak Standar {#standard-child-token}

Jika Anda hanya memerlukan kontrak ERC20/ERC721/ERC1155 standar, maka Anda dapat melanjutkan dan mengirim permintaan pemetaan di https://mapper.polygon.technology/ dan kami akan menyebarkan kontrak token secara otomatis untuk Anda.

Kontrak Token Anak Standar akan terlihat seperti ini:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

Silakan kunjungi [tautan](/docs/develop/ethereum-polygon/submit-mapping-request) ini untuk memahami cara membuat permintaan pemetaan yang baru.

## Token Anak Kustom {#custom-child-token}

Jika Anda membutuhkan kontrak token anak kustom yang memiliki fungsi tambahan selain fungsi standar, **maka Anda harus menyebarkan kontrak token di rantai Anak** dan mengirimkan permintaan pemetaan [di sini](https://mapper.polygon.technology/), lalu menyertakan alamat kontrak token anak yang telah disebarkan. Mari kita bahas contoh pembuatan kontrak token anak kustom.

**Kontrak anak kustom harus mengikuti pedoman tertentu sebelum Anda menyebarkannya di rantai anak.**

Metode `deposit` harus ada dalam kontrak anak kustom. Fungsi ini dipanggil oleh kontrak `ChildChainManagerProxy` setiap kali penyetoran dimulai dari rantai root. Fungsi setor ini secara internal membuat token di rantai anak.

Metode `withdraw` harus ada dalam kontrak anak kustom. Metode tersebut dapat dipanggil untuk membakar token di rantai anak. Pembakaran adalah langkah pertama proses penarikan. Fungsi penarikan ini akan membakar token secara internal di rantai anak.

Aturan ini harus diikuti untuk menjaga keseimbangan aset antara dua rantai.

:::note

Tidak ada penambangan token dalam konstruktor kontrak token anak.

:::

#### Implementasi {#implementation}

Karena kita sudah membahas _mengapa_ kita perlu menerapkan metode `deposit` & `withdraw` dalam kontrak token anak, maka kini kita dapat melanjutkan untuk mengimplementasikannya.

```js title="ChildERC20.sol"
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChildERC20 is ERC20,
{
    using SafeMath for uint256;

    constructor(string memory name, string memory symbol, uint8 decimals) public ERC20(name, symbol) {

        _setupDecimals(decimals);
        // can't mint here, because minting in child chain smart contract's constructor not allowed
        // _mint(msg.sender, 10 ** 27);

    }

    function deposit(address user, bytes calldata depositData) external {
        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _totalSupply = _totalSupply.add(amount);
        _balances[user] = _balances[user].add(amount);

        emit Transfer(address(0), user, amount);
    }

    function withdraw(uint256 amount) external {
        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(msg.sender, address(0), amount);
    }

}
```

Satu hal yang mungkin Anda perhatikan dalam sampel kode di atas yakni fungsi `deposit` dapat dipanggil oleh siapa pun, hal ini tidak boleh terjadi. Untuk mencegah hal ini, kita harus memastikan bahwa fungsi tersebut hanya dapat dipanggil oleh `ChildChainManagerProxy`. (ChildChainManagerProxy - di [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) , di [Mainnet Polygon](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/))

```js title="ChildERC20.sol"
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChildERC20 is ERC20,
{
    using SafeMath for uint256;
    // keeping it for checking, whether deposit being called by valid address or not
    address public childChainManagerProxy;
    address deployer;

    constructor(string memory name, string memory symbol, uint8 decimals, address _childChainManagerProxy) public ERC20(name, symbol) {

        _setupDecimals(decimals);
        childChainManagerProxy = _childChainManagerProxy;
        deployer = msg.sender;

        // Can't mint here, because minting in child chain smart contract's constructor not allowed
        //
        // In case of mintable tokens it can be done, there can be external mintable function too
        // which can be called by some trusted parties
        // _mint(msg.sender, 10 ** 27);

    }

    // being proxified smart contract, most probably childChainManagerProxy contract's address
    // is not going to change ever, but still, lets keep it
    function updateChildChainManager(address newChildChainManagerProxy) external {
        require(newChildChainManagerProxy != address(0), "Bad ChildChainManagerProxy address");
        require(msg.sender == deployer, "You're not allowed");

        childChainManagerProxy = newChildChainManagerProxy;
    }

    function deposit(address user, bytes calldata depositData) external {
        require(msg.sender == childChainManagerProxy, "You're not allowed to deposit");

        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _totalSupply = _totalSupply.add(amount);
        _balances[user] = _balances[user].add(amount);

        emit Transfer(address(0), user, amount);
    }

    function withdraw(uint256 amount) external {
        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(msg.sender, address(0), amount);
    }

}
```

Implementasi yang diperbarui ini dapat digunakan untuk pemetaan.

Langkah-langkahnya:

1. Sebarkan token root pada rantai root yaitu {Goerli, Ethereum Mainnet}
2. Pastikan token anak memiliki fungsi `deposit` & `withdraw`.
3. Sebarkan token anak pada rantai anak yaitu {Polygon Mumbai, Mainnet Polygon}
4. Kirim permintaan pemetaan, untuk diselesaikan oleh tim.

### Pengiriman Permintaan {#request-submission}

Silakan gunakan [tautan ini](/docs/develop/ethereum-polygon/submit-mapping-request) untuk mengirim permintaan pemetaan.
