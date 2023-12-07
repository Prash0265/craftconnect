import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const CartScreen = ({ route }) => {
  const { cartItems = [], cartTotal = 0 } = route.params || {};

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={ item.image } style={styles.productImage} />

      <View style={styles.productDetails}>
        <Text style={styles.cartItemText}>{item.id}</Text>
        <Text style={styles.cartItemText}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );
  

  const handlePayment = async () => {
    // ... Your payment handling logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.payNowButton} onPress={handlePayment}>
        <Text style={styles.payNowButtonText}>Pay Now</Text>
      </TouchableOpacity>
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
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  productImage: {
    width: 80, // Adjust the width as needed
    height: 80, // Adjust the height as needed
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  cartItemText: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
  },
  payNowButton: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  payNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
