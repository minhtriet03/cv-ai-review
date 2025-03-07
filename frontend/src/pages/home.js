import React from 'react';
import SignupSection from '../components/Home/section4';
import TestimonialsSection from '../components/Home/section5';
import HeroSection from '../components/Home/section1';
import IntroSection from '../components/Home/section2';
const Home = () => { 
    return (
        <div>
            <HeroSection/>
            <IntroSection />
            <SignupSection />
            <TestimonialsSection />
        </div>
    );
}
export default Home;