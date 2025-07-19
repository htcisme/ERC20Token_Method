const { ethers } = require("hardhat");

async function main() {
  // 1. Lấy contract factory
  const MyToken = await ethers.getContractFactory("MyToken");
  const [owner] = await ethers.getSigners();

  // 2. Gắn vào contract đã deploy
  // Thay địa chỉ contract thật bạn deploy ra (ví dụ "0x...")
  const myToken = await MyToken.attach(
    "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9"
  );

  // 3. Lấy danh sách account local
  const accounts = await ethers.getSigners();

  for (let i = 0; i < accounts.length; i++) {
    console.log(`Account ${i}: ${accounts[i].address}`);
    // 4. Check balance của account[i]
    const balance = await myToken.balanceOf(accounts[i].address);
    // 5. In ra số token (có thể chia 1e18 để dễ đọc)
    console.log(
      `Balance of ${accounts[i].address}:`,
      ethers.formatUnits(balance, 18)
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
