import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultComponent from './components/default'; // Import your Home page
import About from './pages/about'; 
import Login from './pages/login'; // Import your Login page
import Register from './pages/register'; // Import your Register page
import Dashboard from './pages/dashboard'; // Import your Dashboard page
import Profile from './pages/profile';
import Settings from './pages/settings'; // Import your Settings page
import CreateNote from './pages/create-note'; // Import your Create Note page
import Page404 from './pages/404'; // Import your 404 page
import ViewNote from './pages/view-note';
import EditNote from './pages/edit-note';
import Bookmarks from './pages/bookmarks';

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/view-note/:id" element={<ViewNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="*" element={<Page404 />} />
        {/* Add more routes as needed */}
    </Routes>
</>
  );
}

export default App;
