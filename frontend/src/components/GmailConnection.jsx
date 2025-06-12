import { useState, useEffect } from "react";
import { connectGmail, disconnectGmail } from "../api/integrations";

export default function GmailConnection({user, updateUser}) {
    console.log("GmailConnection component rendered with user:", user);
    const [isGmailConnected, setIsGmailConnected] = useState(user?.isGmailConnected);
    
    useEffect(() => {
        setIsGmailConnected(user?.isGmailConnected);
    }, [user])

    const handleConnectGmail = async () => {
        if(isGmailConnected){
            const response = await disconnectGmail();
            if (response && response.status === "success") {
                setIsGmailConnected(false);
                await updateUser(); // Update user state after disconnecting
            } else {
                alert("Failed to disconnect Gmail");
            }
        }
        else{
            const response = await connectGmail();
            if (response && response.status === "success") {
                setIsGmailConnected(true);
                await updateUser(); // Update user state after connecting
            } else {
                alert("Failed to connect Gmail");
            }
        }
    };

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
                    onClick={async () => await handleConnectGmail()}
                    className={`px-6 py-3 rounded-xl font-semibold transition duration-200 flex items-center gap-2 cursor-pointer ${
                        isGmailConnected
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-purple-600 hover:bg-purple-700"
                    }`}
                >
                    <span className="text-xl">🔗</span>
                    {isGmailConnected ? "Disconnect Gmail" : "Connect Gmail"}
                </button>
            </div>
        </div>
    );
}