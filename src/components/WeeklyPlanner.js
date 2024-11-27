import React, { useState } from 'react';
import './WeeklyPlanner.css';

const WeeklyPlanner = () => {
  const recipeList = [
    "Aloo Gobi", "Butter Chicken", "Chole Bhature", "Dal Tadka", "Palak Paneer",
    "Paneer Butter Masala", "Aloo Paratha", "Pav Bhaji", "Biryani", "Masala Dosa",
    "Samosa", "Tandoori Chicken", "Pani Puri", "Vada Pav", "Idli",
    "Pongal", "Dhokla", "Bhindi Masala", "Baingan Bharta", "Methi Thepla",
    "Kadhi Pakora", "Gulab Jamun", "Jalebi", "Rogan Josh", "Korma",
    "Kachori", "Rajma Chawal", "Pulao", "Mutton Curry", "Fish Curry",
    "Methi Paratha", "Mutter Pulao", "Dum Aloo", "Pesarattu", "Pulao",
    "Sichuan Fried Rice", "Dhokla", "Sev Puri", "Bhel Puri", "Sambar",
    "Chana Masala", "Kadhi", "Kachumber", "Misal Pav", "Aloo Tikki",
    "Mango Lassi", "Aloo Methi", "Gobi Manchurian", "Pesarattu", "Malai Kofta",
    "Dum Biryani", "Methi Paratha", "Aloo Gajar Methi", "Mushroom Masala",
    "Bhel Puri", "Bombay Sandwich", "Pineapple Raita", "Shahi Paneer",
    "Makki Di Roti", "Sarson Da Saag", "Shahi Tukda", "Mithai", 
    "Aloo Chaat", "Tandoori Roti", "Kebabs", "Chana Bhatura", "Chili Paneer",
    "Chhena Poda", "Rajma", "Kadhi", "Sada Dosa", "Kadhi Pakora",
    "Chana Daal", "Pulao", "Kachori", "Methi Thepla", "Poha",
    "Lassi", "Laal Maas", "Fried Idli", "Dhokla", "Kadhi Pakora",
    "Pesarattu", "Jalebi", "Gajar Ka Halwa", "Coconut Chutney", "Keema Pav",
    "Makhana Kheer", "Navratan Korma", "Sooji Halwa", "Bajra Khichdi", 
    "Sambhar Rice", "Dal Bati Churma", "Puran Poli", "Mango Pickle", 
    "Aloo Methi", "Gajar Methi", "Pudina Paratha", "Khoya", 
    "Shahi Chicken", "Tandoori Roti", "Kadhi Pakora", "Kachori", 
    "Naan", "Lassi", "Tandoori Chicken", "Moong Dal Chilla", 
    "Khatta Meetha Chutney", "Aloo Bhindi", "Lauki Ki Sabzi", "Gulab Jamun", 
    "Masala Chaas", "Chawal", "Moong Dal Halwa", "Bundi Raita", 
    "Pakoras", "Chana Tikki", "Vermicelli Pudding", "Tomato Rice", 
    "Masala Chana", "Pulao", "Kebabs", "Mango Lassi", "Gajar Methi",
    "Shahi Paneer", "Makki Roti", "Cabbage Kofta", "Mutter Paneer", 
    "Pistachio Kulfi", "Tandoori Fish", "Keema Paratha", "Methi Aloo", 
    "Gajar Ka Halwa", "Besan Ladoo", "Mango Raita", "Chole", "Kadhi Pakora"
  ];

  const [menu, setMenu] = useState({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
  });

  const handleChange = (day, value) => {
    setMenu({ ...menu, [day]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menu)  // Make sure 'menu' is the object you're sending
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error saving menu:', error);
    }
  };
  
  

  return (
    <div className="weekly-planner">
      <h2>Weekly Meal Planner</h2>
      
      {Object.keys(menu).map((day) => (
        <div key={day} className="day-input">
          <label>{day}:</label>
          <select
            value={menu[day]}
            onChange={(e) => handleChange(day, e.target.value)}
          >
            <option value="">Select Recipe</option>
            {recipeList.map((recipe, index) => (
              <option key={index} value={recipe}>
                {recipe}
              </option>
            ))}
          </select>
        </div>
      ))}
      
      <button onClick={handleSave}>Save Menu</button>

      <div className="saved-menu">
        <h3>Saved Menu</h3>
        <ul>
          {Object.keys(menu).map((day) => (
            <li key={day}>
              <strong>{day}:</strong> {menu[day] || 'No recipe selected'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyPlanner;
