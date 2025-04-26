import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/default'; // Import your Home page
import About from './pages/about'; // Import your About page
import Login from './pages/login'; // Import your Login page
import Register from './pages/register'; // Import your Register page
import Dashboard from './pages/dashboard'; // Import your Dashboard page

function App() {
  return (
    <>
    {/* Routes */}
    <Routes>
        <Route path="/" element={<DefaultComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
</>
  );
}

export default App;
