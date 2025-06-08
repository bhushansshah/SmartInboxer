import LabelCard from "./LabelCard";
import useLabels from "../hooks/useLabels";

export default function LabelsGrid({ labels, handleEditLabel }) {
    // const [labels, setLabels, labelBeingEdited, setLabelBeingEdited] = useLabels();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {labels.map(label => (
                <LabelCard
                    key={label.id}
                    label={label}
                    onEdit={handleEditLabel}
                />
            ))}
        </div>
    );
}