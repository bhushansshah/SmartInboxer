import { Pencil, Trash2 } from "lucide-react";

export default function LabelCard({ label, onEdit}) {
    const handleEdit = (label) => {
        onEdit(label);
    }

    const handleDelete = (id) => {
        console.log("Deleting label with id:", id);
    }
    return (
        <div key={label.id} className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 hover:ring-1 hover:ring-purple-600">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: label.color }}></div>
                    <span className="text-white font-medium">{label.name}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(label)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-md cursor-pointer transition"
                        title="Edit"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(label.id)}
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
    );
}
