import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h1>Petromaxx</h1>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/overview">Overview</Link>
            </li>
            <li>
              <Link to="/dashboard/user-management">User Management</Link>
            </li>
            <li>
              <Link to="/dashboard/assign-branch">Assign Branch</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Outlet /> {/* Nested routes will render here */}
      </main>
    </div>
  );
};

export default Dashboard;
