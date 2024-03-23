// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

// @param user who trigger
// @param x coordinates
// @param y coordinates
// @param color the color that will place
struct PlaceStruct {
  address user;
  uint8 x;
  uint8 y;
  string color;
}