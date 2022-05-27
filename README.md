# De-Link

## Objective

Improve the "Trust" aspects of the information on professional sites like Linked-In

## Table of Contents

- [Introduction](#introduction)
- [Initial Architecture](#initial-architecture)
- [Deliverables](#deliverables)
    - [Milestone 1](#milestone-1)
    - [Milestone 2](#milestone-2)
    - [Milestone 3](#milestone-3)
- [Tech Stack](#tech-stack)

## Introduction

One of the promising aspects of Blockchain technology is to bring "Trust" to the information across various information/data points. In the space of professional networks, even though sites like Linked-In help with improving authenticity of the information, there is still huge scope for improvement. At the same time, organizations spend billions of dollars to verify different data points throughout various interactions with their employees, customers and other organizations. If we can bring some part of this verified information on to public blockchain as appropriate, it will have a significant impact.

**Note:** Given that the information in these professional sites is going to be quite diverse, this would be an attempt to see what can be done to improve trust aspects one at a time as part of ChainLink hackathon using ChainLink Oracles. Once we have basic pieces working, goal would be to expand on this further beyond this hackathon to make it more comprehensive.

## Initial Architecture

Approach for the architectural pieces would be to gradually move from Web2.0 to Web3.0.

![0.1](architecture.PNG "Initial Arch")

## Deliverables

### Milestone 1

A basic Web UI that can connect to public blockchain and take few data points like Decentralized ID (DID), University and Degree as input. 
1. Provide option to validate these credentials by sending this information to smart contract.
2. Provide option to retrieve saved validated credentials
3. Provide option to upload documents to IPFS by saving their links in public blockchain for a given wallet address. 
4. Provide option to view the saved documents as needed.
5. Provide option to delete the saved links of documents from public blockchain for a given address.

### Milestone 2

Smart contract sends the information to be validated to Oracle, sends the response from Oracle back to the calling application and saves the validated information on chain. This can be done using mock API for initial validation of end-end flow. Have test scripts in place to test the flow.

### Milestone 3

Oracle makes calls to other applications like private blockchain, public APIs using appropriate authentication mechanisms. Data in these can still be mock-up.

## Getting Started

Install needed modules and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) 

Possible UI Interactions:

1. Connect to Wallet > Enter DID, Education Credentials > Save Data > Validate Credentials > Get Credential Result
2. Connect to Wallet > Upload / View / Reset Documents

## Tech Stack

* Front-End: Java Script, React, Moralis, NextJS
* Public Blockchain: Ethereum, HardHat, Chai, IPFS
* Oracle: ChainLink
* APIs: [mock-api](https://github.com/stammin001/mock-api/blob/main/db.json)
* Private Blockchain: Hyperledger Indy (TBC)
* Database: Amazon S3 (TBC)
* Web Server: AWS/TBD (TBC)
* ZK: TBD (TBC)
