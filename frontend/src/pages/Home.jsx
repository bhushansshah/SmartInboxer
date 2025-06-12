import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GmailConnection  from "../components/GmailConnection";
import AddLabelForm from "../components/AddLabelForm";
import useLabels from "../hooks/useLabels";
import useUser from "../hooks/useUser";
import LabelsGrid from "../components/LabelsGrid";
import EditLabelModal from "../components/EditLabelModal";

export default function Home() {
    const [userInfo, setUserInfo] = useState(null);
    const {user, updateUser} = useUser();
    const [labels, setLabels, labelBeingEdited, setLabelBeingEdited, addNewLabel, editLabel, delLabel] = useLabels();
    const [editModalOpen, setEditModalOpen] = useState(false);

    const addNewLabelHandler = async (newLabel) => {
        await addNewLabel(newLabel);
    }

    const navigate = useNavigate();

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

    const onSaveEditModal = async (updatedLabel) => {
        await editLabel(labelBeingEdited['_id'], updatedLabel);
        setEditModalOpen(false);
        setLabelBeingEdited(null);
    };

    const onDeleteLabelHandler = async (labelId) => {
        await delLabel(labelId);
    }
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

                <GmailConnection user={user} updateUser={updateUser}/>

                {/* Labels Section */}
                <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl">🏷️</span>
                        <h2 className="text-2xl font-bold text-white">Custom Labels</h2>
                    </div>

                    <AddLabelForm addNewLabelHandler={addNewLabelHandler} />

                    {/* Labels Display */}
                    <LabelsGrid labels={labels} handleEditLabel={handleEditLabel} onDeleteLabelHandler={onDeleteLabelHandler} />
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
