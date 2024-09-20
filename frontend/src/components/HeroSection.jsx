// src/components/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import pb from '../pocketbase/pocketbase.js';
import Section from './Section';
import HeroImg from  '../assets/hero.svg'

function HeroSection() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (pb.authStore.isValid) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <Section className="h-screen bg-blue-50">
            {/* Left Text Section */}
            <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Uncover the <br /> AI Travel Plan
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Imagine telling your travel planner, 'Weekend escape to a vibrant city, with a mid-range budget in summer.'
                    <br /><br />
                    Our AI not only understands but crafts a personalized adventure. Discover local secrets, savor culinary delights,
                    and explore iconic landmarks with an itinerary designed just for you.
                </p>
                <button
                    onClick={handleButtonClick}
                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                    {pb.authStore.isValid ? " Go to Dashboard" : "Try for free"}
                </button>
            </div>

            {/* Right Image Section */}
            <div className="md:w-1/2 flex justify-center">
                <img
                    src={HeroImg}
                     alt="Travel"
                    className="max-w-full h-auto"
                    style={{ width: '80%', maxHeight: '80vh' }}
                />
            </div>
        </Section>
    );
}

export default HeroSection;
