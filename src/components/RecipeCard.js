import React, { useState } from 'react';
import { useFavorites } from './FavoritesContext';
import './RecipeCard.css';

const RecipeCard = ({
  id,
  title,
  calories,
  image,
  url,
  shareAs,
  youtubeUrl,
  yieldAmount,
  dietLabels = [],
  cautions = [],
  glycemicIndex,
  inflammatoryIndex,
  totalCO2Emissions,
  CO2EmissionsClass,
  totalWeight,
  totalTime,
  cuisineType = [],
  mealType = [],
  dishType = [],
  totalNutrients = {},
  totalDaily = {},
  digest = [],
  tags = [],
  externalId,
  ingredients = []
}) => {
  const { addToFavorites, removeFromFavorites } = useFavorites();
  const [showDetails, setShowDetails] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddToFavorites = () => {
    if (isFavorited) {
      removeFromFavorites(id);
      setPopupMessage('Removed from favorites!');
      setIsFavorited(false);
    } else {
      addToFavorites({ id, title, image, calories });
      setPopupMessage('Added to favorites!');
      setIsFavorited(true);
    }

    setTimeout(() => {
      setPopupMessage('');
    }, 2000);
  };

  const toggleDetails = () => setShowDetails(!showDetails);
  
  // Extract YouTube ID from URL
  function getYouTubeId(url) {
    if (!url || typeof url !== 'string') {
      return null; // Return null or a default value if url is undefined or not a string
    }
    
    const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }
  

  const youtubeId = getYouTubeId(url || shareAs);

  return (
    <div className="recipe-card">
      <h2>{title}</h2>
      <img src={image} alt={`Image of ${title}`} />

      <button onClick={toggleDetails} className="view-details-button">
        {showDetails ? 'Hide Details' : 'View Details'}
      </button>

      {popupMessage && <div className="popup-message">{popupMessage}</div>}

      {showDetails && (
        <div className="details-content">
          <p><strong>Calories:</strong> {calories}</p>
          <p><strong>URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
          <p><strong>Share:</strong> <a href={shareAs} target="_blank" rel="noopener noreferrer">{shareAs}</a></p>
          <p><strong>Yield:</strong> {yieldAmount}</p>
          <p><strong>Diet Labels:</strong> {dietLabels.length > 0 ? dietLabels.join(', ') : 'N/A'}</p>
          <p><strong>Cautions:</strong> {cautions.length > 0 ? cautions.join(', ') : 'None'}</p>
          <p><strong>Glycemic Index:</strong> {glycemicIndex || 'N/A'}</p>
          <p><strong>Inflammatory Index:</strong> {inflammatoryIndex || 'N/A'}</p>
          <p><strong>Total CO₂ Emissions:</strong> {totalCO2Emissions || 'N/A'}</p>
          <p><strong>CO₂ Emissions Class:</strong> {CO2EmissionsClass || 'N/A'}</p>
          <p><strong>Total Weight:</strong> {totalWeight} g</p>
          <p><strong>Total Time:</strong> {totalTime} mins</p>
          <p><strong>Cuisine Type:</strong> {cuisineType.length > 0 ? cuisineType.join(', ') : 'N/A'}</p>
          <p><strong>Meal Type:</strong> {mealType.length > 0 ? mealType.join(', ') : 'N/A'}</p>
          <p><strong>Dish Type:</strong> {dishType.length > 0 ? dishType.join(', ') : 'N/A'}</p>

          <h4>Ingredients:</h4>
          <ul>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))
            ) : (
              <li>No ingredients listed.</li>
            )}
          </ul>

          <h4>Total Nutrients:</h4>
          <ul>
            {Object.keys(totalNutrients).length > 0 ? (
              Object.keys(totalNutrients).map((nutrient) => (
                <li key={nutrient}>{`${totalNutrients[nutrient].label}: ${totalNutrients[nutrient].quantity.toFixed(2)} ${totalNutrients[nutrient].unit}`}</li>
              ))
            ) : (
              <li>No nutrient information available.</li>
            )}
          </ul>

          <h4>Daily Nutrients:</h4>
          <ul>
            {Object.keys(totalDaily).length > 0 ? (
              Object.keys(totalDaily).map((nutrient) => (
                <li key={nutrient}>{`${totalDaily[nutrient].label}: ${totalDaily[nutrient].quantity.toFixed(2)} ${totalDaily[nutrient].unit}`}</li>
              ))
            ) : (
              <li>No daily nutrient information available.</li>
            )}
          </ul>

          <h4>Digest:</h4>
          <ul>
            {digest.length > 0 ? (
              digest.map((item, index) => (
                <li key={index}>{`${item.label}: ${item.total.toFixed(2)} ${item.unit}`}</li>
              ))
            ) : (
              <li>No digestion information available.</li>
            )}
          </ul>

          {tags.length > 0 && <p><strong>Tags:</strong> {tags.join(', ')}</p>}
          {externalId && <p><strong>External ID:</strong> {externalId}</p>}

         
        </div>
      )}
      {youtubeUrl && (
        <div className="video-section">
          <h3>Watch Recipe Video</h3>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeUrl}`}
            title={`Video for ${title}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <button onClick={handleAddToFavorites} className="favorite-button">
        {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default RecipeCard;
