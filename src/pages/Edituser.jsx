import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://reqres.in/api/users/${id}`)
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch user data");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
      alert("User updated successfully!");
      navigate(-1);
    } catch (err) {
      alert("Error updating user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div max-w-2xl mx-auto p-6 bg-white rounded-lg>  
      <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">&larr; Back to Users</button>
       <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      
    
      <h2 className="text-2xl font-bold mt-4">Edit User</h2>
      <p className="text-gray-600">Update user information</p>
      <div className="flex justify-center my-4">
        <img src={user.avatar} alt="User Avatar" className="w-20 h-20 rounded-full shadow-md" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">First Name</label>
          <input type="text" name="first_name" value={user.first_name} onChange={handleChange} className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div>
          <label className="block font-semibold">Last Name</label>
          <input type="text" name="last_name" value={user.last_name} onChange={handleChange} className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300" required />
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white flex items-center gap-2 rounded-lg shadow-md hover:bg-blue-700">
            <FaSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
    </div>
   
  );
};

export default EditUser;
