import { useState } from 'react';
import ColorPicker from './ColorPicker';
import { Form } from 'react-router-dom';

export default function AddLabelForm() {
    const [newLabel, setNewLabel] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState("#A855F7");
    const [showColorPicker, setShowColorPicker] = useState(false);

    const colors = [
        "#EF4444", "#F97316", "#EA580C", "#3B82F6", "#0EA5E9", "#06B6D4",
        "#10B981", "#22C55E", "#84CC16", "#A855F7", "#D946EF", "#EC4899",
        "#EAB308", "#F59E0B", "#14B8A6", "#6366F1", "#8B5CF6", "#78716C"
    ];

    const handleAddLabel = () => {
        if (newLabel.trim()) {
            // setLabels([
            //     ...labels,
            //     {
            //         id: labels.length + 1,
            //         name: newLabel,
            //         description: newDescription,
            //         color: selectedColor
            //     }
            // ]);
            setNewLabel("");
            setNewDescription("");
        }
    };

    return (
        // Add Label Form
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
    );
}
