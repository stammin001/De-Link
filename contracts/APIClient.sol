// SPDX-License-Identifier: MIT
// v0.1: Rinkeby @ 0xEc2833eDDe62f700CC88a933097D6094883238a8
// v0.2: Rinkeby @ 0x9A63B12F6cc92889a52BeDBbD6E74Cfaf3CfF4cf
pragma solidity ^0.8.7;

import "./APIConsumer.sol";

/// @title Contract that interacts with APIConsumer and returns info of stored results
/// @notice This is used to get credentials status and store links to docs
contract APIClient {

    string private constant URL = "https://my-json-server.typicode.com/stammin001/mock-api/users?";
    string private constant PATH = "0,graduated";
    mapping(address => string[]) private docs;

    APIConsumer public consumer;

    /// @notice Checks to make sure input string is not empty
    modifier isNotEmpty(string memory _input) {
        require(bytes(_input).length !=0, "input string can't be empty");
        _;
    }

    /// @notice Creates contract by linking the APIConsumer
    /// @param _consumer address of the APIConsumer for the Oracle API call
    constructor(address _consumer) {
        consumer = APIConsumer(_consumer);
    }

    /// @notice Option to update APIConsumer
    /// @param _consumer address of the APIConsumer for the Oracle API call
    function setConsumer(address _consumer) public {
        consumer = APIConsumer(_consumer);
    }

    /// @notice Function to validate given credentials
    /// @param _input String in the form of 'key={value}&key={value}' to be validated
    function validateCreds(string memory _input) public isNotEmpty(_input) returns(bytes32) {
        return consumer.requestValue(string(abi.encodePacked(URL, _input)), PATH);
    }

    /// @notice Function to get the status of credentials
    /// @param _input String in the form of 'key={value}&key={value}' to get the status
    function getCreds(string memory _input) public view isNotEmpty(_input) returns(uint256) {
        return consumer.getValue(string(abi.encodePacked(URL, _input)));
    }

    /// @notice Function to save the URL to the doc
    /// @param _input URL string to be saved
    function uploadDoc(string memory _input) public isNotEmpty(_input) {
        docs[msg.sender].push(_input);
    }

    /// @notice Function to get all the saved URLs of docs
    /// @param _input Address associated to the saved URLs of docs
    function getDocs(address _input) public view returns(string[] memory) {
        if(_input == address(0)) {
            return docs[msg.sender];
        }
        return docs[_input];
    }

    /// @notice Function to remove all the saed URLs of docs
    /// @param _input Address associated to the saved URLs of docs
    function resetDocs(address _input) public {
        if(_input == address(0)) {
            docs[msg.sender] = new string[](0);
        }
        docs[_input] = new string[](0);
    }

}