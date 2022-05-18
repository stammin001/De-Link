// SPDX-License-Identifier: MIT
// Deployed Rinkeby @ 0xEc2833eDDe62f700CC88a933097D6094883238a8
pragma solidity ^0.8.7;

import "./APIConsumer.sol";

contract APIClient {

    mapping(address => mapping(string => uint)) public creds;
    string public constant URL = "https://my-json-server.typicode.com/stammin001/mock-api/users?";
    string private constant PATH = "0,graduated";

    APIConsumer public consumer;

    constructor(address _consumer) {
        consumer = APIConsumer(_consumer);
    }

    function setConsumer(address _consumer) public {
        consumer = APIConsumer(_consumer);
    }

    function validateCreds(string memory _input) public returns(bytes32) {
        return consumer.requestValue(string(abi.encodePacked(URL, _input)), PATH);
    }

    function getCreds(string memory _input) public view returns(uint256) {
        return consumer.getValue(string(abi.encodePacked(URL, _input)));
    }

}