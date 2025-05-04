import React, { useEffect, useState, useCallback } from 'react';
import Recipe from './RecipeCard';
import './RecipePage.css';

const App = () => {
  const APP_ID = "97e088cc";
  const APP_KEY = "2ce413d9cc3067b75354860324b0289f";
  const YOUTUBE_API_KEY = "AIzaSyBRszc6xUXM-XQgoWBinCQYlDbSO3UA1iM"; 

  const [recipes, setRecipes] = useState([]);
  const [videos, setVideos] = useState([]);  
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("vegetarian");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedHealth, setSelectedHealth] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedDishType, setSelectedDishType] = useState("");
  const [error, setError] = useState(null); 

  const getYouTubeVideos = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query} recipes&key=${YOUTUBE_API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch YouTube videos');
      }
  
      const data = await response.json();
      console.log("YouTube API response data:", data);
  
      const videoItems = data.items.filter((item) => item.id.videoId);
      if (videoItems.length > 0) {
        setVideos(videoItems);
      } else {
        console.warn("No video results with videoId found");
        setVideos([]); 
      }
  
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      setError('Could not fetch YouTube videos. Please try again later.');
    }
  };
  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.healthConditions) {
      setSelectedHealth(userData.healthConditions); 
    }
  }, []);

  const getRecipes = useCallback(async () => {
    try {
      const filters = [];
      if (selectedCuisine) filters.push(`cuisineType=${selectedCuisine}`);
      if (selectedMealType) filters.push(`mealType=${selectedMealType}`);
      if (selectedDishType) filters.push(`dishType=${selectedDishType}`);

      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}&${filters.join('&')}`
      );

      if (!response.ok) throw new Error('Failed to fetch recipes');

      const data = await response.json();
      const recipesWithVideos = await Promise.all(data.hits.map(async (recipe) => {
        const video = await getYouTubeVideosForRecipe(recipe.recipe.label);
        return {
          ...recipe,
          youtubeUrl: video ? video.id.videoId : '',
        };
      }));

      setRecipes(recipesWithVideos);
      console.log("Fetched recipes:", data.hits);

    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Could not fetch recipes. Please try again later.');
    }
  }, [selectedCuisine, selectedMealType, selectedDishType, APP_ID, APP_KEY, query]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        setLoading(true);
        setError(null); 
        console.log("Fetching data..."); 
        await getRecipes();
        await getYouTubeVideos(query);  
        setLoading(false);
      };
      fetchData();
    }
  }, [query, isLoggedIn, selectedCuisine, selectedHealth, selectedMealType, selectedDishType, getRecipes]);

  const getYouTubeVideosForRecipe = async (recipeTitle) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${recipeTitle} recipe&key=${YOUTUBE_API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch YouTube video for recipe');
      }
  
      const data = await response.json();
      const video = data.items.find(item => item.id.videoId);
  
      return video || null; 
  
    } catch (error) {
      console.error('Error fetching YouTube video:', error);
      return null; 
    }
  };
  
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const handleLogin = () => {
    console.log("Login button clicked"); // Debug log
    setIsLoggedIn(true);
  };
  
  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="recipe-container">
          <h2>PERSONALISED MENU MADE FOR YOU</h2>
          <button onClick={handleLogin}>RECIPES FOR YOU</button>
        </div>
      ) : (
        <>
          <form className="search-form" onSubmit={getSearch}>
            <input
              className="search-bar"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </form>
          <div className="filter-container">
            <div className="filter-group">
              <label>Select Cuisine:</label>
              <select value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)}>
                <option value="">--Select Cuisine--</option>
                <option value="American">American</option>
                <option value="Asian">Asian</option>
                <option value="British">British</option>
                <option value="Caribbean">Caribbean</option>
                <option value="Central Europe">Central Europe</option>
                <option value="Chinese">Chinese</option>
                <option value="Eastern Europe">Eastern Europe</option>
                <option value="French">French</option>
                <option value="Indian">Indian</option>
                <option value="Italian">Italian</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Kosher">Kosher</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Mexican">Mexican</option>
                <option value="Middle Eastern">Middle Eastern</option>
                <option value="Nordic">Nordic</option>
                <option value="South American">South American</option>
                <option value="South East Asian">South East Asian</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Select Health Condition:</label>
              <select value={selectedHealth} onChange={(e) => setSelectedHealth(e.target.value)}>
                <option value="">--Select Health Condition--</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="dairy-free">Dairy Free</option>
                <option value="low-sugar">Low Sugar</option>
                <option value="paleo">Paleo</option>
                <option value="soy-free">Soy Free</option>
                <option value="egg-free">Egg Free</option>
                <option value="fish-free">Fish Free</option>
                <option value="shellfish-free">Shellfish Free</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Select Meal Type:</label>
              <select value={selectedMealType} onChange={(e) => setSelectedMealType(e.target.value)}>
                <option value="">--Select Meal Type--</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Select Dish Type:</label>
              <select value={selectedDishType} onChange={(e) => setSelectedDishType(e.target.value)}>
                <option value="">--Select Dish Type--</option>
                <option value="Main course">Main course</option>
                <option value="Soup">Soup</option>
                <option value="Salad">Salad</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p> 
          ) : (
            <div className="recipes">
              {recipes.map((recipe) => (
                <Recipe
                  key={recipe.recipe.uri}
                  title={recipe.recipe.label}
                  calories={recipe.recipe.calories}
                  image={recipe.recipe.image}
                  ingredients={recipe.recipe.ingredients}
                  url={recipe.recipe.url}
                  shareAs={recipe.recipe.shareAs}
                  youtubeUrl={recipe.youtubeUrl}
                  yieldAmount={recipe.recipe.yield}
                  dietLabels={recipe.recipe.dietLabels}
                  cautions={recipe.recipe.cautions}
                  glycemicIndex={recipe.recipe.glycemicIndex}
                  inflammatoryIndex={recipe.recipe.inflammatoryIndex}
                  totalCO2Emissions={recipe.recipe.totalCO2Emissions}
                  CO2EmissionsClass={recipe.recipe.CO2EmissionsClass}
                  totalWeight={recipe.recipe.totalWeight}
                  totalTime={recipe.recipe.totalTime}
                  cuisineType={recipe.recipe.cuisineType}
                  mealType={recipe.recipe.mealType}
                  dishType={recipe.recipe.dishType}
                  totalNutrients={recipe.recipe.totalNutrients}
                  totalDaily={recipe.recipe.totalDaily}
                  digest={recipe.recipe.digest}
                  tags={recipe.recipe.tags}
                  externalId={recipe.recipe.externalId}
                />
              ))}
            </div>
          )}
        <div className="youtube-videos">
  <h3>YouTube Videos</h3>
  {videos.length > 0 ? (
    videos.map((video) => (
      <div key={video.id.videoId} className="video">
        <h4>{video.snippet.title}</h4>
        <div className="video-thumbnail">
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, "_blank")}
          />
        </div>
      </div>
    ))
  ) : (
    <p>No videos found.</p>
  )}
</div>

        </>
      )}
    </div>
  );
};

export default App;
