// SPDX-License-Identifier: MIT
// v1: Rinkeby @ 0xEc2833eDDe62f700CC88a933097D6094883238a8
// v2: Rinkeby @ 0x9A63B12F6cc92889a52BeDBbD6E74Cfaf3CfF4cf
pragma solidity ^0.8.7;

import "./APIConsumer.sol";

contract APIClient {

    string private constant URL = "https://my-json-server.typicode.com/stammin001/mock-api/users?";
    string private constant PATH = "0,graduated";
    mapping(address => string[]) private docs;

    APIConsumer public consumer;

    modifier isNotEmpty(string memory _input) {
        require(bytes(_input).length !=0, "input string can't be empty");
        _;
    }

    constructor(address _consumer) {
        consumer = APIConsumer(_consumer);
    }

    function setConsumer(address _consumer) public {
        consumer = APIConsumer(_consumer);
    }

    function validateCreds(string memory _input) public isNotEmpty(_input) returns(bytes32) {
        return consumer.requestValue(string(abi.encodePacked(URL, _input)), PATH);
    }

    function getCreds(string memory _input) public view isNotEmpty(_input) returns(uint256) {
        return consumer.getValue(string(abi.encodePacked(URL, _input)));
    }

    function uploadDoc(string memory _input) public isNotEmpty(_input) {
        docs[msg.sender].push(_input);
    }

    function getDocs(address _input) public view returns(string[] memory) {
        if(_input == address(0)) {
            return docs[msg.sender];
        }
        return docs[_input];
    }

    function resetDocs(address _input) public {
        if(_input == address(0)) {
            docs[msg.sender] = new string[](0);
        }
        docs[_input] = new string[](0);
    }

}