// src/lib/timeUtils.js
export const nowSec = () => Math.floor(Date.now() / 1000);

export function formatDate(tsMsOrSec) {
    const ms = tsMsOrSec < 2_000_000_000 ? tsMsOrSec * 1000 : tsMsOrSec;
    return new Date(ms).toLocaleString();
}

export function fromNow(tsMsOrSec) {
    const ms = tsMsOrSec < 2_000_000_000 ? tsMsOrSec * 1000 : tsMsOrSec;
    const diff = Date.now() - ms;
    const abs = Math.abs(diff);
    const mins = Math.round(abs / 60000);
    if (mins < 1) return diff >= 0 ? "just now" : "in a moment";
    if (mins < 60) return diff >= 0 ? `${mins}m ago` : `in ${mins}m`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return diff >= 0 ? `${hrs}h ago` : `in ${hrs}h`;
    const days = Math.round(hrs / 24);
    return diff >= 0 ? `${days}d ago` : `in ${days}d`;
}

export function parseDuration(str) {
    // "10s", "5m", "2h", "1d"
    const m = /^(\d+)\s*([smhd])$/i.exec(String(str || "").trim());
    if (!m) return null;
    const n = Number(m[1]);
    const unit = m[2].toLowerCase();
    const mult = { s: 1, m: 60, h: 3600, d: 86400 }[unit];
    return n * mult; // seconds
}
