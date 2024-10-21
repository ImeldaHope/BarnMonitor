import React from "react";


function Sidebar({onLogout}) {
    function handleLogout() {
        fetch("http://127.0.0.1:5000/logout", {
          method: "DELETE",
        }).then(() => onLogout());
    }

  return (
    <>
    <nav className="bg-background h-screen p-6 shadow-2xl overflow-auto md:w-56">
        <aside className="flex flex-col justify-center items-center h-full p-30">
            <a href="/dashboard"><h1 className="text-primary_1 font-black text-2xl mb-8">Barn Monitor</h1></a>
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
                    <a onClick={handleLogout} href="/" className="p-2 font-bold text-white bg-secondary_1 hover:bg-primary_2-dark rounded-lg transition duration-200 active:bg-gradient-to-r active:from-green-400 active:to-blue-500">Logout</a>
                </li>
            </ul>
        </aside>
    </nav>

    </>
  );
}

export default Sidebar;
