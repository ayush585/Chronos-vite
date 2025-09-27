// src/lib/hooks.js
import { useEffect, useMemo, useRef, useState } from "react";

export function useInterval(fn, delayMs) {
    const savedRef = useRef(fn);
    useEffect(() => { savedRef.current = fn; }, [fn]);
    useEffect(() => {
        if (delayMs == null) return;
        const id = setInterval(() => savedRef.current(), delayMs);
        return () => clearInterval(id);
    }, [delayMs]);
}

export function useWallet() {
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const eth = window.ethereum;
        if (!eth) return;

        const handleAccounts = (accs) => setAccount(accs?.[0] || null);
        const handleChain = (id) => setChainId(Number(id));

        eth.request({ method: "eth_accounts" }).then(handleAccounts).finally(() => setReady(true));
        eth.request({ method: "eth_chainId" }).then((id) => handleChain(id));

        eth.on?.("accountsChanged", handleAccounts);
        eth.on?.("chainChanged", (id) => {
            handleChain(id);
            // reload to refresh providers/contracts cleanly
            window.location.reload();
        });

        return () => {
            eth.removeListener?.("accountsChanged", handleAccounts);
            eth.removeListener?.("chainChanged", handleChain);
        };
    }, []);

    const connect = async () => {
        const eth = window.ethereum;
        if (!eth) throw new Error("No wallet found");
        const accs = await eth.request({ method: "eth_requestAccounts" });
        setAccount(accs?.[0] || null);
    };

    return { account, chainId, ready, connect, hasProvider: !!window.ethereum };
}

export function useToggle(initial = false) {
    const [on, setOn] = useState(!!initial);
    const api = useMemo(() => ({
        on: () => setOn(true),
        off: () => setOn(false),
        toggle: () => setOn((v) => !v),
    }), []);
    return [on, api];
}
