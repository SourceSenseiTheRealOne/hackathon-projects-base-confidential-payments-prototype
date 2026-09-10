// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {IncoTest} from "@inco/lightning/src/test/IncoTest.sol";
import {e, euint256, ebool, inco} from "@inco/lightning/src/Lib.sol";
import {ConfidentialEscrowProbe} from "../src/ConfidentialEscrowProbe.sol";
import {IConfidentialToken} from "../src/IConfidentialToken.sol";

// Test-only token double. Models zero-on-insufficient behavior, not cToken bytecode parity.
contract ZeroOnInsufficientToken is IConfidentialToken {
    using e for *;
    mapping(address => euint256) private balances;

    function fundForTest(address recipient, uint256 amount) external {
        balances[recipient] = balances[recipient].add(amount);
        balances[recipient].allowThis();
        balances[recipient].allow(recipient);
    }

    function confidentialBalanceOf(address holder) external view returns (euint256) {
        return balances[holder];
    }

    function confidentialTransfer(address to, euint256 amount) external returns (euint256 transferred) {
        require(e.isAllowed(msg.sender, amount), "caller ACL");
        require(e.isAllowed(address(this), amount), "token ACL");
        transferred = e.select(balances[msg.sender].ge(amount), amount, e.asEuint256(0));
        balances[msg.sender] = balances[msg.sender].sub(transferred);
        balances[to] = balances[to].add(transferred);
        balances[msg.sender].allowThis();
        balances[msg.sender].allow(msg.sender);
        balances[to].allowThis();
        balances[to].allow(to);
        transferred.allow(msg.sender);
    }
}

