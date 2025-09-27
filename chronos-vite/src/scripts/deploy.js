import { ethers } from "hardhat";
import process from "process";

async function main() {
    const Chronos = await ethers.getContractFactory("Chronos");
    const chronos = await Chronos.deploy();
    await chronos.waitForDeployment();
    console.log("Chronos deployed at:", await chronos.getAddress());
}
main().catch((e) => { console.error(e); process.exit(1); });
