---
id: known-issues
title: Known Issues & Errors
description: "Knowledge Base of common errors."
keywords:
  - docs
  - polygon
  - matic
  - issues
  - errors
  - invalid
  - command
slug: known-issues
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### 1. Error: Bad block/Invalid Merkle

**Description:** A Bad Block or Invalid Merkle root error occurs when your Heimdall and Bor are not in sync with each other. Heimdall is the consensus layer for Polygon POS chain, which means that Heimdall directs Bor to create blocks accordingly. A Bad Block occurs when Bor moves ahead to create a block which has not been directed by Heimdall and hence there is an invalid hash been created, which causes the error, Bad Block, or Invalid Merkle root.

**Solution 1**: Typically a restart of the Bor service should resolve the problem. This would ensure your Bor connects with Heimdall again and start syncing and creating blocks correctly.

To restart your Bor service you can use the following command, `sudo service bor restart`

**Solution 2**: If a restart does not fix your problem, then the first thing you need to check is your Heimdall and Rest server. Most of the time, your Heimdall service might have stopped which has caused the Bad block issue on Bor.

Check the logs for your Heimdall first, `journalctl -u heimdalld -f` and check if everything is working correctly.

Additionally, also check your Rest server logs, `journalctl -u heimdalld-rest-server -f`

If you find that any of these services not running correctly, then please restart the above services and let them sync. Your Bor should automatically resolve the problem.

**Solution 3**: If a restart of your Bor and Heimdall services don't resolve the problem, then its probably that your Bor is stuck on a block. The block number will be evident in the logs. To check your logs for Bor you can run this command, `journalctl -u bor -f`

The Bad block would be displayed this way in your logs.
<img src={useBaseUrl("img/knowledge-base/bad_block.png")} width="75%" height="100%" />

