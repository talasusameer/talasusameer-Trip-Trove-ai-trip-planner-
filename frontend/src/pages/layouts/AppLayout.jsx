import React from 'react';
import Navbar from '../../components/NavBar.jsx';
import {Outlet} from "react-router-dom";
import ChatBot from "../../components/ChatBot.jsx";

function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 mt-16">
                <Outlet/>
            </main>
            <ChatBot/>
        </div>
    );
}

export default AppLayout;
