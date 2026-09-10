// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {e, euint256, ebool} from "@inco/lightning/src/Lib.sol";
import {IConfidentialToken} from "./IConfidentialToken.sol";

/// @notice Isolated Base Sepolia research probe. NOT an audited production escrow.
/// @dev One agreement per contract. No public paid flag is inferred from transaction success.
contract ConfidentialEscrowProbe {
    using e for *;
    IConfidentialToken public immutable token;
    address public immutable client;
    address public immutable agency;
    bytes32 public immutable scope;
    address[3] public recipients;
    euint256[3] private remaining;
    ebool private configurationValid;
    bool public configured;
    bool public releaseStarted;
    bool public cancellationApproved;
    bool public cancelled;
    bool private entered;
    modifier nonReentrant() {
        require(!entered, "reentrant");
        entered = true;
        _;
        entered = false;
    }

    function approveCancellation() external {
        require(msg.sender == agency, "agency only");
        require(!releaseStarted, "release started");
        cancellationApproved = true;
    }

    function refund() external nonReentrant returns (ebool refunded) {
        require(msg.sender == client, "client only");
        require(!releaseStarted, "release started");
        require(cancellationApproved, "cancellation not approved");
        cancelled = true;
        euint256 balance = token.confidentialBalanceOf(address(this));
        balance.allow(address(token));
        euint256 actual = token.confidentialTransfer(client, balance);
        refunded = actual.eq(balance);
        refunded.allowThis();
        refunded.allow(client);
        refunded.allow(agency);
    }

    constructor(address token_, address client_, address agency_, address[3] memory recipients_, bytes32 scope_) {
        require(block.chainid == 84532, "Base Sepolia only");
        require(token_.code.length > 0, "invalid token");
        require(client_ != address(0) && agency_ != address(0) && client_ != agency_, "invalid parties");
        require(scope_ != bytes32(0), "empty scope");
        for (uint256 i; i < 3; ++i) {
            require(recipients_[i] != address(0) && recipients_[i] != address(this), "invalid recipient");
            for (uint256 j; j < i; ++j) {
                require(recipients_[i] != recipients_[j], "duplicate recipients");
            }
        }
        token = IConfidentialToken(token_);
        client = client_;
        agency = agency_;
        recipients = recipients_;
        scope = scope_;
    }

    function configure(bytes[3] calldata ciphertexts) external payable {
        require(msg.sender == agency, "agency only");
        require(!configured, "already configured");
        configured = true;
        configurationValid = e.asEbool(true);
        for (uint256 i; i < 3; ++i) {
            euint256 raw = e.newEuint256(ciphertexts[i]);
            ebool bounded = raw.le(type(uint128).max);
            configurationValid = configurationValid.and(bounded);
            // Bound BEFORE addition. Even the sum of three maximum values cannot overflow uint256.
            remaining[i] = e.select(bounded, raw, e.asEuint256(0));
            remaining[i].allowThis();
            remaining[i].allow(agency);
            remaining[i].allow(recipients[i]);
        }
        configurationValid.allowThis();
    }

    function approveAndRelease(bytes32 approvedScope) external nonReentrant returns (ebool settled) {
        require(msg.sender == client, "client only");
        require(approvedScope == scope, "scope mismatch");
        require(configured, "not configured");
        require(!cancelled, "cancelled");
        releaseStarted = true;
        euint256 total = remaining[0].add(remaining[1]).add(remaining[2]);
        ebool eligible = configurationValid.and(token.confidentialBalanceOf(address(this)).ge(total));
        settled = configurationValid;
        for (uint256 i; i < 3; ++i) {
            euint256 amount = e.select(eligible, remaining[i], e.asEuint256(0));
            amount.allowThis();
            amount.allow(address(token));
            euint256 actual = token.confidentialTransfer(recipients[i], amount);
            remaining[i] = remaining[i].sub(actual);
            remaining[i].allowThis();
            remaining[i].allow(agency);
            remaining[i].allow(recipients[i]);
            settled = settled.and(remaining[i].eq(0));
        }
        settled.allowThis();
        settled.allow(client);
        settled.allow(agency);
    }
}
