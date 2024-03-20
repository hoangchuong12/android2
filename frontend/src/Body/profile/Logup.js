import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const Logup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [phone, setPhone] = useState('');

    const handleSignUp = () => {
        // Perform input validation if needed

        fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                username,
                password,
                name: {
                    firstname: firstName,
                    lastname: lastName,
                },
                address: {
                    city,
                    street,
                    number: parseInt(number), 
                    zipcode,
                    geolocation: {
                        lat: '-37.3159',
                        long: '81.1496',
                    },
                },
                phone,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                Alert.alert('Sign Up Successful!', 'You can now log in with your credentials.');
            })
            .catch((error) => {
                console.error('Error signing up:', error);
                Alert.alert('Sign Up Failed', 'An error occurred. Please try again.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

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

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={(text) => setCity(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Street"
                value={street}
                onChangeText={(text) => setStreet(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Number"
                value={number}
                onChangeText={(text) => setNumber(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Zipcode"
                value={zipcode}
                onChangeText={(text) => setZipcode(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
            />

            <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
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
    signupButton: {
        backgroundColor: '#2ecc71',
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    signupButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Logup;
