import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductDetailScreen = ({ route }) => {
  const [productDetail, setProductDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = route.params;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProductDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const addToCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      let cartItems = cart ? JSON.parse(cart) : [];

      const existingItemIndex = cartItems.findIndex((item) => item.id === productDetail.id);

      if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        cartItems.push({ ...productDetail, quantity });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: productDetail?.image }} style={styles.productImage} />
      <Text style={styles.title}>{productDetail?.title}</Text>
      <Text style={styles.price}>Price: ${productDetail?.price}</Text>
      <Text style={styles.description}>Description: {productDetail?.description}</Text>

      {/* Quantity Counter */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  price: {
    fontSize: 18,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  quantityButton: {
    fontSize: 24,
    paddingHorizontal: 16,
  },
  quantityText: {
    fontSize: 20,
  },
});

export default ProductDetailScreen;
