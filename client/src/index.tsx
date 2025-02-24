import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css'; // Import Tailwind CSS
import App from './App';

// Get the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container!); // Use non-null assertion (!) to ensure container is not null

// Render the App component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);