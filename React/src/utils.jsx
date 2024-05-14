import React, { useState, useEffect } from 'react';

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


export function PatchUserData(newData) {
    const patchPath = "http://127.0.0.1:8000/api/users/me/update/";

    fetch(patchPath, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true',
            'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(newData),
    })

    .then((response) => {
        if (!response.ok) {
            console.error('Error:', response);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}


