import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PieController, ArcElement);

const NutrientTracker = () => {
  const [recipe, setRecipe] = useState('');
  const [recipeData, setRecipeData] = useState(null);

  const recipeOptions = [
    'Salad', 'Smoothie', 'Grilled Chicken', 'Pasta', 'Soup', 'Sandwich', 'Steak', 'Rice', 'Omelette', 'Pizza',
    'Pancakes', 'Tacos', 'Burger', 'Noodles', 'Fries', 'Wrap', 'Quiche', 'Curry', 'Biryani', 'Stew',
    'Sushi', 'Dim Sum', 'Ravioli', 'Risotto', 'Pasta Salad', 'Fried Chicken', 'Lasagna', 'Sausages', 'Roast Beef',
    'Fish and Chips', 'Falafel', 'Chicken Wings', 'Chili', 'Casserole', 'Moussaka', 'Paella', 'Shakshuka',
    'Lamb Chops', 'Baked Potatoes', 'Tofu Stir Fry', 'Chicken Alfredo', 'Beef Stir Fry', 'Vegetable Soup',
    'Chicken Caesar Salad', 'Pasta Primavera', 'BBQ Ribs', 'Chicken Parmesan', 'Pulled Pork Sandwich', 'Chicken Tenders',
    'Meatballs', 'Grilled Shrimp', 'Goulash', 'Ratatouille', 'Eggplant Parmesan', 'Baked Ziti', 'Chicken Noodle Soup'
  ];

  // Hardcoded nutrient data for each recipe
  const recipeNutrients = {
    Salad: { calories: 150, protein: 5, carbs: 20, fats: 8 },
    Smoothie: { calories: 250, protein: 7, carbs: 45, fats: 5 },
    'Grilled Chicken': { calories: 350, protein: 30, carbs: 10, fats: 12 },
    Pasta: { calories: 400, protein: 12, carbs: 55, fats: 15 },
    Soup: { calories: 180, protein: 8, carbs: 22, fats: 6 },
    Sandwich: { calories: 300, protein: 12, carbs: 35, fats: 12 },
    Steak: { calories: 600, protein: 50, carbs: 0, fats: 40 },
    Rice: { calories: 200, protein: 4, carbs: 45, fats: 1 },
    Omelette: { calories: 250, protein: 20, carbs: 2, fats: 18 },
    Pizza: { calories: 285, protein: 12, carbs: 36, fats: 10 },
    Pancakes: { calories: 350, protein: 8, carbs: 60, fats: 10 },
    Tacos: { calories: 250, protein: 15, carbs: 20, fats: 12 },
    Burger: { calories: 500, protein: 30, carbs: 40, fats: 25 },
    Noodles: { calories: 350, protein: 10, carbs: 50, fats: 12 },
    Fries: { calories: 400, protein: 3, carbs: 60, fats: 20 },
    Wrap: { calories: 350, protein: 15, carbs: 40, fats: 12 },
    Quiche: { calories: 450, protein: 18, carbs: 30, fats: 30 },
    Curry: { calories: 500, protein: 20, carbs: 60, fats: 15 },
    Biryani: { calories: 450, protein: 25, carbs: 50, fats: 12 },
    Stew: { calories: 200, protein: 15, carbs: 30, fats: 5 },
    Sushi: { calories: 300, protein: 20, carbs: 40, fats: 8 },
    'Dim Sum': { calories: 200, protein: 10, carbs: 35, fats: 5 },
    Ravioli: { calories: 350, protein: 12, carbs: 45, fats: 15 },
    Risotto: { calories: 400, protein: 10, carbs: 60, fats: 15 },
    'Pasta Salad': { calories: 320, protein: 8, carbs: 45, fats: 10 },
    'Fried Chicken': { calories: 400, protein: 25, carbs: 30, fats: 20 },
    Lasagna: { calories: 500, protein: 30, carbs: 50, fats: 25 },
    Sausages: { calories: 300, protein: 18, carbs: 3, fats: 25 },
    'Roast Beef': { calories: 350, protein: 30, carbs: 5, fats: 25 },
    'Fish and Chips': { calories: 600, protein: 20, carbs: 50, fats: 30 },
    Falafel: { calories: 300, protein: 12, carbs: 40, fats: 12 },
    'Chicken Wings': { calories: 450, protein: 30, carbs: 0, fats: 30 },
    Chili: { calories: 350, protein: 20, carbs: 30, fats: 15 },
    Casserole: { calories: 400, protein: 25, carbs: 40, fats: 15 },
    Moussaka: { calories: 450, protein: 20, carbs: 35, fats: 30 },
    Paella: { calories: 400, protein: 25, carbs: 50, fats: 12 },
    Shakshuka: { calories: 300, protein: 15, carbs: 25, fats: 15 },
    'Lamb Chops': { calories: 600, protein: 50, carbs: 0, fats: 40 },
    'Baked Potatoes': { calories: 200, protein: 5, carbs: 40, fats: 0 },
    'Tofu Stir Fry': { calories: 250, protein: 15, carbs: 20, fats: 12 },
    'Chicken Alfredo': { calories: 600, protein: 25, carbs: 50, fats: 30 },
    'Beef Stir Fry': { calories: 400, protein: 25, carbs: 20, fats: 15 },
    'Vegetable Soup': { calories: 150, protein: 5, carbs: 30, fats: 3 },
    'Chicken Caesar Salad': { calories: 400, protein: 25, carbs: 10, fats: 25 },
    'Pasta Primavera': { calories: 450, protein: 15, carbs: 60, fats: 15 },
    'BBQ Ribs': { calories: 600, protein: 30, carbs: 30, fats: 35 },
    'Chicken Parmesan': { calories: 500, protein: 35, carbs: 40, fats: 20 },
    'Pulled Pork Sandwich': { calories: 550, protein: 25, carbs: 45, fats: 25 },
    'Chicken Tenders': { calories: 400, protein: 25, carbs: 30, fats: 18 },
    Meatballs: { calories: 400, protein: 25, carbs: 25, fats: 20 },
    'Grilled Shrimp': { calories: 200, protein: 25, carbs: 0, fats: 8 },
    Goulash: { calories: 350, protein: 20, carbs: 30, fats: 15 },
    Ratatouille: { calories: 250, protein: 5, carbs: 45, fats: 10 },
    'Eggplant Parmesan': { calories: 350, protein: 15, carbs: 40, fats: 15 },
    'Baked Ziti': { calories: 450, protein: 20, carbs: 55, fats: 18 },
    'Chicken Noodle Soup': { calories: 200, protein: 15, carbs: 20, fats: 5 },
  };
  

  const handleRecipeChange = (selectedRecipe) => {
    setRecipe(selectedRecipe);
    setRecipeData(recipeNutrients[selectedRecipe] || null);
  };

  
  const renderRecipeData = () => {
    if (!recipeData) return <p>Please select a recipe to see its nutritional data.</p>;

    return (
      <div>
        <h3>{recipe}</h3>
        <p>Calories: {recipeData.calories} kcal</p>
        <p>Protein: {recipeData.protein} g</p>
        <p>Carbs: {recipeData.carbs} g</p>
        <p>Fats: {recipeData.fats} g</p>
      </div>
    );
  };

  
  const pieData = {
    labels: ['Calories', 'Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        data: [
          recipeData ? recipeData.calories : 0,
          recipeData ? recipeData.protein : 0,
          recipeData ? recipeData.carbs : 0,
          recipeData ? recipeData.fats : 0
        ],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'],
      },
    ],
  };

  const barData = {
    labels: ['Calories', 'Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        label: 'Nutrient Amount (g)',
        data: [
          recipeData ? recipeData.calories : 0,
          recipeData ? recipeData.protein : 0,
          recipeData ? recipeData.carbs : 0,
          recipeData ? recipeData.fats : 0
        ],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6'],
      },
    ],
  };

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Nutrient Tracker</h1>

      <div style={{ backgroundColor: '#f0f4f7', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  {/* Select Dropdown */}
  <select
    value={recipe}
    onChange={(e) => handleRecipeChange(e.target.value)}
    style={{ padding: '8px', marginRight: '8px', width: '300px',borderColor:'red',borderBlockWidth:'10px' }}
  >
    <option value="">Select Recipe</option>
    {recipeOptions.map((recipe) => (
      <option key={recipe} value={recipe}>
        {recipe}
      </option>
    ))}
  </select>

  {/* Recipe Data */}
  <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', marginBottom: '20px', width: '550px'}}>
    {renderRecipeData()}
  </div>
</div>


    

      {recipeData && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
         
          <div style={{ flex: 1, backgroundColor: '#fff4e3', padding: '20px', borderRadius: '8px' }}>
            <h2>Nutrient Breakdown (Pie Chart)</h2>
            <div style={{ maxWidth: '100%', height: '400px', margin: 'auto' }}>
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: '#e8f4f9', padding: '20px', borderRadius: '8px' }}>
            <h2>Nutrient Intake (Bar Chart)</h2>
            <div style={{ maxWidth: '100%', height: '400px', margin: 'auto' }}>
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', color: '#333' }}>
        <div style={{ color: '#FF5733' }}>Red: Calories</div>
        <div style={{ color: '#33FF57' }}>Green: Protein</div>
        <div style={{ color: '#3357FF' }}>Blue: Carbs</div>
        <div style={{ color: '#FF33A6' }}>Pink: Fats</div>
      </div>
    </div>
  );
};

export default NutrientTracker;