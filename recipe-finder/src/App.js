import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { FavoritesProvider } from './components/FavoritesContext';
import Navbar from './components/Navbar';
import PublicNavbar from './components/PublicNavbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import RecipePage from './components/RecipePage';
import Favorites from './components/Favorites';
import WeeklyPlanner from './components/WeeklyPlanner';
import ShoppingList from './components/ShoppingList';
import NutrientTracker from './components/NutrientTracker';
import MealPlanner from './components/MealPlanner';
import RecipeForm from './components/RecipeForm';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import AdminLogin from './components/AdminLogin';
import './App.css';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShouldRedirect(false);
  };
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShouldRedirect(true); // Trigger a redirect after logout
    localStorage.removeItem('user'); // Clear user data if stored
  };

  // Helper component for protecting private routes
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Provider store={store}>
      <FavoritesProvider>
        <Router>
          <header className="app-header">
            {/* Show PublicNavbar for public pages, Navbar for logged-in pages */}
            {isLoggedIn ? <Navbar onLogout={handleLogout} /> : <PublicNavbar />}
          </header>

          {/* Redirect to home page if the user is logged out */}
          {shouldRedirect && <Navigate to="/" replace />}

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            {/* Private Routes */}
            <Route
              path="/recipes"
              element={<PrivateRoute><RecipePage /></PrivateRoute>}
            />
            <Route
              path="/favorites"
              element={<PrivateRoute><Favorites /></PrivateRoute>}
            />
            <Route
              path="/weekly-planner"
              element={<PrivateRoute><WeeklyPlanner /></PrivateRoute>}
            />
            <Route
              path="/meal-planner"
              element={<PrivateRoute><MealPlanner /></PrivateRoute>}
            />
            <Route
              path="/nutrient-tracker"
              element={<PrivateRoute><NutrientTracker /></PrivateRoute>}
            />
            <Route
              path="/shopping-list"
              element={<PrivateRoute><ShoppingList /></PrivateRoute>}
            />
            <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
         
            <Route
              path="/recipeform"
              element={<PrivateRoute><RecipeForm /></PrivateRoute>}
            />
          </Routes>
        </Router>
      </FavoritesProvider>
    </Provider>
  );
};

export default App;
