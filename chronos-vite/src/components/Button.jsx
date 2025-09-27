export default function Button({ label }) {
    return (
        <button className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition">
            {label}
        </button>
    );
}
