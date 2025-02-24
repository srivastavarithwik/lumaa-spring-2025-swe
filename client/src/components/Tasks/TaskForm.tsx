import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const { id } = useParams(); // Get the task ID from the URL
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const navigate = useNavigate();

    // Fetch task details when the component mounts (if editing)
    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
                        headers: { Authorization: `${token}` },
                    });
                    const task = response.data;
                    setTitle(task.title);
                    setDescription(task.description);
                    setIsComplete(task.isComplete);
                } catch (err) {
                    console.error('Error fetching task:', err);
                }
            };
            fetchTask();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const taskData = { title, description, isComplete };
            if (id) {
                // Update existing task
                await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, taskData, {
                    headers: { Authorization: `${token}` },
                });
            } else {
                // Create new task
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, taskData, {
                    headers: { Authorization: `${token}` },
                });
            }
            onSuccess();
            navigate('/tasks');
        } catch (err) {
            console.error('Error saving task:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">{id ? 'Edit Task' : 'Create Task'}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isComplete}
                            onChange={(e) => setIsComplete(e.target.checked)}
                            className="mr-2"
                        />
                        Complete
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {id ? 'Update Task' : 'Create Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;