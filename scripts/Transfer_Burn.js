const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"; // địa chỉ token của bạn
  const [owner, addr1] = await ethers.getSigners();

  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.attach(contractAddress);

  // Transfer 10 token cho addr1
  let tx = await myToken.transfer(addr1.address, ethers.parseUnits("10", 18));
  await tx.wait();
  console.log(`Transferred 10 tokens to ${addr1.address}`);

  // Burn 5 token (chỉ owner burn được)
  tx = await myToken.burn(ethers.parseUnits("5", 18));
  await tx.wait();
  console.log(`Burned 5 tokens`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
