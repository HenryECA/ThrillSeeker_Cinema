import { useState, useEffect } from "react";
import { RetrieveData, PatchUserData } from "./utils";

export default function Profile() {
    const [userData, error] = RetrieveData();
    const [initialUserData, setInitialUserData] = useState({});
    const [editedUserData, setEditedUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (!error && userData) {
            setInitialUserData(userData);
            setEditedUserData(userData);
        }
    }, [userData, error]);

    const handleSave = () => {
        PatchUserData(editedUserData);
        setIsEditing(false);
        setHasChanges(false);

        // Update initialUserData to match editedUserData
        setInitialUserData(editedUserData);

        //window.location.href = "/";
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel the operation?")) {
            setEditedUserData(initialUserData); // Reset to initial values
            setIsEditing(false);
            setHasChanges(false);
        }
    };

    const handleChange = (e, field) => {
        const newValue = e.target.value;
        setEditedUserData(prevData => ({
            ...prevData,
            [field]: newValue
        }));
        if (!hasChanges) {
            setHasChanges(true);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            // Delete user
            // Redirect to login page
            console.log("Deleting user...");
            const link = "http://127.0.0.1:8000/api/users/me/destroy/" ;

            fetch(link, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                credentials: 'include',
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = "/";
                } else {
                    throw new Error('Something went wrong');
                }
            })
        }
    }

    if (error) {
        return <h1>Not logged in</h1>;
    }

    return (
        <div className="container">
            <h2>Profile</h2>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    value={isEditing ? editedUserData.username : userData.username}
                    onChange={(e) => handleChange(e, 'username')}
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    value={isEditing ? editedUserData.email : userData.email}
                    onChange={(e) => handleChange(e, 'email')}
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    value={isEditing ? editedUserData.name : userData.name}
                    onChange={(e) => handleChange(e, 'name')}
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="tel"
                    value={isEditing ? editedUserData.phone : userData.phone}
                    onChange={(e) => handleChange(e, 'phone')}
                    disabled={!isEditing}
                />
            </div>

            {!isEditing && (
                <div>
                    <button className="editButton" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="deleteButton" onClick={handleDelete}>Delete Profile</button>
                </div>
            )}

            {isEditing && (
                <div>
                    <button className="saveButton" onClick={handleSave}>Save</button>
                    <button className= "cancelButton" onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
}