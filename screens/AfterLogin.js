import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFavoriteContext } from './FavoriteContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const AfterLogin = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavoriteContext();

  const artItems = [
    { id: '1', image: require('../assets/image1.webp'), isFavorite: false, price: 29.99 },
    { id: '2', image: require('../assets/image2.jpg'), isFavorite: false, price: 39.99 },
    { id: '3', image: require('../assets/image3.avif'), isFavorite: false, price: 49.99 },
    { id: '4', image: require('../assets/image4.jpeg'), isFavorite: false, price: 59.99 },
  ];

  const toggleFavorite = (itemId) => {
    if (favorites.some((item) => item.id === itemId)) {
      removeFromFavorites(itemId);
    } else {
      addToFavorites(artItems.find((item) => item.id === itemId));
    }
  };

  const renderArtItem = ({ item }) => (
    <View style={styles.artItemContainer}>
      <Image source={item.image} style={styles.artImage} />
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => {}} style={styles.cartButton}>
          <Icon name="cart-plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
        <Icon name={favorites.some((fav) => fav.id === item.id) ? 'heart' : 'heart-o'} size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore Curated Art Collection</Text>
      <FlatList
        data={artItems}
        keyExtractor={(item) => item.id}
        renderItem={renderArtItem}
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
    position: 'relative',
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
  cartButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default AfterLogin;
