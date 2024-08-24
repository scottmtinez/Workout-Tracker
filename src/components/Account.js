import React, { useState, useEffect } from 'react';
import './Account.css';

function Account(){
    return (
        <div className='Account-container'>
            <form className='Account-form-login'>
                <h1 className=''>LOGIN</h1>
                <input type='text' placeholder='Username...' />
                <input type='password' placeholder='Password...'/>
                <input type='submit' value='Login'/>
            </form>

            <form className='Account-form-signup'>
                <h1 className=''>SIGN UP</h1>
                <input type='text' placeholder='Username...' />
                <input type='password' placeholder='Password...'/>
                <input type='submit' value='Signup'/>
            </form>
        </div>
    );
}

export default Account;