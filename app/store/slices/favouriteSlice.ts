import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface FavouritesState {
  items: Movie[];
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      AsyncStorage.setItem('favourites', JSON.stringify(state.items));
    },
    loadFavourites: (state, action: PayloadAction<Movie[]>) => {
      state.items = action.payload;
    },
  },
});

export const { toggleFavourite, loadFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;