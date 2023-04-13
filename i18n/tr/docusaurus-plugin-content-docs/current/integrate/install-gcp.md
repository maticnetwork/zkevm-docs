---
id: install-gcp
title: Polygon düğümlerini Google Cloud üzerinden dağıtın
sidebar_label: Google Cloud Deployment
description: Polygon düğümlerinizin Google Cloud üzerinde basit bir şekilde dağıtımı
keywords:
- docs
- polygon
- deploy
- nodes
- gcp
- google cloud
slug: install-gcp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon Düğümlerini Google Cloud üzerinden dağıtın {#deploy-polygon-nodes-on-google-cloud}

Bu belgede, Polygon düğümlerinin Google Cloud üzerinde bir VM örneğine nasıl dağıtılacağını açıklayacağız.

### Donanım gereksinimleri {#hardware-requirements}

Polygon Wiki için minimum ve önerilen [donanım](/docs/maintain/validate/validator-node-system-requirements) gereksinimlerini kontrol edin.

### Yazılım gereksinimleri {#software-requirements}

Uzun süreli destek verilen herhangi bir modern Debian veya Ubuntu Linux işletim sistemi kullanın, örneğin Debian 11 veya Ubuntu 20.04. Bu kılavuzda Ubuntu 20.04'e odaklanacağız

## Örneği devreye alma (2 yol) {#deploy-instance-2-ways}

Google Cloud'da bir örnek oluşturmak için en az iki yol kullanabilirsiniz:

* gcloud cli, yerel veya [Cloud Shell](https://cloud.google.com/shell)
* Web konsolu

Bu kılavuzda ilk seçeneği açıklayacağız. Devreye almaya CLI kullanarak başlayalım:
1. gcloud komut satırı aracını kurmak ve yapılandırmak için ["Before you begin" (Başlamadan önce) bölümünü](https://cloud.google.com/compute/docs/instances/create-start-instance#before-you-begin) takip edin.
Varsayılan bölgeye ve alana dikkat edin, size veya müşterilerinize daha yakın olanları seçin. En yakın konumu seçmek amacıyla gecikmeyi ölçmek için [gcping.com](https://gcping.com) adresini kullanabilirsiniz.
2. Yürütme öncesinde, gerektiğinde en sevdiğiniz düzenleyiciyi kullanarak aşağıdaki komut değişkenlerini ayarlayın
   * `POLYGON_NETWORK` - çalıştırmak için `mainnet` veya `mumbai` test ağını seçin
   * `POLYGON_NODETYPE` - çalıştırmak için `archive`,`fullnode` düğüm türünü seçin
   * `POLYGON_BOOTSTRAP_MODE` - `snapshot` veya `from_scratch` önyükleme modunu seçin
   * `POLYGON_RPC_PORT` - dinlemek için JSON RPC Bor düğümü bağlantı noktasını seçin, varsayılan değer VM örneğinin oluşturulmasında ve güvenlik duvarı kurallarında kullanılandır
   * `EXTRA_VAR` - Bor ve Heimdall dallarını seçin, `mainnet` ağı ile `network_version=mainnet-v1` ve `mumbai` ağı ile `network_version=testnet-v4` kullanın
   * `INSTANCE_NAME` - Polygon ile oluşturacağımız VM örneğinin adı
   * `INSTANCE_TYPE` - GCP [makinesinin türü](https://cloud.google.com/compute/docs/machine-types), varsayılan değer önerilir. Gerekirse daha sonra değiştirebilirsiniz
   * `BOR_EXT_DISK_SIZE` - Bor ile kullanılacak GB cinsinden ek disk boyutu, `fullnode` ile varsayılan değer önerilir. Gerekirse daha sonra büyütebilirsiniz. Gerçi `archive` düğümü ile en az 8192 GB'a ihtiyacınız olacaktır
   * `HEIMDALL_EXT_DISK_SIZE` - Heimdall ile kullanılacak GB cinsinden ek disk boyutu, varsayılan değer önerilir
   * `DISK_TYPE` - GCP [disk türü](https://cloud.google.com/compute/docs/disks#disk-types), SSD şiddetle önerilir. Düğümü konuşlandıracağınız bölgedeki toplam SSD GB kotasını artırmanız gerekebilir.

3. Doğru donanım ve yazılım gereksinimleriyle bir örnek oluşturmak için aşağıdaki komutu kullanın. Aşağıdaki örnekte Polygon `mainnet`'ini `fullnode` modu ile `snapshot` üzerinden devreye alıyoruz:
```bash
   export POLYGON_NETWORK=mainnet
   export POLYGON_NODETYPE=fullnode
   export POLYGON_BOOTSTRAP_MODE=snapshot
   export POLYGON_RPC_PORT=8747
   export GCP_NETWORK_TAG=polygon
   export EXTRA_VAR=(bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=${POLYGON_NETWORK})
   gcloud compute firewall-rules create "polygon-p2p" --allow=tcp:26656,tcp:30303,udp:30303 --description="polygon p2p" --target-tags=${GCP_NETWORK_TAG}
   gcloud compute firewall-rules create "polygon-rpc" --allow=tcp:${POLYGON_RPC_PORT} --description="polygon rpc" --target-tags=${GCP_NETWORK_TAG}
   export INSTANCE_NAME=polygon-0
   export INSTANCE_TYPE=e2-standard-8
   export BOR_EXT_DISK_SIZE=1024
   export HEIMDALL_EXT_DISK_SIZE=500
   export DISK_TYPE=pd-ssd
   gcloud compute instances create ${INSTANCE_NAME} \
   --image-project=ubuntu-os-cloud \
   --image-family=ubuntu-2004-lts \
   --boot-disk-size=20 \
   --boot-disk-type=${DISK_TYPE} \
   --machine-type=${INSTANCE_TYPE} \
   --create-disk=name=${INSTANCE_NAME}-bor,size=${BOR_EXT_DISK_SIZE},type=${DISK_TYPE},auto-delete=no \
   --create-disk=name=${INSTANCE_NAME}-heimdall,size=${HEIMDALL_EXT_DISK_SIZE},type=${DISK_TYPE},auto-delete=no \
   --tags=${GCP_NETWORK_TAG} \
   --metadata=user-data='
   #cloud-config

   bootcmd:
   - screen -dmS polygon su -l -c bash -c "curl -L https://raw.githubusercontent.com/maticnetwork/node-ansible/master/install-gcp.sh | bash -s -- -n '${POLYGON_NETWORK}' -m '${POLYGON_NODETYPE}' -s '${POLYGON_BOOTSTRAP_MODE}' -p '${POLYGON_RPC_PORT}' -e \"'${EXTRA_VAR}'\"; bash"'
```
Örnek, birkaç dakika içinde oluşturulur

## Örnekte oturum açın (isteğe bağlı) {#login-to-instance-optional}

Gerekli tüm yazılımların kurulması birkaç dakika, seçildiğinde bir anlık görüntünün indirilmesi ise birkaç saat sürecektir.
Çalışan `bor` ve `heimdalld` işlemlerinin ek sürücüleri doldurduğunu göreceksiniz. Bunu denetlemek için aşağıdaki komutları çalıştırabilirsiniz.
`gcloud` SSH sarmalayıcısını kullanarak örnekteki SSH hizmetine bağlanın:
```bash
gcloud compute ssh ${INSTANCE_NAME}
# inside the connected session
sudo su -

ps uax|egrep "bor|heimdalld"
df -l -h
```
Kurulumun ilerlemesini izlemek için aşağıdaki komutu kullanabilirsiniz. Bu, `snapshot` önyükleme işleminde gerçekten kullanışlıdır
```bash
# inside the connected session
screen -dr
```
İlerleme incelemesinin bağlantısını kesmek için `Control+a d` tuş kombinasyonunu kullanın.

Bor ve Heimdall günlüklerini almak için aşağıdaki komutları kullanabilirsiniz:
```bash
# inside the connected session
journalctl -fu bor
journalctl -fu heimdalld
```
:::note

Blok zinciri verileri, varsayılan olarak VM örneğinin kaldırılmasında tutulan ek sürücülere kaydedilir. Bu verilere artık ihtiyacınız yoksa, ek diskleri manuel olarak kaldırmanız gerekir.

:::

En sonunda aşağıdaki diyagramda gösterildiği gibi bir örnek elde edersiniz:<img src={useBaseUrl("img/mainnet/polygon-instance.svg")} />

Eğer bu kılavuzda açıklananlarla ilgili bir sorun yaşarsanız [GitHub](https://github.com/maticnetwork/matic-docs) üzerinde bir [sorun](https://github.com/maticnetwork/matic-docs/issues) açabilir veya [bir PR oluşturabilirsiniz](https://github.com/maticnetwork/matic-docs/pulls).
