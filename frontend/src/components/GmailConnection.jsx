import { useState } from "react";

export default function GmailConnection() {
    const [isGmailConnected, setIsGmailConnected] = useState(false);

    return (
        // Gmail Section
        <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-2xl">📧</span>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Gmail Integration</h2>
                        <p className="text-gray-400">
                            {isGmailConnected
                                ? "Your Gmail account is connected"
                                : "Connect your Gmail account to start organizing your emails"}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsGmailConnected(true)}
                    className={`px-6 py-3 rounded-xl font-semibold transition duration-200 flex items-center gap-2 cursor-pointer ${
                        isGmailConnected
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-purple-600 hover:bg-purple-700"
                    }`}
                >
                    <span className="text-xl">🔗</span>
                    {isGmailConnected ? "Connected ✓" : "Connect Gmail"}
                </button>
            </div>
        </div>
    );
}