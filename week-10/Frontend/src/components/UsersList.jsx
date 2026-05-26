import { useEffect, useState } from "react";
import axios from "axios";
import { loadingClass, errorClass } from "../styles/common.js";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://blogapp-backend-7kra.onrender.com/admin-api/users-list", { withCredentials: true });
        setUsers(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      const endpoint = currentStatus ? "block" : "unblock";
      await axios.put(`https://blogapp-backend-7kra.onrender.com/admin-api/${endpoint}/${userId}`, {}, { withCredentials: true });
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isActive: !currentStatus } : user
      ));
    } catch (err) {
      console.error("Error toggling user status:", err);
      alert("Failed to change user status");
    }
  };

  if (loading) return <p className={loadingClass}>Loading users...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 t-[400px]">
        {users.length === 0 && <p>No users found.</p>}
        {users.map((user) => (
          <div key={user._id} className="p-4 border rounded shadow-sm bg-white">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> {user.isActive ? "Active" : "Blocked"}</p>
            <button
              onClick={() => handleToggleBlock(user._id, user.isActive)}
              className={`mt-4 px-4 py-2 text-white rounded font-medium transition-colors ${user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {user.isActive ? "Block User" : "Unblock User"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
