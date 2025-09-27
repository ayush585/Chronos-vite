import { useState } from "react";
import { useChronosContract } from "../contracts/useChronos";

export function TaskDemo() {
    const { write, read, address } = useChronosContract();
    const [title, setTitle] = useState("");
    const [lastId, setLastId] = useState(null);

    return (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm opacity-80 mb-2">Contract: {address || "not set"}</p>
            <div className="flex gap-2">
                <input
                    className="px-3 py-2 rounded-lg bg-white/10 outline-none"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={async () => {
                        await write.createTask(title || "Untitled");
                        // const created = rc?.logs?.[0]; // naive; depends on chain/abi coder
                        setLastId("Created! (check explorer)");
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
                >
                    Create
                </button>
                <button
                    onClick={async () => {
                        const n = await read.taskCount();
                        alert(`Task count: ${n}`);
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600"
                >
                    Count
                </button>
            </div>
            <div className="mt-3 text-xs opacity-70">{lastId}</div>
        </div>
    );
}
