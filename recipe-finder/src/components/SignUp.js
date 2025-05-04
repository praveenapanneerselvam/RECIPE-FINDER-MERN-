import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    dietaryPreferences: '',
    healthConditions: '',
    restrictionIngredients: '',
    allergyIngredients: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error message

    try {
      await axios.post('http://localhost:5000/api/signup', formData);
      alert('Sign up successful');
      // Redirect to login or recipes page after successful signup
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data); // Display specific error from server
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="fullName" onChange={handleChange} placeholder="Full Name" required />
      <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
      <input type="number" name="age" onChange={handleChange} placeholder="Age" required />
      <input type="text" name="gender" onChange={handleChange} placeholder="Gender" required />
      <input type="number" name="weight" onChange={handleChange} placeholder="Weight" required />
      <input type="number" name="height" onChange={handleChange} placeholder="Height" required />
      <select name="dietaryPreferences" onChange={handleChange} required>
        <option value="">Select Dietary Preference</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Vegan">Vegan</option>
        <option value="Pescatarian">Pescatarian</option>
        <option value="Gluten-Free">Gluten-Free</option>
        <option value="Keto">Keto</option>
        <option value="Paleo">Paleo</option>
      </select>

      {/* Dropdown for Health Conditions */}
      <select name="healthConditions" onChange={handleChange}>
        <option value="">Select Health Condition</option>
        <option value="Diabetes">Diabetes</option>
        <option value="Hypertension">Hypertension</option>
        <option value="Heart Disease">Heart Disease</option>
        <option value="Kidney Disease">Kidney Disease</option>
        <option value="Lactose Intolerance">Lactose Intolerance</option>
      </select>

      {/* Dropdown for Restriction Ingredients */}
      <select name="restrictionIngredients" onChange={handleChange}>
        <option value="">Select Restriction Ingredients</option>
        <option value="Gluten">Gluten</option>
        <option value="Dairy">Dairy</option>
        <option value="Peanuts">Peanuts</option>
        <option value="Shellfish">Shellfish</option>
        <option value="Soy">Soy</option>
      </select>
  <input type="text" name="allergyIngredients" onChange={handleChange} placeholder="Allergy Ingredients" />
      <button type="submit">Sign Up</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default SignUp;
