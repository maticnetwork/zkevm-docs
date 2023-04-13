---
id: pips-overview
title: Polygon Improvement Proposals (PIPs)
sidebar_label: Overview
description: Learn about Polygon Improvement Proposals.
keywords:
  - docs
  - matic
  - polygon
  - DAO
  - governance
image: https://wiki.polygon.technology/img/polygon-logo.png
---

## What are PIPs?

Polygon Improvement Proposals (PIPs) describe standards for the Polygon ecosystem
and govern the process through which the Polygon community introduces, finds consensus
on, and implements changes to Polygon protocols. A PIP provides information to the
Polygon community about suggested changes to the Polygon protocols. Authors use PIPs to
document proposed changes, understand community sentiment, incorporate
feedback, and provide technical specifications behind the suggested changes.

## The PIP process

The Polygon Improvement Proposal (PIP) process is a preliminary approach for
allowing the community to put forward-protocol upgrades that aim at improving
Polygon PoS. This process is inspired by the PEP process, which has been used
in the development of frameworks for other open-source projects, including
Ethereum and Bitcoin. As a guiding rule, it is recommended that all changes
originate from the Polygon Community Forum and the PIP GitHub repository in
the form of a proposal written in line with PIP-1. It is suggested to consult
with the Governance processes board regarding implementing different
types of PIPs, as separate classifications of PIPs have other implementation
flows.

### Who can propose a PIP?

Anyone can propose a PIP.

### Why submit a PIP?

- To introduce changes to the Polygon protocols.
- To offer new standards to the ecosystem.
- To encourage open and transparent discussion and decision-making about changes to the
  Polygon protocols, ensuring that any changes are well thought-out and aligned with the
  goals of the Polygon community.

### Where are the PIPs hosted?

