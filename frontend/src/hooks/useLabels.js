import { useEffect, useState } from 'react';
import { getAllLabels, addLabel, updateLabel, deleteLabel } from '../api/labels';

export default function useLabels() {
    const [labels, setLabels] = useState([]);
    const [labelBeingEdited, setLabelBeingEdited] = useState(null);

    useEffect(() => {
        const fetchLabels = async () => {
            const updatedLabels = await getAllLabels();
            console.log('Getting all the initial labels.')
            console.log('Updated labels:', updatedLabels);
            if(updatedLabels['status'] == "success"){
                setLabels(updatedLabels['data']);
            }
            else{
                console.error("Error fetching labels:", updatedLabels['message']);
                alert(updatedLabels['message']);
                return;
            }
        };
        fetchLabels();
    }, []);

    // Function to add label 
    const addNewLabel = async (newLabel) => {
        if( !newLabel.label_name || !newLabel.label_description || !newLabel.label_color) {
            console.error("Invalid label data");
            return;
        }
        const label = await addLabel(newLabel);
        if(label['status'] == "success") {
            setLabels(prevLabels => [...prevLabels, label['data']]);
        }
        else{
            alert(label['message']);
        }
    }

    const editLabel = async (label_id, updatedLabel) => {
        if(  !updatedLabel.label_name || !updatedLabel.label_description || !updatedLabel.label_color) {
            console.error("Invalid label data");
            return;
        }
        const response = await updateLabel(label_id, updatedLabel);
        if(response['status'] == "success") {
            setLabels(prevLabels => 
                prevLabels.map(l => l._id === response['data']._id ? response['data'] : l)
            );
        }
    };

    const delLabel = async (labelId) => {
        const response = await deleteLabel(labelId);
        if(response['status'] == "success") {
            setLabels(prevLabels => 
                prevLabels.filter(l => l._id !== labelId)
            );
        }
    };

    return [
        labels,
        setLabels,
        labelBeingEdited,
        setLabelBeingEdited,
        addNewLabel,
        editLabel,
        delLabel
    ];
}
