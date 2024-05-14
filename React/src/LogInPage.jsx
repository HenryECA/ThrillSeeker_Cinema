import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './css/login.css';


export default function LogInPage() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [login, setLogin] = useState('');
    console.log(sessionStorage.getItem('cookie'))

    let token = sessionStorage.getItem('cookie');

    // We need to make a POST request to the backend to log in
    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginPath = "http://127.0.0.1:8000/api/users/login/"; // Your backend URL

        const formData = {
            username,
            password
        };

        try {
            const response = await fetch(loginPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        
            if (!response.ok) {
                // Handle login errors here
                const errorData = await response.json();
                setErrorMessage(errorData.detail);
                setLogin(false)
                return;
            }
            
            // If login is successful, change state to true
            setLogin(true);

            // console.log(response.json());
            // Get the token from the response
            const data = await response.json();
            token = data.token;
            console.log(token);

            // Redirect to the home page
            window.location.href = '/';            
        }
        catch (error) {
            console.error('Error:', error);
            // Handle network errors here
            setErrorMessage('Network error. Please try again later.');
        }
    }
    
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            <div className="login-cont">
            <h1>Login</h1>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={errorMessage.includes('Username') ? 'error' : ''}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errorMessage.includes('Password') ? 'error' : ''}
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Login</button>
            </div>
            </form>
        </div>
    );
}