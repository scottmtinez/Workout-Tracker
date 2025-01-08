import React, { useState } from 'react';
import './Account.css';

const Account = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [signupData, setSignupData] = useState({ username: "", fullName: "", email: "", password: "", confirmPassword: "" });
    const [user, setUser] = useState(null); // State to hold the logged-in user's information

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value }); 
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: loginData.username,
                    password: loginData.password,
                }),
            });
    
            if (response.ok) {
                const userData = await response.json();
                setUser(userData); // Set the user data in state
                setLoginData({ username: "", password: "" }); // Clear login form
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Failed to login");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred while logging in.");
        }
    };
                                                                                                                    
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (signupData.password !== signupData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        // Simulate successful signup
        setUser({ username: signupData.username, fullName: signupData.fullName, email: signupData.email }); // Set user data
        setSignupData({ username: "", fullName: "", email: "", password: "", confirmPassword: "" }); // Clear signup form
    };

    return (
        <div className="Account-container">
            {user ? (
                <div className="Account-user-info-box">
                    <h2 className='Account-user-info-title'>{user.username}</h2>
                    <p className='Account-user-fullName'>{user.fullName}</p>
                    <p className='Account-user-email'>{user.email}</p>
                    <p className='Account-user-email'>{user.password}</p>
                    <button className="Account-logout-button" onClick={() => setUser(null)}>
                        Logout
                    </button>
                </div>
            ) : isLoginForm ? (
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
                        <button
                            className="to-signup-box"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsLoginForm(false);
                            }}
                        >
                            Don't have an account? <span className="link">Signup</span>
                        </button>
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
                        <button
                            className="to-login-box"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsLoginForm(true);
                            }}
                        >
                            Already have an account? <span className="link">Login</span>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Account;
