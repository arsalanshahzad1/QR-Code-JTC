import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Scan from './pages/Scan';
import PrivateRoute from './RouteProtection/PrivateRoute';
import "./App.css"
const App = () => {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<PrivateRoute element={<Scan />} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
};

export default App;
