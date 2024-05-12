import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

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
                        'Authorization': `Bearer ${token}`,
                    },
                });

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


