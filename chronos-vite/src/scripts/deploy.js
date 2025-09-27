// scripts/deploy.js
// Usage: npx hardhat run scripts/deploy.js --network sepolia
import hre from "hardhat";

async function main() {
    const Chronos = await hre.ethers.getContractFactory("Chronos");
    const chronos = await Chronos.deploy();
    await chronos.waitForDeployment();
    console.log("Chronos deployed at:", await chronos.getAddress());
}

main().catch((e) => {
    console.error(e);
    throw e;
});
