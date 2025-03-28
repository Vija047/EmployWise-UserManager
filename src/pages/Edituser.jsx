import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../services/api";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch and prefill user data here
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser(id, user);
    navigate("/users");
  };

  return (
    <form onSubmit={handleUpdate}>
      <input type="text" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} required />
      <input type="text" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} required />
      <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditUser;
