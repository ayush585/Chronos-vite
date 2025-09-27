export default function Navbar() {
    return (
        <header className="border-b border-white/10 bg-gray-950/80 backdrop-blur">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold">CHRONOS ⏱️</h1>
                <nav className="space-x-4 text-sm">
                    <a href="/" className="hover:text-blue-400">Home</a>
                    <a href="/about" className="hover:text-blue-400">About</a>
                </nav>
            </div>
        </header>
    );
}
