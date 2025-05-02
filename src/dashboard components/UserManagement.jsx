import React from "react";
import "./UserManagement.css";

const UserManagement = () => {
  const dummyUsers = [
    { lastName: "Doe", firstName: "John", userName: "johndoe", role: "Admin-sales" },
    { lastName: "Smith", firstName: "Jane", userName: "janesmith", role: "Pump Attendant" },
    { lastName: "Brown", firstName: "Charlie", userName: "charliebrown", role: "Pump Attendant" },
  ];

  return (
    <div className="container">
      <h2>User Management</h2>
      <p>Manage users and their roles here.</p>
      <table className="table">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.userName}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
