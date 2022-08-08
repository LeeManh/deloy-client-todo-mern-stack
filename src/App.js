import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./components/layout/Landing";
import About from "./pages/About";
import Auth from "./pages/Auth";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./routing/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Auth authRoute="login" />} />

        <Route path="/register" element={<Auth authRoute="register" />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
