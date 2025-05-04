import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Could not fetch profile data');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/profile', user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Could not update profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <input
        type="text"
        value={user.fullName}
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        placeholder="Full Name"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      {/* Add fields for age, gender, weight, height, dietary preferences, health conditions */}
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default Profile;
