import React from "react";
import { useAuth } from "../AuthContext";
import logo from '../assets/barnmonitor-logo.svg';
import { Link } from 'react-router-dom';

function Sidebar() {
   
    const auth = useAuth();

  return (
    <>
    <nav className="bg-background h-screen p-6 shadow-2xl overflow-auto md:w-56">
        <aside className="flex flex-col justify-center items-center h-full p-30">            
            <div className='flex items-center justify-center mb-5'>
                <a href="/dashboard">
                    <img
                        src={logo}
                        alt="barn-monitor-logo"
                        className="w-[60%] h-[60%] ms-7"
                    />
                </a> 
            </div>
            <ul className="space-y-4 text-lg text-gray-700">                
                <li>
                    <Link to="/dashboard" className="hover:text-secondary_1 hover:font-bold">Dashboard</Link>
                </li>
                <li>
                    <Link to="/animals" className="hover:text-secondary_1 hover:font-bold">Animals</Link>
                </li>
                <li>
                    <Link to="/animal_types" className="hover:text-secondary_1 hover:font-bold">Animal Type</Link>
                </li>
                <li>
                    <Link to="/sales" className="hover:text-secondary_1 hover:font-bold">Sale</Link>
                </li>                
                <li>
                    <Link to="/production" className="hover:text-secondary_1 hover:font-bold active:text-primary_2">Production</Link>
                </li>
                <li>
                    <Link to="/health_records" className="hover:text-secondary_1 hover:font-bold">Health Records</Link>
                </li>                
                <li>
                    <Link to="/feeds" className="hover:text-secondary_1 hover:font-bold">Feed</Link>
                </li>
                <li>
                    <Link to="/profile" className="hover:text-secondary_1 hover:font-bold">Profile</Link>
                </li>
                <li>
                    <Link onClick={() => auth.handleLogOut()} to="/" className="p-2 font-bold text-white bg-secondary_1 hover:bg-primary_2-dark rounded-lg transition duration-200 active:bg-gradient-to-r active:from-green-400 active:to-blue-500">Logout</Link>
                </li>
            </ul>
        </aside>
    </nav>

    </>
  );
}

export default Sidebar;
