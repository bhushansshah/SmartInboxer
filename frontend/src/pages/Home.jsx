import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GmailConnection  from "../components/GmailConnection";
import AddLabelForm from "../components/AddLabelForm";
import useLabels from "../hooks/useLabels";
import LabelsGrid from "../components/LabelsGrid";
import EditLabelModal from "../components/EditLabelModal";

export default function Home() {
    const [userInfo, setUserInfo] = useState(null);
    // const [labels, setLabels] = useState([
    //     { id: 1, name: "Important", color: "#EF4444", description: "Emails that need immediate attention" },
    //     { id: 2, name: "Work", color: "#3B82F6", description: "Emails from colleagues and clients" },
    //     { id: 3, name: "Personal", color: "#10B981", description: "Family, friends, and subscriptions" }
    // ]);
    // const [labelBeingEdited, setLabelBeingEdited] = useState(null);
    const [labels, setLabels, labelBeingEdited, setLabelBeingEdited] = useLabels();
    const [editModalOpen, setEditModalOpen] = useState(false);


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

    const handleEditLabel = (label) => {
        setLabelBeingEdited(label);
        setEditModalOpen(true);
    };

    const onCloseEditModal = () => {
        setEditModalOpen(false);
        setLabelBeingEdited(null);
    };

    const onSaveEditModal = (updatedLabel) => {
        setLabels(labels.map(label => {
            if (label.id === updatedLabel.id) {
                console.log("returning updated label:", updatedLabel);
                return updatedLabel;
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

                <GmailConnection/>

                {/* Labels Section */}
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">🏷️</span>
                        <h2 className="text-2xl font-bold text-white">Custom Labels</h2>
                    </div>

                    <AddLabelForm />

                    {/* Labels Display */}
                    <LabelsGrid labels={labels} handleEditLabel={handleEditLabel} />
                </div>
            </div>

            {/* Edit Modal */}
            {editModalOpen && labelBeingEdited && (
                <EditLabelModal
                    label={labelBeingEdited}
                    onSave={onSaveEditModal}
                    onClose={onCloseEditModal}
                />
            )}

        </div>
    );
}
