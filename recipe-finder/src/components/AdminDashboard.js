import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import RecipeForm from './RecipeForm'; 

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [recipes, setRecipes] = useState([]); 

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://recipe-backend:5000/api/contacts');
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipes');
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContacts();
    fetchRecipes();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-content">
        <section className="dashboard-section">
          <h2>Contact Messages</h2>
          {contacts.length ? (
            <ul>
              {contacts.map(contact => (
                <li key={contact._id}>
                  <p><strong>Name:</strong> {contact.name}</p>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Message:</strong> {contact.message}</p>
                </li>
              ))}
            </ul>
          ) : <p>No contact messages available.</p>}
        </section>
        <section className="dashboard-section">
          <h2>All Recipes</h2>
          {recipes.length ? (
            <ul>
              {recipes.map(recipe => (
                <li key={recipe._id}>
                  <p><strong>Name:</strong> {recipe.name}</p>
                  <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                  <p><strong>Instructions:</strong> {recipe.instructions}</p>
                  <p><strong>Diet Type:</strong> {recipe.dietType}</p>
                  <p><strong>Health Labels:</strong> {recipe.healthLabels}</p>
                  <p><strong>Preparation Time:</strong> {recipe.prepTime}</p>
                  {recipe.recipeImage && (
                    <div className="recipe-image">
                      <img src={recipe.recipeImage} alt={recipe.name} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : <p>No recipes available.</p>}
        </section>
      </div>
      <div className="dashboard-section">
        <h2>Add a New Recipe</h2>
        <RecipeForm />
      </div>
    </div>
  );
};

export default AdminDashboard;
