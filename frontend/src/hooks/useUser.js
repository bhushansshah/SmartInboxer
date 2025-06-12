import { getUser } from "../api/user";
import { useState, useEffect } from "react";
export default function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const response = await getUser();
            if (response.status === "error") {
                console.error("Error fetching user:", response.message);
                alert(response.message);
                return;
            }

            setUser(response.data);
        }

        fetchUser();
    }, []);

    const updateUser = async () => {
        const response = await getUser();
        if (response.status === "error") {
            console.error("Error fetching user:", response.message);
            alert(response.message);
            return;
        }

        setUser(response.data);
    };

    return { user, updateUser };
}