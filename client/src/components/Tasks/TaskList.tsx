import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateTaskPopup from './UpdateTaskPopup'; // Import the popup component

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null); // Track the selected task ID for the popup
    const navigate = useNavigate();

    // Fetch tasks when the component mounts
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
                    headers: { Authorization: `${token}` },
                });
                setTasks(response.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                navigate('/login'); // Redirect to login if unauthorized
            }
        };
        fetchTasks();
    }, [navigate]);

    // Handle task deletion
    const handleDelete = async (taskId: number) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}`, {
                headers: { Authorization: `${token}` },
            });
            // Remove the deleted task from the list
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    // Handle task update
    const handleUpdate = () => {
        // Refresh the task list after update
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
                    headers: { Authorization: `${token}` },
                });
                setTasks(response.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
            }
        };
        fetchTasks();
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Tasks</h2>
            <button
                onClick={() => navigate('/tasks/new')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Create New Task
            </button>
            <div className="mt-6 space-y-4">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <p className="text-gray-700">{task.description}</p>
                        <p className={`text-sm ${task.isComplete ? 'text-green-600' : 'text-red-600'}`}>
                            {task.isComplete ? 'Complete' : 'Incomplete'}
                        </p>
                        <div className="mt-2 flex space-x-2">
                            <button
                                onClick={() => setSelectedTaskId(task.id)} // Open the popup for this task
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Render the update task popup if a task is selected */}
            {selectedTaskId && (
                <UpdateTaskPopup
                    taskId={selectedTaskId}
                    onClose={() => setSelectedTaskId(null)} // Close the popup
                    onUpdate={handleUpdate} // Refresh the task list after update
                />
            )}
        </div>
    );
};

export default TaskList;