import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { Star, Heart } from 'react-native-feather';
import { getImageUrl } from '../api/endpoints';

interface MovieCardProps {
  movie: any;
  onPress: () => void;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  isFavourite,
  onToggleFavourite,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-secondary rounded-lg overflow-hidden m-2 w-44"
    >
      <Image
        source={{ uri: getImageUrl(movie.poster_path) }}
        className="w-full h-64"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-white font-bold text-base" numberOfLines={1}>
          {movie.title}
        </Text>
        <View className="flex-row justify-between items-center mt-2">
          <View className="flex-row items-center">
            <Star width={16} height={16} fill="#FCD34D" stroke="#FCD34D" />
            <Text className="text-yellow-300 ml-1 text-sm">
              {movie.vote_average?.toFixed(1)}
            </Text>
          </View>
          {onToggleFavourite && (
            <TouchableOpacity onPress={onToggleFavourite}>
              <Heart
                width={20}
                height={20}
                fill={isFavourite ? '#E50914' : 'none'}
                stroke={isFavourite ? '#E50914' : '#FFFFFF'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};