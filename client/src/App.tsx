import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/tasks/new" element={<TaskForm onSuccess={() => window.location.href = '/tasks'} />} />
                <Route path="/tasks/edit/:id" element={<TaskForm onSuccess={() => window.location.href = '/tasks'} />} />
            </Routes>
        </Router>
    );
};

export default App;