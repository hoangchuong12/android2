import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import axios from 'axios';

const ProductDetailScreen = ({ route }) => {
  const [productDetail, setProductDetail] = useState(null);
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

  if (!productDetail) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleOrder = () => {
    // Handle the order process here
    console.log('Order placed for:', productDetail.title);
    console.log('Order placed for:', productDetail.price);


  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: productDetail.image }} style={styles.productImage} />
      <Text>Title: {productDetail.title}</Text>
      <Text>Price: ${productDetail.price}</Text>
      <Text>Description: {productDetail.description}</Text>
      {/* Include other product details you want to display */}
      <Button title="Order" onPress={handleOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});

export default ProductDetailScreen;
