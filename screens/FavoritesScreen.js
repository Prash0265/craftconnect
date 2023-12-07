import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useFavoriteContext } from './FavoriteContext';

const FavoritesScreen = () => {
  const { favorites } = useFavoriteContext();

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.artItemContainer}>
      <Image source={item.image} style={styles.artImage} />
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderFavoriteItem}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  artItemContainer: {
    flex: 1,
    margin: 8,
  },
  artImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;