The PIPs are available on [GitHub](https://github.com/maticnetwork/Polygon-Improvement-Proposals).

### What should I do before submitting a PIP?

Before submitting a PIP, look through the PIP list and the
[Polygon Community Forum](https://forum.polygon.technology/) to see
if someone has had a similar idea. If so, join the discussion.
If there is a different proposal, submit the PIP yourself.

### What do I need to do if I want to write a PIP?

Go to [GitHub](https://github.com/maticnetwork/Polygon-Improvement-Proposals)
and use the suggested template to draft your PIP. After writing your
proposal, follow the steps described in
[PIP-1](https://forum.polygon.technology/t/pip-1-pip-purpose-and-guidelines/11356)
and [PIP-8](https://forum.polygon.technology/t/pip-8-pip-classification-workflow-and-implementation/11365/5).

### What does the PIP process look like?

Take a look at the flowchart that explains how the PIP process works.

![image](https://user-images.githubusercontent.com/125366298/221843635-0ca4dd43-10cc-4e4f-8cf4-6b4dcc3e0f98.png)

### What are the types of PIPs?

There are four types of PIPs that differ based on the changes the author
wants to introduce. More specifically:

- The **Core** category is for changes to the Heimdall and Bor protocols,
  which are the backbone of the Polygon network. This category is for
  discussing, proposing, and implementing modifications to these protocols
  to improve the overall functioning of the Polygon network.

  Examples include but are not limited to:

   i. Proposal to upgrade Heimdall to a new version to improve security and scalability.

   ii. Discussion on changing the block size limit in Bor to accommodate more
      transactions ([PIP-5](https://forum.polygon.technology/t/pip-5-change-in-sprintlength/10874/4)
      & [PIP-6](https://forum.polygon.technology/t/pip-6-change-in-basefeechangedenominator/10875/4)).

  iii. Implement a new consensus algorithm to improve the efficiency of the Polygon network.

- The **Contracts** category is for changes to the Core contracts deployed on the
  Ethereum network. This includes discussing and proposing changes to the smart contracts
  that run on the Ethereum network and changes to the security and functioning of these
  contracts.

  Examples include but are not limited to:

  i. Proposal to add new functionality to the Core staking contracts.

  ii. Discussions on changes related to bridge security.

- The **Interface** category is for client API/RPC specifications and standards improvements.
  This includes changes to the way that clients interact with the Polygon network, as well
  as changes to the way that data is transmitted and received by these clients.

  Examples include but are not limited to:

  i. Contract standards - PRCs.

  ii. Proposal to improve the API/RPC specification for transmitting data between clients
      and the Polygon network.

  iii. Discussion on changes to the way clients interact with the Polygon network to make it
       more user-friendly.

  iv. Implement a new data format for transmitting information between clients and the
      Polygon network.

- The **Informational** category is for issues and ideas that the Polygon community can adopt.
  This includes discussions and proposals on new features, changes to existing features, and best
  practices for using the Polygon network. This category is meant to be a place for members of the
  Polygon community to share information and collaborate on new ideas and improvements to the network.

  Examples include but are not limited to:

  i. Sharing information and resources on integrating a specific type of Dapp to the Polygon protocols.

  ii. Discussion on best practices and risk management for Dapps.

### What is the difference between a PIP and a PRC, and how to decide which one I am submitting?

There is little of a difference.

Polygon Improvement Proposal (PIP) and Polygon Request for Comments (PRC) are similar
in that they both serve as a standard for proposing Polygon protocol improvements and additions.
However, the scope of the proposals they represent differs slightly.

PIPs have a broader scope and can include proposals for Polygon protocol improvements such as
protocol changes, blockchain upgrades, and new features.

Conversely, PRC is primarily concerned with proposals for standardizing smart contracts based
on the Polygon protocols. PRCs define smart contract development and deployment standards,
such as token standards, and serve as a foundation for developers to build on.

In summary, PIPs are for proposals that aim to improve the Polygon protocols as a whole, while
PRCs are for proposals that aim to standardize smart contract development on Polygon protocols.

If you are still determining which category your proposal falls under, don't worry; PIP Editors
can help you with that.

### Where can I see the proposed PIPs?

- [Polygon Community Forum](https://forum.polygon.technology/tag/pip)

- [Github page](https://github.com/maticnetwork/Polygon-Improvement-Proposals)

- Official PIP Website (soon 👀)

### Where do PIP-related discussions take place?

- [Polygon Community Forum](https://forum.polygon.technology/tag/pip)

- [Polygon Builder Sessions](https://github.com/maticnetwork/Polygon-Improvement-Proposals/tree/main/Project%20Management)

### What to do after submitting a PIP to the PIP GitHub repository?

- Share the PIP with the community at the
  [Polygon Community Forum](https://forum.polygon.technology/tag/pip). Present your PIP
  as submitted, and focus your discussion by highlighting why it should be implemented. Why
  is your PIP different from other similar PIPs or PRCs? What are the benefits of adopting
  your proposal?

- Once doing so, remember to engage in the discussions. Address the comments posted and
  (if applicable) incorporate them in the following versions of the PIP.

### How long does the whole process of a PIP, from submission to finalization, take?

- The timeline may vary depending on the community's response and the author's responsiveness
  to the comments received.

### My PIP is still in draft. What to do to make it final?

- Moving the PIP through the different stages is the responsibility of the author(s). Once
  you are happy with the state of the proposal, you should move the proposal to **Review**
  and start receiving comments from the community.

### Who are the PIP Editors, and what do they do?

A PIP editor's role is to facilitate the PIP process, and they DON'T hold the authority to
decide if the PIP is finally approved (whether by on-chain consensus or ecosystem adoption).

PIP Editors ensure that:

1. PIP is well formatted and technically complete.
2. The PIP repository is maintained, and the standards for PIPs are met.

### How to become a PIP Editor, and what does the selection process look like?

Everyone can apply to become a PIP editor, given they match the following requirements.

- Understands Polygon protocols at an expert level.
- Is familiar with the PIP and similar frameworks used on other decentralized blockchains.
- Is proficient in using GitHub.
- Is a good communicator.
- Can appropriately handle contentious discourse.

Read more about it [here](https://github.com/maticnetwork/Polygon-Improvement-Proposals/blob/main/How%20to%20become%20a%20PIP%20Editor.md).
