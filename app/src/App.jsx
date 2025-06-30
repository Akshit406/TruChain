import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { useWeb3 } from './hooks/useWeb3';

function App() {
  const { isAdmin } = useWeb3();

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/admin" 
            element={isAdmin ? <Admin /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;