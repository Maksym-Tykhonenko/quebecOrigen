import React, { useEffect, useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Map = ({ image, name, story, coordinates }) => {
  const [storedPlaces, setStoredPlaces] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const logStoredPlaces = async () => {
      const places = await AsyncStorage.getItem('places');
      console.log('Stored Places:', JSON.parse(places));
    };
  
    logStoredPlaces();
  }, []);  

  useEffect(() => {
    const storePlace = async () => {
      try {
        const places = await AsyncStorage.getItem('places');
        const parsedPlaces = places ? JSON.parse(places) : [];

        const placeExists = parsedPlaces.some((place) => place.name === name);
        if (!placeExists) {
          parsedPlaces.push({ image, name, story, coordinates });
          await AsyncStorage.setItem('places', JSON.stringify(parsedPlaces));
        }

        setStoredPlaces(parsedPlaces);
      } catch (error) {
        console.error('Error storing places:', error);
      }
    };

    storePlace();
  }, [image, name, story, coordinates]);

  const renderPlace = ({ item }) => {
    return (
      <View style={styles.placeContainer}>
        <Image source={item.image} style={styles.placeImage} />
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() =>
            navigation.navigate('DetailsScreen', {
              image: item.image,
              name: item.name,
              story: item.story,
              coordinates: item.coordinates
            })
          }
        >
          <Text style={styles.detailsText}>Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={require('../assets/back/map.jpg')} style={styles.background}>
      <FlatList
        data={storedPlaces}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPlace}
        numColumns={3}
        contentContainerStyle={styles.placesContainer}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: height * 0.07
  },
  placeContainer: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeImage: {
    width: height * 0.13,
    height: height * 0.13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8454ff',
  },
  detailsButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  detailsText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Map;
