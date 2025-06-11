import { useState } from 'react';

export default function EditLabelModal({ label, onSave, onClose }) {
    const [labelBeingEdited, setLabelBeingEdited] = useState(label);
    const colors = [
        "#EF4444", "#F97316", "#EA580C", "#3B82F6", "#0EA5E9", "#06B6D4",
        "#10B981", "#22C55E", "#84CC16", "#A855F7", "#D946EF", "#EC4899",
        "#EAB308", "#F59E0B", "#14B8A6", "#6366F1", "#8B5CF6", "#78716C"
    ];

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40">
            <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 w-[90%] md:w-[400px] space-y-4 shadow-xl">
                <h3 className="text-xl text-white font-bold">Edit Label</h3>
                <input
                    type="text"
                    value={labelBeingEdited.label_name}
                    onChange={(e) =>
                        setLabelBeingEdited({ ...labelBeingEdited, label_name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-xl bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                    placeholder="Label name"
                />
                <textarea
                    value={labelBeingEdited.label_description}
                    onChange={(e) =>
                        setLabelBeingEdited({ ...labelBeingEdited, label_description: e.target.value })
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
                                    setLabelBeingEdited({ ...labelBeingEdited, label_color: color })
                                }
                                className={`w-6 h-6 rounded-full cursor-pointer border-2 ${labelBeingEdited.label_color === color ? "border-white" : "border-transparent"
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm bg-zinc-700 text-white rounded-xl hover:bg-zinc-600 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            console.log("Saving label:", labelBeingEdited);
                            onSave(labelBeingEdited);
                        }}
                        className="px-4 py-2 text-sm bg-zinc-700 text-white rounded-xl hover:bg-zinc-600 cursor-pointer"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
