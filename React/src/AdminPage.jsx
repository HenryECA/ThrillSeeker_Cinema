import { RetrieveData, RetrieveFilmList, PatchAdminUserData, UpdateFilmInfo, DeleteFilm } from "./utils";

import { useState, useEffect } from 'react';

import { GetUserList } from "./utils";

import './css/admin.css';

export default function AdminManager() {
    const [activeTab, setActiveTab] = useState('filmDatabase');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <h1>Admin Page</h1>
            <div className="tab-container">
                <button className={activeTab === 'usernameDatabase' ? 'active' : 'deactive'} onClick={() => handleTabChange('usernameDatabase')}>User Database</button>
                <button className={activeTab === 'filmDatabase' ? 'active' : 'deactive'} onClick={() => handleTabChange('filmDatabase')}>Film Database</button>
            </div>
            <div className="tab-content">
                {activeTab === 'usernameDatabase' && (
                    <UserDatabase/>
                )}
                {activeTab === 'filmDatabase' && (
                    <FilmDatabase/>
                )}
            </div>
        </div>
    );
}

function UserDatabase() {
    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');
    const [initialUserList, setInitialUserList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const users = await GetUserList();
                setUserList(users);

            } catch (error) {
                console.error('Error fetching user list:', error);
            }
        }
        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    useEffect(() => {
        // Only set initialUserList if it's empty and userList is initialized
        if (userList.length > 0 && initialUserList.length === 0) {
            setInitialUserList(userList);
        }
    }, [userList, initialUserList]);


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleEditToggle = async (index) => {
        const updatedUserList = [...userList];
        updatedUserList[index].editing = !updatedUserList[index].editing;
    
        console.log("Toggle edit", initialUserList[index]);
    
        setUserList(updatedUserList);
    
        if (!updatedUserList[index].editing) {
            const user = updatedUserList[index];
            const userDataToSend = { ...user };
            delete userDataToSend.editing;
    
            const [code, error] = await PatchAdminUserData(initialUserList[index].username, userDataToSend);
            if (code === 200) {
                setMessage('User data updated successfully');
                
                // Update initialUserList to reflect changes
                const newInitialUserList = [...initialUserList];
                newInitialUserList[index] = userDataToSend;
                setInitialUserList(newInitialUserList);
            } else {
                setMessage(`Error updating user data: ${error}`);
                // Revert changes
                updatedUserList[index] = initialUserList[index];
                setUserList(updatedUserList); // Update userList to reflect reverted changes
            }
    
            // Reset message after 3 seconds
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }  
    };
    

    const handleInputChange = (event, index, field) => {
        const { value } = event.target;
        const updatedUserList = [...userList];
        updatedUserList[index][field] = value;
        setUserList(updatedUserList);
    };

    const filteredUserList = userList.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>User Database</h2>
            <p>Search by Username: </p>
            <input
                type="text"
                placeholder="Search by username"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUserList.map((user, index) => (
                        <tr key={index}>
                            <td>{user.editing ? <input type="text" value={user.username} onChange={(event) => handleInputChange(event, index, 'username')} /> : user.username}</td>
                            <td>{user.editing ? <input type="text" value={user.email} onChange={(event) => handleInputChange(event, index, 'email')} /> : user.email}</td>
                            <td>{user.editing ? <input type="text" value={user.name} onChange={(event) => handleInputChange(event, index, 'name')} /> : user.name}</td>
                            <td>
                                <input type="checkbox" disabled={!user.editing} checked={user.admin} onChange={() => handleInputChange({ target: { value: !user.admin } }, index, 'admin')} />
                            </td>
                            <td className="editBlock">
                                <input type="checkbox" checked={user.editing} onChange={() => handleEditToggle(index)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {message && <p>{message}</p>}
        </div>
    );
}


function FilmDatabase() {
    const [filmList, setFilmList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await RetrieveFilmList();
                setFilmList(data.results);
            } catch (error) {
                console.error('Error fetching film list:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run the effect only once on mount

    console.log(filmList);

    const filteredFilms = filmList.filter(film =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFilmListUpdate = (updatedFilmList) => {
        setFilmList(updatedFilmList);
    };

    const handleDeleteFilm = async (filmId) => {

        if (!window.confirm('Are you sure you want to delete this film?')
        ) {
            return;
        }
        // Implement logic to delete film from the backend or wherever you store the data
        console.log('Deleted film with ID:', filmId);

        // Update filmList in the backend
        const updatedFilmList = filmList.filter(film => film.id !== filmId);
        setFilmList(updatedFilmList);

        // Delete film from the backend
        const [code, error] = await DeleteFilm(filmId);

        if (error) {
            console.error('Error deleting film:', error);
        }}

        

    return (
        <div>
            <h2>Film Database</h2>
            <input
                type="text"
                placeholder="Search by movie title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredFilms.map((film, index) => (
                    <ShowFilmInfo key={index} filmInfo={film} index={index} onDelete={handleDeleteFilm} setFilmList={handleFilmListUpdate}/>
                ))}
            </ul>
        </div>
    );
}


function ShowFilmInfo({ filmInfo, index, onDelete, setFilmList }) {
    const [showDetails, setShowDetails] = useState(false);
    const [editableFields, setEditableFields] = useState({
        director: filmInfo.director,
        actors: filmInfo.actors.join(', '),
        length: filmInfo.length,
        genre: filmInfo.genre,
        language: filmInfo.language,
        release_year: filmInfo.release_year,
        summary: filmInfo.summary
    });

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableFields({
            ...editableFields,
            [name]: value
        });
    };

    const handleSaveChanges = () => {
        // Implement logic to save changes to the backend or wherever you store the data
        console.log('Saved changes:', editableFields);

        // Split the actors string into an array
        const actorsArray = editableFields.actors.split(',').map(actor => actor.trim());

        // Update film info in the backend
        const updatedFilmData = {
            ...editableFields,
            actors: actorsArray // Replace actors with the array of actors
        };
        
        UpdateFilmInfo(filmInfo.id, updatedFilmData);

        // Update filmInfo to reflect changes
        const updatedFilmInfo = {
            ...filmInfo,
            ...updatedFilmData // Merge updatedFilmData with filmInfo
        };
    
        // Hide details after saving changes
        setShowDetails(false);
    
        // Reset editableFields to original values
        setEditableFields({
            director: updatedFilmInfo.director,
            actors: updatedFilmInfo.actors.join(', '),
            length: updatedFilmInfo.length,
            genre: updatedFilmInfo.genre,
            language: updatedFilmInfo.language,
            release_year: updatedFilmInfo.release_year,
            summary: updatedFilmInfo.summary
        });
    
        // Update filmList in parent component
        setFilmList(prevFilmList => {
            return prevFilmList.map((film, idx) => {
                if (idx === index) {
                    return updatedFilmInfo;
                }
                return film;
            });
        });
    };

    return (
        <li className="film-item">
            <div className="film-title">
                {filmInfo.title} ({filmInfo.release_year})
                <button className="toggle-details-button" onClick={toggleDetails}>
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
                <button className="delete-button" onClick={() => onDelete(filmInfo.id)}>Delete</button>
            </div>
            {showDetails && (
                <div className="film-info">
                    <p><strong>Director:</strong> <input type="text" name="director" value={editableFields.director} onChange={handleInputChange} /></p>
                    <p><strong>Actors:</strong> <input type="text" name="actors" value={editableFields.actors} onChange={handleInputChange} /></p>
                    <p><strong>Duration:</strong> <input type="text" name="length" value={editableFields.length} onChange={handleInputChange} /></p>
                    <p><strong>Genre:</strong> <input type="text" name="genre" value={editableFields.genre} onChange={handleInputChange} /></p>
                    <p><strong>Language:</strong> <input type="text" name="language" value={editableFields.language} onChange={handleInputChange} /></p>
                    <p><strong>Release Year:</strong> <input type="text" name="release_year" value={editableFields.release_year} onChange={handleInputChange} /></p>
                    <p><strong>Summary:</strong> <textarea name="summary" value={editableFields.summary} onChange={handleInputChange} /></p>
                    <button onClick={handleSaveChanges}>Save Changes</button>
                </div>
            )}
        </li>
    );
}



