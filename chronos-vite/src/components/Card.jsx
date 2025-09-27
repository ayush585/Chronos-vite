export default function Card({ title, children }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <div className="text-sm opacity-80">{children}</div>
        </div>
    );
}
