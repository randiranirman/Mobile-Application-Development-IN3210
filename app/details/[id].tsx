import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Star, Heart, Calendar, Clock } from 'react-native-feather';
// import { fetchMovieDetails } from '../../src/store/slices/moviesSlice';
// import { toggleFavourite } from '../../src/store/slices/favouritesSlice';
// import { RootState } from '../../src/store';
// import { getImageUrl } from '../../src/api/endpoints';

import { fetchMovieDetails } from '../store/slices/movieSlice';
import { toggleFavourite } from '../store/slices/favouriteSlice';
import { RootState } from '../store';
import { getImageUrl } from '../api/endpoints';
export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedMovie } = useSelector((state: RootState) => state.movies);
  const { items: favourites } = useSelector((state: RootState) => state.favourites);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(Number(id)) as any);
    }
  }, [id]);

  if (!selectedMovie) {
    return (
      <View className="flex-1 bg-dark justify-center items-center">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  const isFavourite = favourites.some(fav => fav.id === selectedMovie.id);

  return (
    <ScrollView className="flex-1 bg-dark">
      <View className="relative">
        <Image
          source={{ uri: getImageUrl(selectedMovie.backdrop_path, 'w780') }}
          className="w-full h-96"
          resizeMode="cover"
        />
        <View className="absolute top-12 left-4 flex-row justify-between w-full pr-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black/50 p-3 rounded-full"
          >
            <ArrowLeft width={24} height={24} stroke="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(toggleFavourite(selectedMovie))}
            className="bg-black/50 p-3 rounded-full"
          >
            <Heart
              width={24}
              height={24}
              fill={isFavourite ? '#E50914' : 'none'}
              stroke={isFavourite ? '#E50914' : '#FFF'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-6">
        <Text className="text-white text-3xl font-bold mb-4">
          {selectedMovie.title}
        </Text>

        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center mr-4">
            <Star width={20} height={20} fill="#FCD34D" stroke="#FCD34D" />
            <Text className="text-yellow-300 ml-2 text-lg">
              {selectedMovie.vote_average.toFixed(1)}/10
            </Text>
          </View>
          <View className="flex-row items-center mr-4">
            <Calendar width={18} height={18} stroke="#888" />
            <Text className="text-gray-400 ml-2">
              {new Date(selectedMovie.release_date).getFullYear()}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Clock width={18} height={18} stroke="#888" />
            <Text className="text-gray-400 ml-2">
              {selectedMovie.runtime} min
            </Text>
          </View>
        </View>

        <View className="flex-row flex-wrap mb-4">
          {selectedMovie.genres?.map((genre: any) => (
            <View key={genre.id} className="bg-secondary px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-white">{genre.name}</Text>
            </View>
          ))}
        </View>

        <Text className="text-white text-lg font-bold mb-2">Overview</Text>
        <Text className="text-gray-300 leading-6 mb-6">
          {selectedMovie.overview}
        </Text>

        {selectedMovie.credits?.cast && (
          <View>
            <Text className="text-white text-lg font-bold mb-4">Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedMovie.credits.cast.slice(0, 10).map((actor: any) => (
                <View key={actor.id} className="mr-4 items-center">
                  <Image
                    source={{ uri: getImageUrl(actor.profile_path, 'w185') }}
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <Text className="text-white text-sm text-center w-20" numberOfLines={2}>
                    {actor.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </ScrollView>
  );
}