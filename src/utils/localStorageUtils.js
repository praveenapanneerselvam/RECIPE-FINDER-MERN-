// src/utils/localStorageUtils.js

export const saveUserDataToLocalStorage = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData)); // Save user data to localStorage
  };
  
  export const getUserDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userData')); // Retrieve user data from localStorage
  };
  
  export const clearUserDataFromLocalStorage = () => {
    localStorage.removeItem('userData'); // Clear user data from localStorage
  };
  