/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  specifications: [
    {
      type: "html",
      value: "Specifications",
      className: "sidebar-title",
    },
    "introduction",
    "architecture",
    {
      type: "category",
      label: "zkEVM Protocol",
      link: {
        type: "generated-index",
      },
      collapsed: false,
      items: [
        "protocol/protocol-components",
        "protocol/state-management",
        {
          type: "category",
          label: "Transaction Life Cycle",
          link: {
            type: "generated-index",
          },
          items: [
            "protocol/l2-transaction-cycle-intro",
            "protocol/transaction-execution",
            "protocol/transaction-batching",
            "protocol/transaction-sequencing",
            "protocol/transaction-aggregation",
          ],
        },
        "protocol/incentive-mechanism",
        "protocol/upgradability",
        "protocol/admin-role",
        {
          type: "category",
          label: "Malfunction Resistance",
          link: {
            type: "generated-index",
          },
          items: [
            "protocol/sequencer-resistance",
            "protocol/aggregator-resistance",
            "protocol/emergency-state",
          ],
        },
        {
          type: "category",
          label: "zkEVM Bridge",
          link: {
            type: "generated-index",
          },
          items: [
            "protocol/zkevm-bridge",
            "protocol/exit-tree",
            "protocol/bridge-smart-contract",
            "protocol/flow-of-asset",
          ],
        },
        "protocol/evm-diff",
      ],
    },
    "zknode/zknode-overview",
    {
      type: "category",
      label: "zkProver",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "zkProver/overview",
        {
          type: "category",
          label: "Basic Concepts",
          link: {
            type: "generated-index",
          },
          items: [
            "zkProver/zkprover-design",
            {
              type: "category",
              label: "mFibonacci SM",
              link: {
                type: "generated-index",
              },
              items: [
                "zkProver/mfibonacci-overview",
                "zkProver/mfibonacci-example",
                "zkProver/commitment-scheme",
                "zkProver/verification-scheme",
                "zkProver/pil-stark",
                "zkProver/pil-stark-demo",
              ],
            },
            {
              type: "category",
              label: "Generic SM",
              link: {
                type: "generated-index",
              },
              items: [
                "zkProver/intro-generic-sm",
                "zkProver/exec-trace-correct",
                "zkProver/ending-program",
                "zkProver/program-counter",
                "zkProver/plookup",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Main State Machine",
          link: {
            type: "generated-index",
          },
          items: [
            "zkProver/evm-basics",
            "zkProver/intro-main-sm",
          ],
        },
        {
          type: "category",
          label: "STARK Recursion",
          link: {
            type: "generated-index",
          },
          items: [
            "zkProver/intro-stark-recursion",
            "zkProver/proving-tools",
            "zkProver/circom-intro-brief",
            "zkProver/stark-recursion-detail",
            "zkProver/recursion-sub-process",
            "zkProver/proving-architecture",
          ],
        },
        {
          type: "category",
          label: "Storage SM",
          link: {
            type: "generated-index",
          },
          items: [
            "zkProver/intro-storage-sm",
            "zkProver/sparse-merkle-tree",
            "zkProver/simple-smt",
            "zkProver/detailed-smt-concepts",
            "zkProver/basic-smt-ops",
            "zkProver/construct-key-path",
            "zkProver/storage-sm-mechanism",
            "zkProver/executor-pil",
          ],
        },
        "zkProver/arithmetic-sm",
        "zkProver/binary-sm",
        "zkProver/memory-sm",
        "zkProver/mem-align-sm",
        {
          type: "category",
          label: "Hashing SM",
          link: {
            type: "generated-index",
          },
          items: [
            "zkProver/intro-hashing-sm",
            "zkProver/keccak-framework",
            "zkProver/paddingkk-sm",
            "zkProver/paddingkk-bit-sm",
            "zkProver/bits2field-sm",
            "zkProver/keccakf-sm",
            "zkProver/poseidon-sm",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "zk Assembly",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "zkASM/introduction",
        "zkASM/basic-syntax",
        "zkASM/some-examples",
      ],
    },
    {
      type: "category",
      label: "Polynomial Identity Language",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "PIL/introduction",
        "PIL/simple-program",
        "PIL/pil-compile",
        "PIL/pil-config",
        "PIL/cyclic-nature",
        "PIL/pil-arguments",
        "PIL/connect-programs",
        "PIL/public-values",
        "PIL/permutation-arg",
        "PIL/connect-arg",
        "PIL/pil-plonk",
        "PIL/filling-polynomial",
        "PIL/generate-proof",
      ],
    },
  ],

  build: [
    {
      type: "html",
      value: "Developer Guides",
      className: "sidebar-title",
    },
    "develop",
    "bridge-to-zkevm",
    {
      type: "category",
      label: "Setup zkNode",
      link: {
        type: "generated-index",
      },
      collapsed: false,
      items: ["setup-local-node", "setup-production-node"],
    },
    "zkevm-gas-station",
    "open-source-repos",
    "glossary",
  ],

  faq: [
    {
      type: "html",
      value: "FAQs",
      className: "sidebar-title",
    },
    "faq/zkevm-general-faq",
    "faq/zkevm-protocol-faq",
    "faq/zkevm-eth-faq",
    "risk-disclosure",
  ],
};
