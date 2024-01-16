// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import Header from './Header';

// const ProductsScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then((response) => response.json())
//       .then((data) => {
//         setProducts(data);
//       });
//   }, []);

//   const handleSearch = (text) => {
//     setSearchText(text);
//     if (text.trim() === '') {
//       setFilteredProducts([]);
//     } else {
//       const filtered = products.filter((product) =>
//         product.title.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Header onSearch={handleSearch} />
//       {searchText.trim() ? (
//         <FlatList
//           data={filteredProducts}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.productItem}>
//               <Text style={styles.productTitle}>{item.title}</Text>
//               {/* Các thông tin sản phẩm khác */}
//             </View>
//           )}
//           style={styles.list}
//           ListEmptyComponent={<Text style={styles.noResults}>Không tìm thấy sản phẩm.</Text>}
//         />
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   productItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   productTitle: {
//     fontWeight: 'bold',
//   },
//   list: {
//     maxHeight: '60%',
//   },
//   noResults: {
//     textAlign: 'center',
//     color: 'gray',
//     marginTop: 20,
//   },
// });

// export default ProductsScreen;
