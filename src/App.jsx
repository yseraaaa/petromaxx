import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage"; 
import SignupPage from "./SignupPage";  
import Dashboard from "./dashboard components/Dashboard"; 
import Overview from "./dashboard components/Overview"; 
import UserManagement from "./dashboard components/UserManagement"; 
import AssignBranch from "./dashboard components/AssignBranch"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dashboard with Nested Routes */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="assign-branch" element={<AssignBranch />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
