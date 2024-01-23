import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = ({navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);
  useEffect(() => {
    navigation.addListener('focus', () => {
      loadCartItems();
    });
  }, [navigation]);
  const loadCartItems = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      setCartItems(cart ? JSON.parse(cart) : []);
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };


  const updateItemQuantity = async (itemId, newQuantity) => {
    try {
      const updatedCartItems = cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setCartItems([]);
      console.log('Cart cleared.');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart:</Text>
      <ScrollView style={styles.scrollView}>
        {cartItems.map((item) => (
          <View style={styles.item} key={item.id}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text>${item.price}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateItemQuantity(item.id, Math.max(item.quantity - 1, 1))}>
                  <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateItemQuantity(item.id, item.quantity + 1)}>
                  <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Button title="Remove" onPress={() => removeFromCart(item.id)} color="red" />
          </View>
        ))}
      </ScrollView>

      <Text style={styles.total}>Total: ${calculateTotalPrice()}</Text>

      <Button title="Clear Cart" onPress={clearCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: 'cover',
  },
  itemDetails: {
    justifyContent: 'center',
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Notifications;
