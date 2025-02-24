import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UpdateTaskPopupProps {
    taskId: number;
    onClose: () => void;
    onUpdate: () => void;
}

const UpdateTaskPopup: React.FC<UpdateTaskPopupProps> = ({ taskId, onClose, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    // Fetch task details when the popup is opened
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}`, {
                    headers: { Authorization: `${token}` },
                });
                const task = response.data;
                setTitle(task.title); // Set the title
                setDescription(task.description); // Set the description
                setIsComplete(task.isComplete); // Set the completion status
            } catch (err) {
                console.error('Error fetching task:', err);
            }
        };
        fetchTask();
    }, [taskId]); // Fetch task details whenever taskId changes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const taskData = { title, description, isComplete };
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}`, taskData, {
                headers: { Authorization: `${token}` },
            });
            onUpdate(); // Notify parent component that the task was updated
            onClose(); // Close the popup
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Update Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title} // Pre-fill with existing title
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            placeholder="Description"
                            value={description} // Pre-fill with existing description
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={isComplete} // Pre-fill with existing completion status
                                onChange={(e) => setIsComplete(e.target.checked)}
                                className="mr-2"
                            />
                            Complete
                        </label>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTaskPopup;