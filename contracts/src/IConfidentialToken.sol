// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import {euint256} from "@inco/lightning/src/Lib.sol";

interface IConfidentialToken {
    function confidentialBalanceOf(address holder) external view returns (euint256);
    function confidentialTransfer(address to, euint256 amount) external returns (euint256 transferred);
}
