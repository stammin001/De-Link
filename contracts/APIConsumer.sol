// SPDX-License-Identifier: MIT
// Deployed Rinkeby @ 0xd724732DCC2A4D9BF1FB88C66ead347fd5aD95F1
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract APIConsumer is ChainlinkClient, AccessControlEnumerable {
    using Chainlink for Chainlink.Request;

    uint256 private constant ORACLE_PAYMENT = 1 * LINK_DIVISIBILITY / 100 * 5;
    bytes32 public constant ADMIN = keccak256("ADMIN");

    mapping(string => bytes32) public consumerReqs;
    mapping(bytes32 => uint256) public consumerResps;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    event RequestValue(
        bytes32 indexed requestId,
        uint256 indexed value
    );

    constructor(address _oracle, string memory _jobId, uint256 _fee, address _link) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN, msg.sender);

        if (_link == address(0)) {
            setPublicChainlinkToken();
            setChainlinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
        } else {
            setChainlinkToken(_link);
        }

        if (_oracle == address(0)) {
            oracle = 0xD0691a51e3C6c562691D3C44C2944Bd9D368Ec1f;
        } else {
            oracle = _oracle;
        }

        if (bytes(_jobId).length == 0) {
            jobId = "635e55a66ee64f2597bf5da1170f2824";
        } else {
            jobId = stringToBytes32(_jobId);
        }

        if(_fee == 0) {
            fee = ORACLE_PAYMENT;
        } else {
            fee = _fee;
        }
    }

    function setOracleJobFee(address _oracle, string memory _jobId, uint256 _fee) public onlyRole(ADMIN) {
        oracle = _oracle;
        jobId = stringToBytes32(_jobId);
        fee = _fee;
    }

    function requestValue(string memory _url, string memory _path) public onlyRole(ADMIN) returns(bytes32) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillValue.selector);
        req.add("get", _url);
        req.add("path", _path);
        req.addInt("multiply", 1);
        consumerReqs[_url] = sendChainlinkRequestTo(oracle, req, fee);
        return consumerReqs[_url];
    }

    function fulfillValue(bytes32 _requestId, uint256 _value) public recordChainlinkFulfillment(_requestId) {
        emit RequestValue(_requestId, _value);
        consumerResps[_requestId] = _value;
    }

    function getValue(string memory _url) public onlyRole(ADMIN) view returns(uint256) {
        return consumerResps[consumerReqs[_url]];
    }
    
    function getOracle() public onlyRole(ADMIN) view returns(address) {
        return oracle;
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