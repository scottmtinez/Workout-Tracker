import React, { useState } from 'react';
import './Account.css';

function Account() {
    const [isLoginForm, setIsLoginForm] = useState(true); // Toggle state for forms
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result);
            } else {
                console.error(result.error);
                alert(result.error);
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (signupData.password !== signupData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupData)
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result);
                alert('User created successfully');
            } else {
                console.error(result.error);
                alert(result.error);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up');
        }
    };

    return (
        <div className="Account-container">
            {isLoginForm ? (
                <div>
                    <form className="Account-form-login" onSubmit={handleLoginSubmit}>
                        <h1 className="Account-login-title">LOGIN</h1>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username..."
                            value={loginData.username}
                            onChange={handleLoginChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password..."
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />
                        <input type="submit" value="Login" />
                        <button className='to-signup-box' onClick={() => setIsLoginForm(false)}>Don't have an account? <span className='link'>Signup</span></button>
                    </form>
                </div>
            ) : (
                <div>
                    <form className="Account-form-signup" onSubmit={handleSignupSubmit}>
                        <h1 className="Account-signup-title">SIGN UP</h1>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username..."
                            value={signupData.username}
                            onChange={handleSignupChange}
                            required
                        />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name..."
                            value={signupData.fullName}
                            onChange={handleSignupChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email..."
                            value={signupData.email}
                            onChange={handleSignupChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password..."
                            value={signupData.password}
                            onChange={handleSignupChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password..."
                            value={signupData.confirmPassword}
                            onChange={handleSignupChange}
                            required
                        />
                        <input type="submit" value="Signup" />
                        <button className='to-login-box' onClick={() => setIsLoginForm(true)}>Already have an account? <span className='link'>Login</span></button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Account;

