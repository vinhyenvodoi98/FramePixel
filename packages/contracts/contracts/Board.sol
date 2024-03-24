// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;
import { PlaceStruct } from "./helpers/Struct.sol";

contract Board {
    string[20][20] public board;

    event Placed(address user, uint256 x, uint256 y, string color);

    function place(PlaceStruct calldata input) public {
        _place(input);
    }

    function _place(PlaceStruct memory input) internal {
        board[input.x][input.y] = input.color;
        emit Placed(msg.sender, input.x, input.y, input.color);
    }

    function getBoard() public view returns (string[20][20] memory) {
        return board;
    }
}
