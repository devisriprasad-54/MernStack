import { useEffect, useState } from "react";
import axios from "axios";
import { loadingClass, errorClass } from "../styles/common.js";

function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://blogapp-backend-7kra.onrender.com/admin-api/authors-list", { withCredentials: true });
        setAuthors(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong fetching authors");
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleToggleBlock = async (authorId, currentStatus) => {
    try {
      const endpoint = currentStatus ? "block" : "unblock";
      await axios.put(`https://blogapp-backend-7kra.onrender.com/admin-api/${endpoint}/${authorId}`, {}, { withCredentials: true });
      setAuthors(authors.map(author => 
        author._id === authorId ? { ...author, isActive: !currentStatus } : author
      ));
    } catch (err) {
      console.error("Error toggling author status:", err);
      alert("Failed to change author status");
    }
  };

  if (loading) return <p className={loadingClass}>Loading authors...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Authors List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.length === 0 && <p>No authors found.</p>}
        {authors.map((author) => (
          <div key={author._id} className="p-4 border rounded shadow-sm bg-white">
            <p><strong>Name:</strong> {author.firstName} {author.lastName}</p>
            <p><strong>Email:</strong> {author.email}</p>
            <p><strong>Status:</strong> {author.isActive ? "Active" : "Blocked"}</p>
            <button
              onClick={() => handleToggleBlock(author._id, author.isActive)}
              className={`mt-4 px-4 py-2 text-white rounded font-medium transition-colors ${author.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {author.isActive ? "Block Author" : "Unblock Author"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorsList;
