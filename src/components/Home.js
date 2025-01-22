import React, { useState, useEffect } from 'react';
import './Home.css';


const Home = () => {
    //States
        const [user, setUser] = useState(null);

    // Retrieve user data from localStorage when the component mounts
        useEffect(() => {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                setUser(JSON.parse(storedUser));
                console.log('User data retrieved from localStorage:', storedUser); // For Testing
            }
        }, []); // Runs only once when the component mounts

    return (
        <div className='home-background'>
            <div className='home-main-container'>
                <div className='home-main-image'>
                    
                </div>
                <div className='home-exercies-tab-container'>
                    <div className='home-exercies1-plan'>
                        <span className='home-exercise-sub-title'>POWERLIFTING WORKOUT</span>
                        <span className='home-exercise-price'>$19.99</span>
                    </div>
                    <div className='home-exercies2-plan'>
                        <span className='home-exercise-sub-title'>BODYBUILDING WORKOUT</span>
                        <span className='home-exercise-price'>$19.99</span>
                    </div>
                    <div className='home-exercies3-plan'>
                        <span className='home-exercise-sub-title'>GROUP RUN PLAN</span>
                        <span className='home-exercise-price'>$9.99</span>
                    </div>
                    <div className='home-exercies4-plan'>
                        <span className='home-exercise-sub-title'>LEG DAY PLAN</span>
                        <span className='home-exercise-price'>$19.99</span>
                    </div>
                    <div className='home-exercies5-plan'>
                        <span className='home-exercise-sub-title'>MORNING YOGA PLAN</span>
                        <span className='home-exercise-price'>$14.99</span>
                    </div>
                </div>
                <div className='home-x-container'>
                    
                </div>
                <div className='home-y-container'>

                </div>
                <div className='home-user-counter'>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;
