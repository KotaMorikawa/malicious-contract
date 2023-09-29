const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Malicious External Contract", async () => {
  const maliciousContract = await ethers.deployContract("Malicious");
  await maliciousContract.waitForDeployment();

  const goodContract = await ethers.deployContract("Good", [
    maliciousContract.target,
    { value: ethers.parseEther("3") },
  ]);
  await goodContract.waitForDeployment();

  const [_, address1] = await ethers.getSigners();

  const txn = await goodContract.connect(address1).addToList();
  await txn.wait();

  const eligible = await goodContract.connect(address1).isUserEligible();
  expect(eligible).to.equal(false);
});
