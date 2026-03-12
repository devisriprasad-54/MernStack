import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: ''
  });

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // DOB validation
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dob);
      const currentDate = new Date();
      
      // Check if DOB is after 2020
      if (dob.getFullYear() >= 2020) {
        newErrors.dob = 'Date of birth must be before 2020';
      }
      
      // Check if date is not in the future
      if (dob > currentDate) {
        newErrors.dob = 'Date of birth cannot be in the future';
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Add user to list
      const newUser = {
        id: Date.now(),
        ...formData
      };
      setUsers(prev => [newUser, ...prev]);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dob: ''
      });
      setErrors({});
    } else {
      // Show errors
      setErrors(newErrors);
    }
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <div className="container">
      <div className="form-section">
        <h1>Registration Form</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className={errors.firstName ? 'input-error' : ''}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className={errors.lastName ? 'input-error' : ''}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={errors.dob ? 'input-error' : ''}
            />
            {errors.dob && <span className="error-message">{errors.dob}</span>}
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>

      <div className="users-section">
        <h2>Registered Users ({users.length})</h2>
        {users.length === 0 ? (
          <p className="no-users">No users registered yet</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.dob).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
