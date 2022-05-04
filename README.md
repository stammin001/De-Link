# Link3.0

## Objective

Improve the "Trust" aspects of the information on professional sites like Linked-In

## Table of Contents

-   [Introduction](#introduction)
-   [Initial Architecture](#initial-architecture)
-   [Deliverables](#deliverables)
    -   [Milestone 1](#milestone-1)
    -   [Milestone 2](#milestone-2)
    -   [Milestone 3](#milestone-3)
-   [Tech Stack](#tech-stack)

## Introduction

One of the promising aspects of Blockchain technology is to bring "Trust" to the information across the board, which is a huge problem to address. In the space of professional networks, even though sites like Linked-In help with improving authenticity of the information, there is still huge scope for improvement. At the same time, organizations spend billions of dollars to verify different data points throughout various interactions with their employees and other organizations. If we can bring some part of this verified information on-chain as appropriate into sites like Linked-In, it will have a significant impact.

**Note:** Given that the information in these professional sites is going to be quite diverse, this would be an attempt to see what can be done to improve trust aspects one at a time as part of ChainLink hackathon using ChainLink Oracles. Once we have basic pieces working, goal would be to expand on this further beyond this hackathon to make it more comprehensive.

## Initial Architecture

Approach for the architectural pieces would be to gradually move from Web2.0 to Web3.0.

![0.1](architecture.PNG "Initial Arch")

## Deliverables

### Milestone 1

A basic application that can bring few data points like Name, Profile Pic, Profession, Education that is part of public information from linked-in. Ability to connect to Metamask Wallet. Provide a button to validate education and send this information to smart contract.

### Test Front End

cd /website
npm install
npm start

### Milestone 2

Smart contract sends the information to be validated to Oracle and sends the response from Oracle back to the calling application. This can be done using mock-up data for initial validation of flow. Have test scripts in place to test the flow.

### Milestone 3

Oracle makes calls to other applications like private blockchain, public APIs using appropriate authentication mechanisms. Data in these can still be mock-up.

## Tech Stack

-   Front-End: Java Script, React, TBD
-   Public Blockchain: Ethereum, HardHat, Chai, IPFS
-   Oracle: ChainLink
-   Private Blockchain: Hyperledger Indy
-   Database: Amazon S3
-   Web Server: AWS/TBD
-   APIs: TBD
-   ZK: TBD
