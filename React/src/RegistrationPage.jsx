import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './css/registration.css';


export default function RegistrationPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== repeatPassword) {
            setErrorMessage("Passwords don't match");
            return;
        } else {
            setErrorMessage('');
        }

        const registerPath = 'http://127.0.0.1:8000/api/users/'; // Your backend URL

        const formData = {
            username,
            email,
            name,
            phone,
            password
        };

        try {
            const response = await fetch(registerPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                if (response.status === 400) {
                    setErrorMessage('Invalid data. Please check your inputs.');
                } else if (response.status === 409) {
                    let message = "Fields already in use:";

                    const responseJson = await response.json();
                    console.log('Response JSON:', responseJson);

                    if (responseJson.error.includes('username')) {
                        message += ' Username';
                    }
                    if (responseJson.error.includes('email')) {
                        message += ' Email';
                    }

                    setErrorMessage(message);

                    // Color input fields red if username or email are in use
                    if (responseJson.error.includes('username')) {
                        document.getElementById('username').classList.add('error');
                    }
                    if (responseJson.error.includes('email')) {
                        document.getElementById('email').classList.add('error');
                    }

                } else if (response.status === 500) {
                    setErrorMessage('An error occurred. Please try again later.');
                } else {
                    setErrorMessage('An unknown error occurred.');
                }
                return;
            }
            
            // If register is successful, make login request to create session

            const loginPath = "http://127.0.0.1:8000/api/users/login/"

            const loginResponse = await fetch(loginPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!loginResponse.ok) {
                setErrorMessage('An error occurred. Please try again later.');
                return;
            }

            
            // Handle successful response
            console.log('Form submitted successfully');
            window.location.href = '/'; 
            // Optionally, show a success message or redirect the user
        } catch (error) {
            setErrorMessage('An error occurred. Please try again later.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="form-container">
        
        <div className="registration-cont">
            <h1>Register Profile</h1>
            <form onSubmit={handleSubmit}>
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errorMessage.includes('Email') ? 'error' : ''}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        placeholder="Phone Number"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="repeatPassword">Repeat Password</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        placeholder="Repeat Password"
                        required
                        value={repeatPassword}
                        onChange={(e) => {
                            setRepeatPassword(e.target.value);
                            setErrorMessage(''); // Reset error message when typing in the repeat password field
                        }}
                    />
                </div>
                {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
                <div className="ButtonRegister">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
        </div>
    );
}