contract ConfidentialEscrowProbeTest is IncoTest {
    using e for *;
    ZeroOnInsufficientToken token;
    ConfidentialEscrowProbe escrow;
    bytes32 constant SCOPE = keccak256("synthetic-test-scope");

    function setUp() public override {
        vm.chainId(84532);
        super.setUp();
        token = new ZeroOnInsufficientToken();
        escrow = new ConfidentialEscrowProbe(address(token), alice, bob, [bob, carol, dave], SCOPE);
        vm.deal(bob, 1 ether);
    }

    function configure(uint256 a, uint256 b, uint256 c) internal {
        bytes[3] memory amounts;
        amounts[0] = fakePrepareEuint256Ciphertext(a, bob, address(escrow));
        amounts[1] = fakePrepareEuint256Ciphertext(b, bob, address(escrow));
        amounts[2] = fakePrepareEuint256Ciphertext(c, bob, address(escrow));
        uint256 fee = 3 * inco.getFee();
        vm.prank(bob);
        escrow.configure{value: fee}(amounts);
        processAllOperations();
    }

    function testCoapprovedCancellationRefundsPrivately() public {
        configure(30, 40, 20);
        token.fundForTest(address(escrow), 90);
        processAllOperations();
        vm.prank(bob);
        escrow.approveCancellation();
        vm.prank(alice);
        escrow.refund();
        processAllOperations();
        assertEq(getUint256Value(token.confidentialBalanceOf(alice)), 90);
        assertEq(getUint256Value(token.confidentialBalanceOf(address(escrow))), 0);
        vm.prank(alice);
        vm.expectRevert(bytes("cancelled"));
        escrow.approveAndRelease(SCOPE);
    }

    function testClientCannotUnilaterallyRefund() public {
        configure(30, 40, 20);
        token.fundForTest(address(escrow), 90);
        processAllOperations();
        vm.prank(alice);
        vm.expectRevert(bytes("cancellation not approved"));
        escrow.refund();
    }

    function testCancellationBlockedAfterReleaseBegins() public {
        configure(30, 40, 20);
        token.fundForTest(address(escrow), 90);
        processAllOperations();
        vm.prank(alice);
        escrow.approveAndRelease(SCOPE);
        processAllOperations();
        vm.prank(bob);
        vm.expectRevert(bytes("release started"));
        escrow.approveCancellation();
    }

    function testRetryPaysOnlyUnpaidAllocations() public {
        configure(30, 40, 20);
        token.fundForTest(address(escrow), 50);
        processAllOperations();
        vm.prank(alice);
        escrow.approveAndRelease(SCOPE);
        processAllOperations();
        token.fundForTest(address(escrow), 40);
        processAllOperations();
        vm.prank(alice);
        escrow.approveAndRelease(SCOPE);
        processAllOperations();
        vm.prank(alice);
        escrow.approveAndRelease(SCOPE);
        processAllOperations();
        assertEq(getUint256Value(token.confidentialBalanceOf(bob)), 30);
        assertEq(getUint256Value(token.confidentialBalanceOf(carol)), 40);
        assertEq(getUint256Value(token.confidentialBalanceOf(dave)), 20);
    }

    function testRecipientBalanceAclDoesNotExposeOtherRatesToClient() public {
        configure(30, 40, 20);
        token.fundForTest(address(escrow), 90);
        processAllOperations();
        vm.prank(alice);
        ebool settled = escrow.approveAndRelease(SCOPE);
        processAllOperations();
        assertTrue(e.isAllowed(carol, token.confidentialBalanceOf(carol)));
        assertFalse(e.isAllowed(alice, token.confidentialBalanceOf(carol)));
        assertFalse(e.isAllowed(dave, token.confidentialBalanceOf(carol)));
        assertTrue(inco.isAllowed(ebool.unwrap(settled), alice));
    }

    function testInvalidParticipantAddressesRejected() public {
        vm.expectRevert(bytes("invalid parties"));
        new ConfidentialEscrowProbe(address(token), address(0), bob, [bob, carol, dave], SCOPE);
        vm.expectRevert(bytes("invalid parties"));
        new ConfidentialEscrowProbe(address(token), alice, alice, [bob, carol, dave], SCOPE);
        vm.expectRevert(bytes("invalid token"));
        new ConfidentialEscrowProbe(address(1), alice, bob, [bob, carol, dave], SCOPE);
        vm.expectRevert(bytes("duplicate recipients"));
        new ConfidentialEscrowProbe(address(token), alice, bob, [bob, carol, carol], SCOPE);
    }

    function testOnlyClientCanRelease() public {
        configure(30, 40, 20);
        token.fundForTest(address(escrow), 90);
        processAllOperations();
        vm.prank(carol);
        vm.expectRevert(bytes("client only"));
        escrow.approveAndRelease(SCOPE);
    }

    function testApprovalBindsExactScope() public {
        configure(30, 40, 20);
        token.fundForTest(address(escrow), 90);
        processAllOperations();
        vm.prank(alice);
        vm.expectRevert(bytes("scope mismatch"));
        escrow.approveAndRelease(bytes32(uint256(1)));
    }

    function testCannotReplaceCommittedAllocations() public {
        configure(30, 40, 20);
        bytes[3] memory inputs;
        vm.prank(bob);
        vm.expectRevert(bytes("already configured"));
        escrow.configure(inputs);
    }

    function testOnlyAgencyCanConfigure() public {
        bytes[3] memory inputs;
        vm.prank(carol);
        vm.expectRevert(bytes("agency only"));
        escrow.configure(inputs);
    }

    function testMainnetDeploymentRejected() public {
        vm.chainId(8453);
        vm.expectRevert(bytes("Base Sepolia only"));
        new ConfidentialEscrowProbe(address(token), alice, bob, [bob, carol, dave], SCOPE);
    }

    function testOverflowedAllocationsPayNobody() public {
        configure(type(uint256).max, 40, 20);
        token.fundForTest(address(escrow), 100);
        processAllOperations();
        vm.prank(alice);
        ebool settled = escrow.approveAndRelease(SCOPE);
        processAllOperations();
        assertEq(getUint256Value(token.confidentialBalanceOf(carol)), 0);
        assertEq(getUint256Value(token.confidentialBalanceOf(dave)), 0);
        assertFalse(getBoolValue(settled));
    }

    function testInsufficientAggregateFundsPayNobody() public {
        configure(30, 40, 20);
        token.fundForTest(address(escrow), 50);
        processAllOperations();
        vm.prank(alice);
        ebool settled = escrow.approveAndRelease(SCOPE);
        processAllOperations();
        assertEq(getUint256Value(token.confidentialBalanceOf(bob)), 0);
        assertEq(getUint256Value(token.confidentialBalanceOf(carol)), 0);
        assertEq(getUint256Value(token.confidentialBalanceOf(dave)), 0);
        assertFalse(getBoolValue(settled));
        assertEq(getUint256Value(token.confidentialBalanceOf(address(escrow))), 50);
    }

    function testApprovedReleasePaysEachCommittedRecipient() public {
        configure(30, 40, 20);
        token.fundForTest(address(escrow), 90);
        processAllOperations();
        vm.prank(alice);
        ebool settled = escrow.approveAndRelease(SCOPE);
        processAllOperations();
        assertEq(getUint256Value(token.confidentialBalanceOf(bob)), 30);
        assertEq(getUint256Value(token.confidentialBalanceOf(carol)), 40);
        assertEq(getUint256Value(token.confidentialBalanceOf(dave)), 20);
        assertTrue(getBoolValue(settled));
    }
}
