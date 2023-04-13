---
id: mapping-assets
title: पॉस का इस्तेमाल करते हुए असेट मैपिंग करना
description: "पॉलीगॉन से एथेरेयम तक असेट मैपिंग करना."
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### परिचय {#introduction}

एथेरेयम और पॉलीगॉन से और इनमें असेट ट्रांसफर करने के लिए मैपिंग करना ज़रूरी है.

- **रूट चेन** :: गोएर्ली को या एथेरियम मेननेट को संदर्भित करती है
- **चाइल्ड चेन** :: पॉलीगॉन मुंबई या पॉलीगॉन मेननेट को संदर्भित करती है

अगर आपने अपना टोकन अनुबंध पहले से ही रूटचेन पर डिप्लॉय कर किया है और अगर आप चाइल्ड चेन पर जाना चाहते है तो आपको इन क्रमानुसार निर्देशों के अनुसार चलना चाहिए लेकिन अगर आपका उद्देश्य अपने अनुबंध को पॉलीगॉन मेननेट पर पहले डिप्लॉय करना है तो, पहले चाइल्ड चेन पर टोकन मिंट करें और उन्हें रूट चेन पर वापस पहुंचा दें. फिर आपको इस [गाइड](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets) के अनुसार चलना चाहिए.

## स्टैंडर्ड चाइल्ड टोकन {#standard-child-token}

अगर आपको केवल एक मानक ERC20/ERC721/ERC1155 अनुबंध चाहिए, तो आप https://mapper.polygon.technology/ पर मैप करने के लिए अनुरोध सबमिट कर सकते हैं और हम आपके लिए मानक चाइल्ड टोकन अनुबंध को स्वचालित रूप से डिप्लॉय कर देंगे.

स्टैंडर्ड चाइल्ड टोकन इस तरह के दिखाई देंगे:-
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

एक नया मैपिंग अनुरोध कैसे बनाएँ, यह समझने के लिए कृपया इस [लिंक](/docs/develop/ethereum-polygon/submit-mapping-request) पर जाएँ.

## कस्टम चाइल्ड टोकन {#custom-child-token}

अगर आपको ऐसे कस्टम टोकन अनुबंध की जरूरत है जिसमें स्टैंडर्ड फंक्शनों के साथ अतिरिक्त फंक्शन हों **तो आपको अपने टोकन अनुबंधों को चाइल्ड चेन पर डिप्लॉय करना होगा** और [यहाँ](https://mapper.polygon.technology/) एक मैप करने का अनुरोध सबमिट करना होगा तथा अपने डिप्लॉय किए हुए चाइल्ड टोकनों के पते को शामिल करना होगा. आइये एक कस्टम चाइल्ड टोकन अनुबंध बनाने के एक उदाहरण का वर्णन करते हैं.

**आपके द्वारा इसे चाइल्ड चेन पर डिप्लॉय किए जाने से पहले, आपके कस्टम चाउल्ड अनुबंध को कुछ विशेष दिशा-निर्देशों का पालन करना चाहिए.**

`deposit`मेथड आपके कस्टम चाइल्ड चेन अनुबंध में मौजूद होना चाहिए. जब भी रूट चेन से डिपाज़िट की शुरुआत की जाती हैं, यह फंक्शन `ChildChainManagerProxy`अनुबंध द्वारा कॉल किया जाता है यह डिपाज़िट फंक्शन चाइल्ड चेन पर आंतरिक रूप से टोकन मिंट करता है.

`withdraw`मेथड आपके कस्टम चाइल्ड चेन अनुबंध में मौजूद होना चाहिए. इसे चाइल्ड चेन पर आपके टोकन बर्न करने के लिए कॉल किया जा सकता है. आपके निकालने की प्रक्रिया में बर्न करना पहला स्टेप है. यह withdraw फंक्शन चाइल्ड चेन पर आंतरिक रूप से टोकन बर्न करेगा.

इन नियमों का पालन दो चेन के बीच परिसंपत्तियों का समुचित संतुलन बनाए रखने के लिए किया जाना चाहिए.

:::note

चाइल्ड टोकन कॉन्ट्रैक्ट के कंस्ट्रक्टर में टोकन मिटिंग नहीं होती.

:::

#### लागू करना {#implementation}

अब जब हमने बता दिया है कि हमें चाइल्ड टोकन अनुबंध में `deposit` और `withdraw`मेथड लागू करने की ज़रूरत _क्यों_ है, अब हम इसे लागू करने की ओर बढ़ सकते हैं.

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

एक बात जिस पर ऊपर दिए गए कोड सैंपल में आपका ध्यान जा सकता है, वह यह है कि, `deposit`फंक्शन किसी के भी द्वारा कॉल किया जा सकता है, जिसकी अनुमति नहीं है. इसे रोकने के लिए, हम यह सुनिश्चित करने जा रहे हैं कि इसे केवल `ChildChainManagerProxy`द्वारा ही कॉल किया जा सके. (ChildChainManagerProxy - [पॉलीगॉन मेननेट](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions) पर, [Mumbai](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/) पर)

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

इस अपडेट किए गए लागूकरण को मैप करने के लिए इस्तेमाल किया जा सकता है.

स्टेप :

1. रुट चेन पर रूट टोकन डिप्लॉय करें यानी {गोएर्ली, एथेरेयम मेननेट}
2. ध्यान रखें कि आपके चाइल्ड टोकन में `deposit`और `withdraw`फंक्शन हों.
3. चाइल्ड चेन पर चाइल्ड टोकन डिप्लॉय करें यानी {पॉलीगॉन मुंबई, पॉलीगॉन मैननेट}
4. टीम द्वारा हल किए जाने के लिए, एक मैप करने का अनुरोध सबमिट करें.

### अनुरोध सबमिट करना {#request-submission}

मैप करने का अनुरोध सबमिट करने के लिए कृपया [इस लिंक](/docs/develop/ethereum-polygon/submit-mapping-request) का इस्तेमाल करें.
