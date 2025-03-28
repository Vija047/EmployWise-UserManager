import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTh, FaList, FaEdit, FaTrash, FaSignOutAlt, FaSearch } from "react-icons/fa";
import Pagination from "../components/Pagination";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users?per_page=12");
        const data = await response.json();
        setUsers(data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <button className={`px-4 py-2 rounded-lg ${view === "list" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setView("list")}>
            <FaList /> List View
          </button>
          <button className={`px-4 py-2 rounded-lg ${view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setView("grid")}>
            <FaTh /> Grid View
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="border rounded-lg overflow-hidden shadow mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">Avatar</th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3"><img src={user.avatar} alt={user.first_name} className="w-10 h-10 rounded-full" /></td>
                  <td className="p-3">{user.first_name}</td>
                  <td className="p-3">{user.last_name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 flex gap-2">
                    <button className="text-blue-600"><FaEdit /></button>
                    <button className="text-red-600"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {currentUsers.map((user) => (
            <div key={user.id} className="border rounded-lg p-4 shadow">
              <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mx-auto" />
              <h2 className="text-center font-semibold">{user.first_name} {user.last_name}</h2>
              <p className="text-center text-gray-500 text-sm">{user.email}</p>
              <div className="flex justify-center gap-3 mt-2">
                <button className="text-blue-600"><FaEdit /></button>
                <button className="text-red-600"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredUsers.length > usersPerPage && (
        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
      )}
    </div>
  );
};

export default UserManagement;