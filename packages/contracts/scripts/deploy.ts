import { ethers, network } from "hardhat";
import fs from "fs";
require('dotenv').config()

async function main() {
  const board = await ethers.deployContract("Board", [], {}) as any;

  await board.waitForDeployment();

  console.log(
    `deployed to ${board.target}`
  );

  const contractAddresses = readDataFromFile();

  if (contractAddresses[network.config.chainId as number]) {
    contractAddresses[network.config.chainId as number].address = board.target;
  } else {
    contractAddresses[network.config.chainId as number] = { address: board.target };
  }
  // Save the updated array to the JSON file
  writeDataToFile(contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const readDataFromFile = () => {
  try {
    const data = fs.readFileSync('contract-address.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

const writeDataToFile = (data : any) => {
  fs.writeFileSync('contract-address.json', JSON.stringify(data, null, 2));
};
