import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../../Header';
import ProductDetailScreen from './ProductDetailScreen';
import Banner from './Banner';


const { width } = Dimensions.get('window');
const marginBetweenItems = 8;
const gridPadding = 16;
const itemWidth = (width - (gridPadding * 2) - (marginBetweenItems * 2)) / 2;

const Stack = createStackNavigator();

const Feed = ({ navigation }) => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('categories')


  useEffect(() => {
    getDataUsingSimpleGetCall();
    getCategories();
  }, [category]);

  const getCategories = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      setCategories(response.data);
      
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(category)
  const getDataUsingSimpleGetCall = async () => {
    try {
      let url = 'https://fakestoreapi.com/products';
      if (category !== 'categories') {
        url += `/category/${category}`;
      }
      const response = await axios.get(url);
      setPostData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItemContainer}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.productItemContainer}>
        <View style={styles.productContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Header />
      <Banner></Banner>
      <Text style={styles.heading}>Categories:</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (

        <View style={styles.categoriesContainer}>
          <ScrollView horizontal>
          <TouchableOpacity
                    style={styles.categoryButton}
                    onPress={() => setCategory('categories')}
                >
                    <Text >all</Text>
                </TouchableOpacity>

            {categories.map((categoryItem, index) => (
              <TouchableOpacity
              key={index}
              style={styles.categoryButton}
              onPress={() => setCategory(categoryItem)}
            >
              <Text>{categoryItem}</Text>
            </TouchableOpacity>
            
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={postData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ padding: gridPadding }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    margin: 5,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
  productItemContainer: {
    width: itemWidth,
    marginBottom: marginBetweenItems * 2,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    backgroundColor: '#fff',
    overflow: 'hidden', 
  },
  productTitle: {
    padding: 10,
    paddingBottom: 0,
    color: 'black',
    fontSize: 14, 
  },
  productPrice: {
    padding: 10,
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14, 
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
});
const FeedStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};
export default FeedStackScreen;