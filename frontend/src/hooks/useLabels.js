import { useState } from 'react';

// dummy initial data
const dummyLabels = [
    {
        id: 1,
        name: "Important",
        description: "Emails that are critical",
        color: "#EF4444",
    },
    {
        id: 2,
        name: "Personal",
        description: "Friends and family",
        color: "#F97316",
    },
];

export default function useLabels() {
    const [labels, setLabels] = useState(dummyLabels);
    const [labelBeingEdited, setLabelBeingEdited] = useState(null);

    // For future: fetch labels from API on useEffect if needed
    // useEffect(() => {
    //     async function fetchLabels() {
    //         const res = await fetch("/api/labels");
    //         const data = await res.json();
    //         setLabels(data);
    //     }
    //     fetchLabels();
    // }, []);

    return [
        labels,
        setLabels,
        labelBeingEdited,
        setLabelBeingEdited,
    ];
}
