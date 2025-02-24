import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Task Manager</Link>
                <div className="flex space-x-4">
                    {localStorage.getItem('token') ? (
                        <>
                            <Link to="/tasks" className="hover:text-blue-200">Tasks</Link>
                            <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                            <Link to="/register" className="hover:text-blue-200">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;