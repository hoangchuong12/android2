import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const images = [
    require('../../../assets/img/anh1.jpg'),
    require('../../../assets/img/anh2.jpg'),
    require('../../../assets/img/anh3.jpg'),
];

const Banner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newIndex = (currentImageIndex + 1) % images.length;
            setCurrentImageIndex(newIndex);
        }, 5000);
        return () => clearTimeout(timeout);
    }, [currentImageIndex]);

    return (
        <View style={styles.bannerContainer}>
            <Image source={images[currentImageIndex]} style={styles.bannerImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        width: '100%',
        height: 170,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default Banner;
