/* global process */
// scripts/verify.js
// Usage: npx hardhat verify --network sepolia DEPLOYED_ADDRESS
// or: node scripts/verify.js 0x...
import hre from "hardhat";

// 'process' is always available in Node.js environments; no need for fallback.

async function main() {
    const addr = process.argv[2];
    if (!addr) throw new Error("Provide address: node scripts/verify.js 0x...");
    await hre.run("verify:verify", { address: addr, constructorArguments: [] });
    console.log("Verified:", addr);
}
main().catch((e) => { 
    console.error(e); 
    if (typeof process !== "undefined" && process.exit) {
        process.exit(1);
    }
});
