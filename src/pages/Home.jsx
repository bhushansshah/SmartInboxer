import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [userInfo, setUserInfo] = useState(null);
    const [labels, setLabels] = useState([
        { id: 1, name: "Important", color: "red" },
        { id: 2, name: "Work", color: "blue" },
        { id: 3, name: "Personal", color: "green" }
    ]);
    const [newLabel, setNewLabel] = useState("");
    const [selectedColor, setSelectedColor] = useState("purple");
    const [isGmailConnected, setIsGmailConnected] = useState(false);
    
    const navigate = useNavigate();
    
    const colors = ["purple", "red", "blue", "green", "yellow", "pink"];

    useEffect(() => {
        const data = localStorage.getItem("smart-inboxer");
        console.log("Data from localStorage:", data);
        if (data) {
            const user = JSON.parse(data);
            setUserInfo(user);
        } else {
            alert("Login required");
            navigate("/login");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("smart-inboxer");
        setUserInfo(null);
        navigate("/login");
    };

    const handleAddLabel = () => {
        if (newLabel.trim()) {
            setLabels([
                ...labels,
                { id: labels.length + 1, name: newLabel, color: selectedColor }
            ]);
            setNewLabel("");
        }
    };

    const handleDeleteLabel = (id) => {
        setLabels(labels.filter(label => label.id !== id));
    };

    const handleConnectGmail = () => {
        // Dummy function - will be implemented later
        setIsGmailConnected(true);
    };

    const userName = userInfo?.user?.name || "User";

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-gray-800 p-8">
            {/* Greeting Section */}
            <div className="max-w-[90%] mx-auto mb-8">
                <h1 className="text-4xl font-bold text-white">
                    Welcome back, {userName}! 👋
                </h1>
                <p className="text-gray-400 mt-2">
                    Manage your email labels and connections here
                </p>
            </div>

            <div className="max-w-[90%] mx-auto space-y-6">
                {/* Gmail Connection Section */}
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
                            onClick={handleConnectGmail}
                            className={`px-6 py-3 rounded-xl font-semibold transition duration-200 flex items-center gap-2 ${
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

                {/* Labels Management Section */}
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">🏷️</span>
                        <h2 className="text-2xl font-bold text-white">Custom Labels</h2>
                    </div>
                    
                    {/* Add New Label */}
                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            placeholder="Enter label name"
                            className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <select
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            {colors.map(color => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleAddLabel}
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold transition duration-200 flex items-center gap-2"
                        >
                            <span>➕</span>
                            Add Label
                        </button>
                    </div>

                    {/* Labels Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {labels.map(label => (
                            <div
                                key={label.id}
                                className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800"
                            >
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="w-4 h-4 rounded-full" 
                                        style={{ backgroundColor: label.color }}
                                    ></div>
                                    <span className="text-white">{label.name}</span>
                                </div>
                                <button
                                    onClick={() => handleDeleteLabel(label.id)}
                                    className="text-red-500 hover:text-red-400 transition duration-200"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logout Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition duration-200 flex items-center gap-2"
                    >
                        <span>🚪</span>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}