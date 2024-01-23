import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/users');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogin = () => {
        if (!userData) {
            Alert.alert('Error', 'Unable to log in. Please try again later.');
            return;
        }

        const user = userData.find((user) => user.username === username);

        if (user) {
            if (user.password === password) {
                Alert.alert('Login Successful!', `Welcome ${user.name.firstname}`);
                console.log('User Information:', user);
                setUserData(user);
                navigation.navigate('Profile', { email: user.email });
            } else {
                Alert.alert('Login Failed', 'Incorrect password. Please check your password.');
            }
        } else {
            Alert.alert('Login Failed', 'User does not exist. Please check your username.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Page</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {userData && (
                <View style={styles.userDataContainer}>
                    <Text style={styles.userDataTitle}>User Information:</Text>
                    <Text>{`Email: ${userData.email}`}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    loginButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userDataContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        width: '100%',
    },
    userDataTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default Login;
