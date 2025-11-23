import { Stack } from "expo-router";
import { Provider } from 'react-redux';
//import { Provider } from "react-redux";
//import { store } from '../src/store';
import { store } from "./store";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { setUser, setLoading } from '../src/store/slices/authSlice';
import { setUser,setLoading } from "./store/slices/authSlice";
//rimport { loadFavourites } from '../src/store/slices/favouritesSlice';
import { loadFavourites } from "./store/slices/favouriteSlice";
import "@/global.css";

// Component to handle initial auth check
function AuthLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        const favouritesStr = await AsyncStorage.getItem('favourites');
        
        if (userStr) {
          dispatch(setUser(JSON.parse(userStr)));
        }
        
        if (favouritesStr) {
          dispatch(loadFavourites(JSON.parse(favouritesStr)));
        }
        
        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error loading stored data:', error);
        dispatch(setLoading(false));
      }
    };

    loadStoredData();
  }, []);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthLoader>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
          <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
        </Stack>
      </AuthLoader>
    </Provider>
  );
}