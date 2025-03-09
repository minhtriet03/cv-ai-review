import React from 'react';


// Components for this page
import SignupSection from '../components/Home/section4';
import TestimonialsSection from '../components/Home/section5';

import IntroSection from '../components/Home/section2';
import WelcomeSection from '../components/Home/section1';

const Home = () => { 
    return (
        <div>
            <WelcomeSection/>
            <IntroSection />
            <SignupSection />
            <TestimonialsSection />
            
        </div>
    );
}
export default Home;