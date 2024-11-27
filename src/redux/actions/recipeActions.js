export const setRecipes = (recipes) => ({
    type: 'SET_RECIPES',
    payload: recipes,
  });
  
  export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const addFavorite = (recipe) => ({
    type: 'ADD_FAVORITE',
    payload: recipe,
  });
  