Once you know the Bad block number, you could roll back your Blockchain by a few hundred blocks and resync from a previous block. In order to do this, you will first need to convert the Block number to hexadecimal. You can use [https://www.rapidtables.com/convert/number/decimal-to-hex.html](https://www.rapidtables.com/convert/number/decimal-to-hex.html) for converting decimals to hexadecimals.

Once you have your Hexadecimal ready, you can run the following commands

```jsx
bor attach ./.bor/data/bor.ipc
> debug.setHead("0xE92570")
```

`debug.setHead` is the function that will allow your Bor to set the tip at a particular Block height.

Once you run these commands, the output for this would be `null` . Null means good and it is intended. You can now start monitoring your logs for Bor again and see if it passes that block number. Ideally, it should.

If in any case, none of these solutions work for you, please contact the Polygon Support team immediately.

### 2. Error: Failed Sanity Checks

**Description:** `Addressbook` warnings can be ignored without an issue most of the time. If your node is connected to sufficient number of peers these kind of errors can be ignored. Your `pex` is just trying to re-establish it's connections with peers already present in `addrbook.json`

### 3. Issue: Bor synchronisation is slow

**Description:** If Bor synchronisation is slow it could be due to either of the below reasons:

- The node is running on a fork - means at certain point the block production was done by forking on a different block and that has impacted the further block production
- The machine is not working at optimum levels and could be with insufficient resources.
    - This can be addressed by checking on:
        - IOPS
            - IOPS stands for Input/Output state of cycle
            - The rate of reading is usually higher than write speed
            - 6000 is the recommended range for IOPS
        - Processing Power
            - Processor has to be 8 or 16 core
            - RAM: 32 GB is the minimum; 64 GB is recommended
            - Block import should be more than 2 block for every second
        - Node sync rate should be at 15-20 blocks every 8 secs


**Solution:** As the issue is more about lack of hardware resources try upgrading it to double of the current specifications.

### 4. Node is not signing any checkpoints

**Description:** First of all, your node not signing checkpoints could be for a multiple reasons.

**Solution 1:** First check if your Heimdall service is running correctly on your Sentry and Validator node. If the service has stopped abruptly or see any errors, try restarting your Heimdall service and see it comes back to normal.

**Solution 2:** Check your Bor service and see if it has halted abruptly or there are any errors on the logs. Try restarting your Bor service to resolve this issue.

**Solution 3:** Check if your Heimdall Bridge is running or not or if it has any errors in the logs. Try restarting the service and see if the issue resolves.

### 5. Issue: Validator Heimdall is unable to connect to Peers

**Description:** This typically means that your Sentry Heimdall is running into issues.

**Solution:**
- Check your Sentry Heimdall and see if the service is running fine.
- If the service is stopped then restarting the service on your Sentry should resolve this issue.
- Similarly, after fixing your sentry, a restart of your Heimdall service should also resolve the problem.

### 6. Error: Error while fetching mainchain receipt error

**Description:** These are normal logs. Do not do anything to your bridge.

### 7. Validator bor is stuck on block for a long time

**Description:** This means that your Bor on your Sentry is also stuck because your Validator gets information from your Sentry.

**Solution:**

- Please check your Bor logs on your sentry and see if everything is okay.
- Probably restart the Bor service one on your Bor and then simultaneously restart your Bor service on your Validator as well.

### 8. Error(while upgrading Bor): build [github.com/ethereum/go-ethereum/cmd/geth:](http://github.com/ethereum/go-ethereum/cmd/geth:) cannot load hash/maphash: malformed module path "hash/maphash": missing dot in first path element

**Description:** This is because your Go Version is slightly outdated.

**Solution:** The recommended Go version is 1.15.x and above

### 9. Issue: Sentry Bor is still struggling with 'Looking for peers' and Peers are not succeeding

**Description:** This could happen when Bor has lost connectivity with other peers.

**Solution:**

- Check the `[start.sh](http://start.sh)` file (~/node/bor/start.sh) and it should show you your bootnodes.
- Check if the bootnodes are entered correctly without any formatting issues.
- If you have made any changes to the file, then please restart your Bor service and check if the issue is resolved.

If none of this works, then please contact the **Support Team** immediately for assistance.

### 10. Error: (in Bor)"Failed to prepare header mining at block 0"

**Description:** This happens because of a formatting issue in your `static-nodes.json` file (~/.bor/data/bor/static-nodes.json).

**Solution:**

- Ensure there are no space and no additional characters like < / > .
- If you have made any changes to the file then please restart your Bor service and you should see logs printing.

### 11. Error: "30303" or invalid command

**Description:** This is because you haven’t created the bor keystore and the password file for it.

**Solution:**

Ensure that you follow all the steps from the guide setup.

### 12. Error: Impossible reorg, please file an issue

**Description:** Let these logs be. Your node should ideally not suffer because of this and the issue should be automatically resolved.

If your node is suffering because of this, please contact the support team immdiately.

### 13. Error: "Host not found" while setting up a node using Ansible

**Description:** This could be because your `inventory.yml` file may have some formatting issues.

**Solution:** Correct them with proper indentation and then try again

### 14. Issue: "Dialling failed" in Heimdall

**Description:** This is related to connectivity and more specifically a port related problem

**Solution:**

- Check to curl localhost:26657/status still shows the same block
- Try a Heimdall Restart.
- Make sure that the connectivity to this port 26656 is open.
- Try adding additional peers in vi ~/.heimdalld/config/config.toml
- Set max_open_connection parameter to 100.

### 15. Issue: Looking for Peers or Stopping Peer for error

**Solution:**

- open the `config.toml` file on your Sentry node.

    `~/.heimdalld/config/config.toml`

- And then find the parameter `external_address`. Once you find it this what you should be updating it with

    `tcp://<my_elastic_ip>:26656`

- Where `my_elastic_ip` is your Sentry’s public IP.
- Once you have updated this, all you need to do is restart your Heimdall service on your Sentry

    `sudo service heimdalld restart`

- Ensure that you’re only doing this on your sentry only.

Follow the below steps for adding additional peers in  `vi ~/.heimdalld/config/config.toml`

- Stop heimdalld service

    ```
    sudo service heimdalld stop
    ```

- Clear your addrbook

    ```
    sudo service heimdalld stop
    cp ~/.heimdalld/config/addrbook.json ~/.heimdalld/config/addrbook.json.bkp
    rm ~/.heimdalld/config/addrbook.json
    ```

- Increase max_num_inbound_peers and max_num_outbound_peers in `~/.heimdalld/config/config.toml`:

    ```
    max_num_inbound_peers = 300
    max_num_outbound_peers = 100
    ```

- Start heimdalld service:

    ```
    sudo service heimdalld start
    ```


### 16. Error: Error while fetching data from URL

**Error sample:**

```bash
module=span service=processor error="Error while fetching data from url:
[http://0.0.0.0:1317/bor/prepare-next-span?chain_id=137&proposer=0x29f265b54a298df0c1b762f688e7e7c09d8790ea&span_id=2863&start_block=18317056](http://0.0.0.0:1317/bor/prepare-next-span?chain_id=137&proposer=0x29f265b54a298df0c1b762f688e7e7c09d8790ea&span_id=2863&start_block=18317056), status: 400"
Aug 23 12:07:23 US-CA-SN01 bridge[2340]: E[2021-08-23|12:07:23.158] Unable to fetch next span details            
module=span service=processor lastSpanId=2862
```

**Solution:**

Then the Heimdall Bridge needs a restart.

### 17. Error: no contract code at the given address

**Solution**

1. Get the right configs from Github and copy them to ~/.heimdalld/config and
2.  Please reset heimdall using heimdalld unsafe-reset-all.

### 18. Issue: Problems in starting Bor

**Issue:** Address is required as an argument.


**Solution:**

have to add address

```bash
/etc/matic/metadata
```

### 19. Error: Failed to unlock account (0x...) No key for given address or file

**Description:**

This error happens in light of the fact that the way for the password.txt record is erroneous. You can follow the beneath steps to amend this.

**Solution:**

For Linux packages

Kill Bor process

**For linux**:

1. `ps -aux | grep bor`. Get the PID for Bor and then run the following command.
2. `sudo kill -9 PID`

**For Ansible:**

1. Copy the bor keystore file to

    ```jsx
    /etc/bor/dataDir/keystore
    ```

2. And password.txt to

    ```jsx
    /etc/bor/dataDir/
    ```

3. Make sure you have added correct address in `/etc/bor/metadata`

**For Binaries:**

1. Copy the Bor keystore file to:

    ```jsx
    ~/.bor/keystore/
    ```

2. And password.txt to

    ```jsx
    ~/.bor/password.txt
    ```


### 20. Consequences of validator missing a checkpoint and points to investigate from our side

- Economics
    - Bad reputation for Validator
    - Rewards gets missed for Delegator
- investigation
    - Ask for recent logs

### 21. Error: dpkg: error processing archive matic-heimdall-xxxxxxxxxx

**Sample:**

```bash
 "dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0"
```

**Solution:**

This occurs mainly because of a previous installation of Matic on machine. To resolve you can run:

`sudo dpkg -r matic-node`

### 22. Issue: Tendermint was rest without resetting application's data

**Solution:**

- Reset heimdall config data and try running the installation again

    ```jsx
    $ heimdalld unsafe-reset-all
    ```

    ```jsx
    $ rm -rf $HEIMDALLDIR/bridge
    ```


### 23. Error: "Wrong Block.Header.AppHash."

**Description:** This error usually occurs due to Infura requests getting exhausted. When you setup a node on Matic, you add an Infura Key to the Config file (Heimdall). By default you are allowed 100k Requests per day, if this limit is crossed, then you would face such problems.

**Solution** To resolve this you can create a new API key and add it to the `config.toml` file.

### 24. Issue: Bor crashed

**Solution:**

- Try upgrading to double the amount of RAM
- For example, their current RAM capacity is 16GB, it can be upgraded to 32GB

### 25. Error: err="insufficient funds for gas * price + value"

**Description:**

These logs throw up when there is no enough ETH in your signer wallet.

**Solution:** It [](http://wallet.it/)is recommended to have 1 ETH in your signer wallet but can keep .5-.75 in if you check it often enough.
