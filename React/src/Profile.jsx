import { useState } from "react";
import { RetrieveData, PatchUserData } from "./utils"; // Assuming you have a function PatchUserData for updating user data

export default function Profile() {
    const [userData, error] = RetrieveData();
    const [editedUserData, setEditedUserData] = useState({ ...userData });
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        PatchUserData(editedUserData); // Implement this function to update user data
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel the operation?")) {
            window.location.href = "/"; // Redirect to home page
        }
    };

    if (error) {
        return <h1>Not logged in</h1>;
    }

    return (
        <div>
            <h1>Welcome, {userData.name}</h1>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            
            {isEditing ? (
                <>
                    {/* Input fields for editing */}
                    <input
                        type="text"
                        value={editedUserData.name}
                        onChange={(e) =>
                            setEditedUserData({
                                ...editedUserData,
                                name: e.target.value,
                            })
                        }
                    />
                    {/* Repeat for other fields like email, phone, etc. */}
                    
                    {/* Save and Cancel buttons */}
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    {/* Edit button */}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
}
