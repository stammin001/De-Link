// SPDX-License-Identifier: MIT
// Deployed Rinkeby @ 0x92Ea2BD06Ec21b6517fD965769955c22271976eA
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract APIConsumer_2 is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 constant private ORACLE_PAYMENT = 1 * LINK_DIVISIBILITY / 100 * 5;
    uint256 public value;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    event RequestValue(
        bytes32 indexed requestId,
        uint256 indexed value
    );

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
        oracle = 0xD0691a51e3C6c562691D3C44C2944Bd9D368Ec1f;
        jobId = "635e55a66ee64f2597bf5da1170f2824";
    }

    function setOracleJobFee(address _oracle, string memory _jobId) public onlyOwner {
        oracle = _oracle;
        jobId = stringToBytes32(_jobId);
    }

    function requestValue(string memory _url, string memory _path) public onlyOwner {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillValue.selector);
        req.add("get", _url);
        req.add("path", _path);
        req.addInt("multiply", 1);
        sendChainlinkRequestTo(oracle, req, ORACLE_PAYMENT);
    }

    function fulfillValue(bytes32 _requestId, uint256 _value) public recordChainlinkFulfillment(_requestId) {
        emit RequestValue(_requestId, _value);
        value = _value;
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly { // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }

}