import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Panel from './pages/Panel';
import Terminal from './pages/Terminal';
import PrivateRoute from './components/PrivateRoute';
import Admin from './pages/Admin';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/panel" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/panel" /> : <Register />} />
        <Route path="/admin" element={<Admin />} />

        <Route
          path="/panel/*"
          element={
            <PrivateRoute>
              <Panel />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? "/panel" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
