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
                        <span className='test'>POWERLIFTING WORKOUT</span>
                    </div>
                    <div className='home-exercies2-plan'>
                        <span className='test'>BODYBUILDING WORKOUT</span>
                    </div>
                    <div className='home-exercies3-plan'>
                        <span className='test'>GROUP RUN PLAN</span>
                    </div>
                    <div className='home-exercies4-plan'>
                        <span className='test'>LEG DAY</span>
                    </div>
                    <div className='home-exercies5-plan'>
                        <span className='test'>MORNING YOGA PLAN</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;