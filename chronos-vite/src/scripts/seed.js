// scripts/seed.js
// Usage: node scripts/seed.js 0xChronos "First task"
require("dotenv").config();
const { ethers } = require("ethers");
const ABI = require("../src/contracts/abi/Chronos.json");

async function main() {
    const [address, title = "Hello Chronos"] = process.argv.slice(2);
    if (!address) throw new Error("Usage: node scripts/seed.js 0xChronos \"Title\"");

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const ctr = new ethers.Contract(address, ABI, signer);
    const tx = await ctr.createTask(title);
    const rc = await tx.wait();
    console.log("Seeded task tx:", rc?.hash);
}
main().catch((e) => { console.error(e); process.exit(1); });
