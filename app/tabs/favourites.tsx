import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Heart, Star, Trash2 } from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { getImageUrl } from '../api/endpoints';
import { RootState } from '../store';
import { loadFavourites, toggleFavourite } from '../store/slices/favouriteSlice';

export default function FavouritesScreen() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items: favourites } = useSelector((state: RootState) => state.favourites);

  const loadSavedFavourites = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem('favourites');
      if (saved) {
        dispatch(loadFavourites(JSON.parse(saved)));
      }
    } catch (error) {
      console.error('Failed to load favourites:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadSavedFavourites();
  }, [loadSavedFavourites]);

  const handleRemoveFavourite = (movie: any) => {
    Alert.alert(
      'Remove from Favourites',
      `Remove "${movie.title}" from your favourites?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            dispatch(toggleFavourite(movie));
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderFavouriteCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push(`/details/${item.id}`)}
      className="bg-secondary rounded-lg overflow-hidden mb-4 flex-row"
    >
      <Image
        source={{ uri: getImageUrl(item.poster_path) }}
        className="w-24 h-36"
        resizeMode="cover"
      />
      <View className="flex-1 p-4 justify-between">
        <View>
          <Text className="text-white font-bold text-base mb-2" numberOfLines={2}>
            {item.title}
          </Text>
          <View className="flex-row items-center mb-2">
            <Star width={16} height={16} fill="#FCD34D" stroke="#FCD34D" />
            <Text className="text-yellow-300 ml-1 text-sm">
              {item.vote_average?.toFixed(1)}/10
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleRemoveFavourite(item)}
          className="flex-row items-center"
        >
          <Trash2 width={18} height={18} stroke="#E50914" />
          <Text className="text-red-600 ml-2 font-semibold">Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-dark">
      {favourites.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Heart width={48} height={48} stroke="#888" />
          <Text className="text-gray-400 text-lg mt-4">
            No favourites yet
          </Text>
          <Text className="text-gray-500 text-sm mt-2">
            Add movies to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavouriteCard}
          contentContainerStyle={{ padding: 16 }}
          ListHeaderComponent={
            <Text className="text-white text-2xl font-bold mb-4">
              My Favourites ({favourites.length})
            </Text>
          }
        />
      )}
    </View>
  );
}
