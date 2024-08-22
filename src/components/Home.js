import React, { useState, useEffect } from 'react';
import './Home.css';


function Home(){
    return (
        <div className='home-background'>
            <div className='home-main-container'>
                <div className='home-main-image'>
                    
                </div>
                <div className='home-exercies-tab-container'>
                    <div className='home-exercies1-plan'>
                        <span className='home-exercise-sub-title'>POWERLIFTING WORKOUT</span>
                    </div>
                    <div className='home-exercies2-plan'>
                        <span className='home-exercise-sub-title'>BODYBUILDING WORKOUT</span>
                    </div>
                    <div className='home-exercies3-plan'>
                        <span className='home-exercise-sub-title'>GROUP RUN PLAN</span>
                    </div>
                    <div className='home-exercies4-plan'>
                        <span className='home-exercise-sub-title'>LEG DAY</span>
                    </div>
                    <div className='home-exercies5-plan'>
                        <span className='home-exercise-sub-title'>MORNING YOGA PLAN</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;