import { useNavigate } from "react-router-dom";

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.first_name} />
      <div>
        <p>{user.first_name} {user.last_name}</p>
        <p>{user.email}</p>
        <button onClick={() => navigate(`/edit/${user.id}`)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
