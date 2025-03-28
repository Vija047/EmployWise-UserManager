import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTh,
  FaList,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import Pagination from "../components/Pagination";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [showViewButtons, setShowViewButtons] = useState(true);
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

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  };

  const handleResize = () => {
    setView(window.innerWidth < 768 ? "grid" : "list");
    setShowViewButtons(window.innerWidth >= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md: font-bold">User Management</h1>

        <button
          className="flex items-center gap-2 px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
          onClick={() => navigate("/")}
          aria-label="Logout"
        >
          <FaSignOutAlt size={18} />
          Logout
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
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {showViewButtons && (
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setView("list")}
              aria-label="List View"
            >
              <FaList /> List View
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setView("grid")}
              aria-label="Grid View"
            >
              <FaTh /> Grid View
            </button>
          </div>
        )}
      </div>

      {view === "list" ? (
        <div className="border rounded-lg overflow-hidden shadow mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Avatar</th>
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={user.avatar}
                      alt={user.first_name}
                      className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-500 hover:scale-110 transition duration-200 ease-in-out"
                    />
                  </td>
                  <td className="p-3">{user.first_name}</td>
                  <td className="p-3">{user.last_name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleEdit(user.id)}
                      aria-label={`Edit ${user.first_name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(user.id)}
                      aria-label={`Delete ${user.first_name}`}
                    >
                      <FaTrash />
                    </button>
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
              <img
                src={user.avatar}
                alt={user.first_name}
                className="w-16 h-16 rounded-full mx-auto"
              />
              <h2 className="text-center font-semibold mt-2">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-center text-gray-500 text-sm">{user.email}</p>
              <div className="flex justify-center gap-3 mt-2">
                <button
                  className="border border-gray-400 px-3 py-1 rounded-md text-black hover:text-gray-800 hover:border-gray-600 transition"
                  onClick={() => handleEdit(user.id)}
                  aria-label={`Edit ${user.first_name}`}
                >
                  <FaEdit className="inline mr-1" /> Edit
                </button>

                <button
                  className="border border-gray-400 px-3 py-1 rounded-md text-black hover:text-gray-800 hover:border-gray-600 transition ml-2"
                  onClick={() => handleDelete(user.id)}
                  aria-label={`Delete ${user.first_name}`}
                >
                  <FaTrash className="inline mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  paginate={(pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  }}
/>
    </div>
  );
};

export default UserManagement;
