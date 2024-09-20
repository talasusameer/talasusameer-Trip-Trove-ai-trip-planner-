import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import pb from '../pocketbase/pocketbase.js';
import UserPopup from './UserPopup';

function Navbar() {
     const isDashboard = location.pathname === '/dashboard' ? true : location.pathname.startsWith('/trips');
    const [isOpen, setIsOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    const user = pb.authStore.model;
    const userName = user?.name || '' ;
    const firstLetter = userName.charAt(0).toUpperCase();

    // Generate a random background color
    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const avatarColor = randomColor();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center fixed w-full z-10">
            {/* Title */}
            <div className="text-2xl font-bold">
                <Link to="/dashboard">AI Trip Planner</Link>
            </div>

            {/* Menu - Centered */}
            {!isDashboard &&
                 (<div className="hidden md:flex space-x-4">
                <a href="#how-it-works" className="hover:text-gray-400">How it works</a>
                <Link to="/community" className="hover:text-gray-400">Community</Link>
                <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
                </div>)
            }

            {userName !== '' ? (
            <div className="hidden md:flex items-center space-x-2 relative">
                <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" 
                    style={{ backgroundColor: avatarColor }}
                >
                    {firstLetter}
                </div>
                <span 
                    className="cursor-pointer hover:text-gray-400"
                    onClick={togglePopup}
                >
                    {userName}
                </span>
            </div>) :
                (
                    <div className="hidden md:flex items-center space-x-2 relative">
                        <Link to="/login" className="hover:text-gray-400">Login</Link>
                        <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
                    </div>
                    )}

                    {/* Burger Menu Icon for Mobile */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu}>
                            {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div
                            className="md:hidden absolute top-16 left-0 w-full bg-gray-800 flex flex-col items-center space-y-4 py-4">
                            <a href="#how-it-works" onClick={toggleMenu} className="hover:text-gray-400">How it
                                works</a>
                            <a href="#community-plans" onClick={toggleMenu} className="hover:text-gray-400">Community
                                Plans</a>
                            <Link to="/dashboard" onClick={toggleMenu} className="hover:text-gray-400">Dashboard</Link>
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                                    style={{backgroundColor: avatarColor}}
                                >
                                    {firstLetter}
                                </div>
                                <span
                                    className="cursor-pointer hover:text-gray-400"
                                    onClick={togglePopup}
                                >
                            {userName}
                        </span>
                            </div>
                        </div>
                    )}

                    {/* User Popup */}
                    <UserPopup isOpen={isPopupOpen} onClose={togglePopup}/>
                    </nav>
                );
            }

            export default Navbar;