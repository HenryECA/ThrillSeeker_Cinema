import React, { useState, useEffect } from "react";
import { RetrieveData, PatchUserData } from "./utils";
import "./css/profilePage.css";


export default function Profile() {

    const [userData, error] = RetrieveData();
    const [initialUserData, setInitialUserData] = useState({});
    const [editedUserData, setEditedUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!error && userData) {
            setInitialUserData(userData);
            setEditedUserData(userData);
        }
    }, [userData, error]);

    const handleChange = (e, field) => {
        const newValue = e.target.value;

        if (field === 'password') {
            setPassword(newValue);
        } 
        else if (field === 'confirmPassword') {
            setConfirmPassword(newValue);
        } 
        else {
        setEditedUserData(prevData => ({
            ...prevData,
            [field]: newValue
        }
        ));
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your profile?")) {
            // Delete user
            // Redirect to login page
            const link = "http://127.0.0.1:8000/api/users/me/destroy/";

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
            .catch(error => {
                console.error('Error deleting user:', error);
                // Handle error appropriately, such as displaying a message to the user
            });
        }
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel the operation?")) {
            setEditedUserData(initialUserData);
            setIsEditing(false);
            setPassword('');
            setConfirmPassword('');
            setErrorMessage("");
        }
    }

    const handleSave = async () => {
        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        
        try {
            let patchCode, patchErrorFunc;

            let userDataToPatch = {};
    
            // Prepare user data for patching
            if (password !== "") {
                userDataToPatch = { ...editedUserData, password };
            }
            else {
                userDataToPatch = { ...editedUserData };
            }
    
            // Patch user data
            [patchCode, patchErrorFunc] = await PatchUserData(userDataToPatch);
            
            console.log(patchErrorFunc);
            if (patchErrorFunc) {
                setErrorMessage(patchErrorFunc);
            } else {
                setErrorMessage("");
                setIsEditing(false);
                setInitialUserData(editedUserData);
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error) {
            console.error("Error while saving user data:", error);
            setErrorMessage("An error occurred while saving your data. Please try again later.");
        }
    };





    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <form>
            <div className="form-control">
                <label htmlFor="username">Username</label>
                <input
                    autoComplete="off"
                    id="username"
                    type="text"
                    value={isEditing ? editedUserData.username : initialUserData.username}
                    disabled={!isEditing}
                    onChange={(e) => handleChange(e, 'username')}
                />
            </div>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input
                    autoComplete="off"
                    id="email"
                    type="email"
                    value={isEditing ? editedUserData.email : initialUserData.email}
                    disabled={!isEditing}
                    onChange={(e) => handleChange(e, 'email')}
                />
            </div>
            <div className="form-control">
                <label htmlFor="name">Name</label>
                <input
                    autoComplete="off"
                    id="name"
                    type="text"
                    value=  {isEditing ? editedUserData.name : initialUserData.name}
                    disabled={!isEditing}
                    onChange={(e) => handleChange(e, 'name')}
                />
            </div>
            <div className="form-control">
                <label htmlFor="phone">Phone Number</label>
                <input
                    autoComplete="off"
                    id= "phone"
                    type="tel"
                    value={isEditing ? editedUserData.phone : initialUserData.phone}
                    disabled={!isEditing}
                    onChange={(e) => handleChange(e, 'phone')}
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
                <div className="form-control">
                    <label htmlFor="password">New Password</label>
                    <input
                        autoComplete="off"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => handleChange(e, 'password')}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        autoComplete="off"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => handleChange(e, 'confirmPassword')}
                    />
                </div>
                {errorMessage && <div>{errorMessage}</div>}
                <button className="saveButton" onClick={handleSave}>Save</button>
                <button className="cancelButton" onClick={handleCancel}>Cancel</button>
            </div>
            )}
            </form>
        </div>
    );
}



