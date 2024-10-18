import React from "react";


function Sidebar() {
  return (
    <>
    <nav className="bg-background h-screen p-6 shadow-2xl overflow-auto md:w-56">
        <aside className="flex flex-col justify-center items-center h-full p-30">
            <a href="#"><h1 className="text-primary_1 font-black text-2xl mb-8">Barn Monitor</h1></a>
            <ul className="space-y-4 text-lg text-gray-700">                
                <li>
                    <a href="/dashboard" className="hover:text-secondary_1 hover:font-bold">Dashboard</a>
                </li>
                <li>
                    <a href="/animals" className="hover:text-secondary_1 hover:font-bold">Animals</a>
                </li>
                <li>
                    <a href="/animal_types" className="hover:text-secondary_1 hover:font-bold">Animal Type</a>
                </li>
                <li>
                    <a href="/feeds" className="hover:text-secondary_1 hover:font-bold">Feed</a>
                </li>
                <li>
                    <a href="/production" className="hover:text-secondary_1 hover:font-bold active:text-primary_2">Production</a>
                </li>
                <li>
                    <a href="/health_records" className="hover:text-secondary_1 hover:font-bold">Health Records</a>
                </li>
                <li>
                    <a href="/sales" className="hover:text-secondary_1 hover:font-bold">Sale</a>
                </li>
                <li>
                    <a href="/farmer" className="hover:text-secondary_1 hover:font-bold">Profile</a>
                </li>
                <li>
                    <a href="#" className="hover:text-secondary_1 hover:font-bold">Logout</a>
                </li>
            </ul>
        </aside>
    </nav>

    </>
  );
}

export default Sidebar;
