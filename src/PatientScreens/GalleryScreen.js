import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';

const images = [
    { id: '1', name: 'Hannah', image: require('../img/me.jpg') },
    { id: '2', name: 'GrandMa & Kids', image: require('../img/family.jpg') },
    { id: '3', name: 'James Birthday', image: require('../img/birthday.jpg') },
    { id: '4', name: 'Nana', image: require('../img/mother.jpg') },
    { id: '5', name: 'Hannah Graduation', image: require('../img/grad.jpg') },
    { id: '6', name: 'James & Nana', image: require('../img/son.jpg') },
    { id: '7', name: 'James', image: require('../img/man2.jpg') },
    { id: '8', name: 'Nana Attended Bible Study', image: require('../img/nanabiblestudy.jpg') },
    { id: '9', name: 'Nana take Selfie', image: require('../img/nanaselfie.jpg') },
    { id: '10', name: 'Nana make  Cinnamon  bread', image: require('../img/nanabread.jpg') },
    { id: '11', name: 'Nana Thesis defense day', image: require('../img/nanathesisday.jpg') },
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const GalleryScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef(null);

    const handleNextSlide = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        scrollViewRef.current.scrollTo({
            x: nextIndex * screenWidth,
            animated: true,
        });
    };

    const handlePreviousSlide = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        scrollViewRef.current.scrollTo({
            x: prevIndex * screenWidth,
            animated: true,
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image
                            source={image.image}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.title}>{image.name}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handlePreviousSlide} style={styles.button}>
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextSlide} style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollViewContainer: {
        alignItems: 'center',
    },
    imageContainer: {
        width: screenWidth,
        height: screenHeight * 0.85, // 85% of the screen height
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: screenWidth,
        height: '100%',
    },
    title: {
        color: '#000',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        backgroundColor: '#800080',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center'
    },
});

export default GalleryScreen;
