import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { Search, TrendingUp } from 'react-native-feather';
//import { fetchTrendingMovies, fetchPopularMovies } from '../../src/store/slices/moviesSlice';
//import { MovieCard } from '../../src/components/MovieCard';
//import { RootState } from '../../src/store';
//import { toggleFavourite } from '../../src/store/slices/favouritesSlice';
import { fetchTrendingMovies, fetchPopularMovies } from './store/slices/movieSlice';
import { MovieCard } from './components/MovieCard';
import { RootState } from './store';
import { toggleFavourite } from './store/slices/favouriteSlice';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { trending, popular, loading } = useSelector((state: RootState) => state.movies);
  const { items: favourites } = useSelector((state: RootState) => state.favourites);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTrendingMovies() as any);
    dispatch(fetchPopularMovies() as any);
  }, []);

  const isFavourite = (movieId: number) => {
    return favourites.some(fav => fav.id === movieId);
  };

  const handleToggleFavourite = (movie: any) => {
    dispatch(toggleFavourite(movie));
  };

  if (loading) {
    return (
      <View className="flex-1 bg-dark justify-center items-center">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-dark">
      <View className="p-4">
        {/* Search Bar */}
        <View className="flex-row items-center bg-secondary rounded-lg px-4 py-3 mb-6">
          <Search width={20} height={20} stroke="#888" />
          <TextInput
            className="flex-1 ml-3 text-white"
            placeholder="Search movies..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Trending Section */}
        <View className="mb-6">
          <View className="flex-row items-center mb-4">
            <TrendingUp width={24} height={24} stroke="#E50914" />
            <Text className="text-white text-2xl font-bold ml-2">
              Trending Now
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trending}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                onPress={() => router.push(`/details/${item.id}`)}
                isFavourite={isFavourite(item.id)}
                onToggleFavourite={() => handleToggleFavourite(item)}
              />
            )}
          />
        </View>

        {/* Popular Section */}
        <View>
          <Text className="text-white text-2xl font-bold mb-4">
            Popular Movies
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={popular}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                onPress={() => router.push(`/details/${item.id}`)}
                isFavourite={isFavourite(item.id)}
                onToggleFavourite={() => handleToggleFavourite(item)}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}