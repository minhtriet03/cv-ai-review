import React from 'react';


// Components for this page
import SignupSection from '../components/Home/section4';
import TestimonialsSection from '../components/Home/section5';
import HeroSection from '../components/Home/section1';
import IntroSection from '../components/Home/section2';
import WelcomeSection from '../components/Home/section6';

const Home = () => { 
    return (
        <div>
            <HeroSection/>
            <IntroSection />
            <SignupSection />
            <TestimonialsSection />
            <WelcomeSection/>
        </div>
    );
}
export default Home;