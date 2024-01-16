// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, AsyncStorage } from 'react-native';

// const CartScreen = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const loadCartItems = async () => {
//       try {
//         const cart = await AsyncStorage.getItem('cart');
//         if (cart !== null) {
//           setCartItems(JSON.parse(cart));
//         }
//       } catch (error) {
//         console.error('Error loading cart items:', error);
//       }
//     };
//     console.log("holo",updateCart)
//     loadCartItems();
//   }, [route.params?.updateCart]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Cart Items:</Text>
//       <FlatList
//         data={cartItems}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text>{item.title}</Text>
//             <Text>${item.price}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     width: '100%',
//   },
// });

// export default CartScreen;
