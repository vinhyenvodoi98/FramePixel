// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;
import { PlaceStruct } from "./helpers/Struct.sol";

contract Board {
    string[50][50] public board;

    event Placed(address user, uint256 x, uint256 y, string color);

    function place(PlaceStruct calldata input) public {
        _place(input);
    }

    function _place(PlaceStruct memory input) internal {
        board[input.x][input.y] = input.color;
        emit Placed(input.user, input.x, input.y, input.color);
    }

    function getBoard(uint8 x) public view returns (string[50] memory) {
        return board[x];
    }
}
