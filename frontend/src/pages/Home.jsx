import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export default function Home() {
    const [userInfo, setUserInfo] = useState(null);
    const [labels, setLabels] = useState([
        { id: 1, name: "Important", color: "#EF4444", description: "Emails that need immediate attention" },
        { id: 2, name: "Work", color: "#3B82F6", description: "Emails from colleagues and clients" },
        { id: 3, name: "Personal", color: "#10B981", description: "Family, friends, and subscriptions" }
    ]);
    const [newLabel, setNewLabel] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState("#A855F7");
    const [isGmailConnected, setIsGmailConnected] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [labelBeingEdited, setLabelBeingEdited] = useState(null);

    const navigate = useNavigate();

    const colors = [
        "#EF4444", "#F97316", "#EA580C", "#3B82F6", "#0EA5E9", "#06B6D4",
        "#10B981", "#22C55E", "#84CC16", "#A855F7", "#D946EF", "#EC4899",
        "#EAB308", "#F59E0B", "#14B8A6", "#6366F1", "#8B5CF6", "#78716C"
    ];

    useEffect(() => {
        const data = localStorage.getItem("smart-inboxer");
        if (data) {
            const user = JSON.parse(data);
            setUserInfo(user);
        } else {
            alert("Login required");
            navigate("/login");
        }
    }, []);

    const handleAddLabel = () => {
        if (newLabel.trim()) {
            setLabels([
                ...labels,
                {
                    id: labels.length + 1,
                    name: newLabel,
                    description: newDescription,
                    color: selectedColor
                }
            ]);
            setNewLabel("");
            setNewDescription("");
        }
    };

    const handleDeleteLabel = (id) => {
        setLabels(labels.filter(label => label.id !== id));
    };

    const handleEditLabel = (label) => {
        setLabelBeingEdited(label);
        setEditModalOpen(true);
    };

    const handleUpdateLabel = () => {
        setLabels(labels.map(label => {
            if (label.id === labelBeingEdited.id) {
                return labelBeingEdited;
            }
            return label;
        }));
        setEditModalOpen(false);
        setLabelBeingEdited(null);
    };

    const userName = userInfo?.user?.name || "User";

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-gray-800 p-8 relative">
            {/* Greeting */}
            <div className="max-w-[90%] mx-auto mb-8">
                <h1 className="text-4xl font-bold text-white">Welcome back, {userName}! 👋</h1>
                <p className="text-gray-400 mt-2">Manage your email labels and connections here</p>
            </div>

            {/* Gmail + Labels */}
            <div className="max-w-[90%] mx-auto space-y-6">

                {/* Gmail Section */}
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

                {/* Labels Section */}
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">🏷️</span>
                        <h2 className="text-2xl font-bold text-white">Custom Labels</h2>
                    </div>

                    {/* Add Label */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            value={newLabel}
                            onChange={(e) => setNewLabel(e.target.value)}
                            placeholder="Label"
                            className="w-[150px] px-4 py-2 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Description"
                            className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <div className="relative">
                            <div
                                onClick={() => setShowColorPicker(!showColorPicker)}
                                className="px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 flex items-center gap-2 cursor-pointer"
                            >
                                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor }}></div>
                                <span>Pick Color</span>
                            </div>
                            {showColorPicker && (
                                <div className="absolute top-full mt-2 p-4 bg-zinc-800 rounded-xl border border-zinc-700 grid grid-cols-6 gap-2 z-10 w-60">
                                    {colors.map(color => (
                                        <div
                                            key={color}
                                            onClick={() => {
                                                setSelectedColor(color);
                                                setShowColorPicker(false);
                                            }}
                                            className="w-6 h-6 rounded-full cursor-pointer hover:ring-2 hover:ring-white"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleAddLabel}
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold flex items-center gap-2 cursor-pointer"
                        >
                            ➕ Add Label
                        </button>
                    </div>

                    {/* Labels Display */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {labels.map(label => (
                            <div key={label.id} className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:ring-1 hover:ring-purple-600">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: label.color }}></div>
                                        <span className="text-white font-medium">{label.name}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditLabel(label)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md cursor-pointer transition"
                                            title="Edit"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteLabel(label.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-md cursor-pointer transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        </div>


                                </div>
                                <p className="text-gray-400 text-sm line-clamp-2 overflow-hidden">
                                    {label.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editModalOpen && labelBeingEdited && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40">
                    <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 w-[90%] md:w-[400px] space-y-4 shadow-xl">
                        <h3 className="text-xl text-white font-bold">Edit Label</h3>
                        <input
                            type="text"
                            value={labelBeingEdited.name}
                            onChange={(e) =>
                                setLabelBeingEdited({ ...labelBeingEdited, name: e.target.value })
                            }
                            className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                            placeholder="Label name"
                        />
                        <textarea
                            value={labelBeingEdited.description}
                            onChange={(e) =>
                                setLabelBeingEdited({ ...labelBeingEdited, description: e.target.value })
                            }
                            className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                            placeholder="Label description"
                        />

                        {/* Color Picker */}
                        <div>
                            <p className="text-white text-sm mb-2">Choose Color</p>
                            <div className="grid grid-cols-6 gap-2">
                                {colors.map(color => (
                                    <div
                                        key={color}
                                        onClick={() =>
                                            setLabelBeingEdited({ ...labelBeingEdited, color })
                                        }
                                        className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                                            labelBeingEdited.color === color ? "border-white" : "border-transparent"
                                        }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="px-4 py-2 text-sm bg-zinc-700 text-white rounded-xl hover:bg-zinc-600 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateLabel}
                                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-xl hover:bg-purple-700 cursor-pointer"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
