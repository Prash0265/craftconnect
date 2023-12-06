// AfterLogin.js
import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const AfterLogin = () => {
  const [artItems, setArtItems] = useState([
    { id: '1', image: require('../assets/image1.webp'), isFavorite: false },
    { id: '2', image: require('../assets/image2.jpg'), isFavorite: false },
    { id: '3', image: require('../assets/image3.avif'), isFavorite: false },
    { id: '3', image: require('../assets/image4.jpeg'), isFavorite: false },
    // Add more art items as needed
  ]);

  const toggleFavorite = (itemId) => {
    setArtItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const renderArtItem = ({ item }) => (
    <View style={styles.artItemContainer}>
      <Image source={item.image} style={styles.artImage} />
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Text>{item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
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
        numColumns={2} // Adjust the number of columns as needed
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
});

export default AfterLogin;
