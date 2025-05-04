const initialState = {
    recipes: [],
    user: null,
    favorites: [],
  };
  
  const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_RECIPES':
        return { ...state, recipes: action.payload ||[]};
      case 'SET_USER':
        return { ...state, user: action.payload };
      case 'ADD_FAVORITE':
        return { ...state, favorites: [...state.favorites, action.payload] };
      default:
        return state;
    }
  };
  
  export default recipeReducer;
  