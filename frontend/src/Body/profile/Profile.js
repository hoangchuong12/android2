import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    // Simulate fetching customer data from an API
    setTimeout(() => {
      const mockCustomerInfo = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://example.com/avatar.jpg',
        orders: [
          { id: 1, product: 'Product 1', price: 20 },
          // Add more order items here
        ],
      };
      setCustomerInfo(mockCustomerInfo);
    }, 2000); // Simulated API delay

    // Replace the setTimeout block with an actual API call to fetch customer data
  }, []);

  const numberOfOrders = {
    awaitingConfirmation: 2, // Số đơn hàng chờ xác nhận
    awaitingPickup: 3,       // Số đơn hàng chờ lấy hàng
    awaitingDelivery: 2,     // Số đơn hàng chờ giao hàng
    reviews: 0,              // Số lượng đánh giá
  };



  const renderBadgeConfirmation = (count) => {
    if (count > 0) {
      return (
        <View style={styles.badgeIconContainer}>
          <MaterialCommunityIcons name="check" size={24} color="black" />
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const renderBadgePickup = (count) => {
    if (count > 0) {
      return (
        <View style={styles.badgeIconContainer}>
          <MaterialCommunityIcons name="truck" size={24} color="black" />
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const renderBadgeDelivery = (count) => {
    if (count > 0) {
      return (
        <View style={styles.badgeIconContainer}>
          <MaterialCommunityIcons name="package-variant" size={24} color="black" />
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const renderBadgeReviews = (count) => {
    if (count > 0) {
      return (
        <View style={styles.badgeIconContainer}>
          <MaterialCommunityIcons name="star" size={24} color="black" />
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton}>
        <MaterialCommunityIcons name="login" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
        {/* ... (Mã khác của bạn) */}
      </View>
      {customerInfo ? (
        <>
          <Image source={{ uri: customerInfo.avatar }} style={styles.avatar} />
          <Text style={styles.ordersTitle}>Recent Orders:</Text>
          <FlatList
            data={customerInfo.orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Text style={styles.product}>{item.product}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text>Loading customer information...</Text>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          {renderBadgeConfirmation(numberOfOrders.awaitingConfirmation)}
          <Text>Chờ xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          {renderBadgePickup(numberOfOrders.awaitingPickup)}
          <Text>Chờ lấy hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          {renderBadgeDelivery(numberOfOrders.awaitingDelivery)}
          <Text>Chờ giao hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          {renderBadgeReviews(numberOfOrders.reviews)}
          <Text>Đánh giá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  loginButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: 50, // Khoảng cách từ nút Login đến tên và email
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  ordersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  product: {
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    alignItems: 'center',
  },
  badgeIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: -25,
    right: -25,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Profile;