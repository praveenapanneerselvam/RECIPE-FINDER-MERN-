import React, { useState, useEffect } from 'react';
import { getUserDataFromLocalStorage, saveUserDataToLocalStorage } from '../utils/localStorageUtils';
import './UserDashboard.css'; // Import the CSS file

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    email: '',
    password: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    dietaryPreferences: '',
    healthConditions: '',
    restrictionIngredients: '',
    allergyIngredients: '',
  });

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const data = getUserDataFromLocalStorage();
    if (data) {
      setUserData(data);
      setUpdatedDetails(data);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const updatedUserData = { ...userData, ...updatedDetails };
    setUserData(updatedUserData);
    saveUserDataToLocalStorage(updatedUserData);
    alert('User details updated successfully!');
  };

  return (
    <div className="user-dashboard">
      {userData ? (
        <div>
          <h2>Welcome, {userData.email}</h2>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={updatedDetails.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={updatedDetails.age}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
              name="gender"
              value={updatedDetails.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Weight:</label>
            <input
              type="number"
              name="weight"
              value={updatedDetails.weight}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Height:</label>
            <input
              type="number"
              name="height"
              value={updatedDetails.height}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Dietary Preferences:</label>
            <input
              type="text"
              name="dietaryPreferences"
              value={updatedDetails.dietaryPreferences}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Health Conditions:</label>
            <input
              type="text"
              name="healthConditions"
              value={updatedDetails.healthConditions}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Restriction Ingredients:</label>
            <input
              type="text"
              name="restrictionIngredients"
              value={updatedDetails.restrictionIngredients}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Allergy Ingredients:</label>
            <input
              type="text"
              name="allergyIngredients"
              value={updatedDetails.allergyIngredients}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={handleUpdate}>Update Details</button>
        </div>
      ) : (
        <p className="no-user">No user data found</p>
      )}
    </div>
  );
};

export default UserDashboard;
