import { useState, useEffect } from 'react';

export function RetrieveData() {
    const [userData, setUserData] = useState({});
    const [hasError, setHasError] = useState(false);

    // let sessionid = document.Cookies.get('sessionid');
    // let csrftoken = document.Cookies.get('csrftoken');

    // console.log(sessionid);
    // console.log(csrftoken);

    useEffect(() => {
        const fetchData = async () => {
            const retrievePath = "http://127.0.0.1:8000/api/users/me/profile";
            try {
                const response = await fetch(retrievePath, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true',
                        'Access-Control-Allow-Credentials': 'true',
                    },
                    credentials: 'include',
                    
                });

                console.log(response);

                if (!response.ok) {
                    console.error('Error:', response);
                    setHasError(true);
                    setUserData({});
                    return;
                }

                const data = await response.json();
                setUserData(data);
                setHasError(false);
            } catch (error) {
                console.error('Error:', error);
                setHasError(true);
                setUserData({});
            }
        };

        fetchData();
    }, []);

    return [userData, hasError];
}


export async function PatchUserData(newData) {
    const patchPath = "http://127.0.0.1:8000/api/users/me/update/";
    
    var code = 0;
    var error = '';


    try {
        const response = await fetch(patchPath, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true',
                'Access-Control-Allow-Credentials': 'true',
            },
            credentials: 'include',
            body: JSON.stringify(newData),
        });

        if (!response.ok) {

            if (response.status === 400) {
                error = 'Invalid data. Please check your inputs.';
            }
            else if (response.status === 409) {
                error = 'Fields already in use:';
                const responseJson = await response.json();
                console.log('Response JSON:', responseJson);

                if (responseJson.error.includes('username')) {
                    error += ' Username';
                }
                if (responseJson.error.includes('email')) {
                    error += ' Email';
                }
            }
            else if (response.status === 500) {
                error = 'An error occurred. Please try again later.';
            }
            else {
                error = 'An unknown error occurred.';
            }
        }

        code = response.status;
    } catch (err) {
        console.error('PatchUserData Error:', err);
        error = err.message;
    }

    console.log(code);
    return [code, error];
}


export async function GetUserList() {
    const retrievePath = "http://127.0.0.1:8000/api/users/list/";
    var userList = [];

    try {
        const response = await fetch(retrievePath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true',
                'Access-Control-Allow-Credentials': 'true',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            console.error('Error:', response);
            return [];
        }

        userList = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }

    return userList;

}



export async function PatchAdminUserData(username, user) {
    console.log('PatchAdminUserData:', username, user);

    const patchPath = `http://127.0.0.1:8000/api/users/me/update/${encodeURIComponent(username)}/`

    var code = 0;
    var error = '';

    try {
        const response = await fetch(patchPath, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true',
                'Access-Control-Allow-Credentials': 'true',
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            if (response.status === 400) {
                error = 'Invalid data. Please check your inputs.';
            }
            else if (response.status === 409) {
                error = 'Fields already in use:';
                const responseJson = await response.json();
                console.log('Response JSON:', responseJson);

                if (responseJson.error.includes('username')) {
                    error += ' Username';
                }
                if (responseJson.error.includes('email')) {
                    error += ' Email';
                }
            }
            else if (response.status === 500) {
                error = 'An error occurred. Please try again later.';
            }
            else {
                error = 'An unknown error occurred.';
            }
        }

        code = response.status;
    } catch (err) {
        console.error('PatchAdminUserData Error:', err);
        error = err.message;
    }
    
    console.log(code);
    return [code, error];

}


export async function UpdateFilmReview(film, user, rating) {
    const path = "http://127.0.0.1:8000/film/userReview/";

    const reviewData = {
        film: film,
        user: user,
        rating: rating
    };

    try {
        const response = await fetch(path, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            throw new Error('Failed to update film review');
        }

        const filmData = await response.json();

        return filmData;

    } catch (error) {
        console.error('Error:', error);
        return null; // or throw error if desired
    }
}

export async function RetrieveFilmList(){

    const path = "http://127.0.0.1:8000/films/";

    try {
        const response = await fetch(path, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve film list');
        }

        const filmData = await response.json();
        
        console.log('FilmData:', filmData);
        return filmData;

    } catch (error) {
        console.error('Error:', error);
        return null; // or throw error if desired
    }
}


export async function UpdateFilmInfo(index, film){
    
    const path = "http://127.0.0.1:8000/films/" + index + "/update/";

    console.log('UpdateFilmInfo:', film, index);
    console.log('Path:', path);

    try {
        const response = await fetch(path, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(film),
        });

        if (!response.ok) {
            throw new Error('Failed to update film info');
        }

        const filmData = await response.json();

        return filmData;

    } catch (error) {
        console.error('Error:', error);
        return null; // or throw error if desired
    }
}


export async function DeleteFilm(index){
    
    const path = "http://127.0.0.1:8000/films/" + index + "/delete/"

    var code = 0;
    var error = '';

    try {
        const response = await fetch(path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return response.status, response.statusText;
            throw new Error('Failed to delete film');
        }

        code = response.status;

    } catch (error) {
        console.error('Error:', error);
        return 400, error; // or throw error if desired
    }

    return code, error;
}


export async function CreateFilm(film){
    
    const path = "http://127.0.0.1:8000/films/create/"

    try {
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(film),
        });

        if (!response.ok) {
            throw new Error('Failed to create film');
        }

        const filmData = await response.json();

        return filmData;

    } catch (error) {
        console.error('Error:', error);
        return null; // or throw error if desired
    }
}