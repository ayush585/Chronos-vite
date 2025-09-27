// src/contracts/useChronos.js
import { useMemo } from "react";
import { ethers } from "ethers";
import ABI from "./abi/Chronos.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CHRONOS_ADDRESS;
const RPC_URL = import.meta.env.VITE_RPC_URL;

function getProvider() {
    if (window.ethereum) {
        return new ethers.BrowserProvider(window.ethereum);
    }
    if (RPC_URL) {
        return new ethers.JsonRpcProvider(RPC_URL);
    }
    throw new Error("No provider: add VITE_RPC_URL or connect a wallet");
}

export function useChronosContract() {
    const contract = useMemo(() => {
        if (!CONTRACT_ADDRESS) return null;
        const provider = getProvider();
        return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    }, []);

    const read = {
        taskCount: async () => {
            const c = getProvider();
            const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, c);
            return await ctr.taskCount();
        },
        getTask: async (id) => {
            const c = getProvider();
            const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, c);
            return await ctr.getTask(id);
        },
    };

    const write = {
        createTask: async (title) => {
            if (!window.ethereum) throw new Error("Wallet required");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            const tx = await ctr.createTask(title);
            return await tx.wait();
        },
        toggleDone: async (id) => {
            if (!window.ethereum) throw new Error("Wallet required");
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const ctr = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            const tx = await ctr.toggleDone(id);
            return await tx.wait();
        },
    };

    return { address: CONTRACT_ADDRESS, contract, read, write };
}
