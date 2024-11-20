import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get("window");

const Catalogue = () => {
    const [catalogueItems, setCatalogueItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCatalogue = async () => {
            try {
                const catalogue = await AsyncStorage.getItem('catalogue');
                if (catalogue) {
                    setCatalogueItems(JSON.parse(catalogue));
                }
            } catch (error) {
                console.error('Error fetching catalogue:', error);
            }
        };

        fetchCatalogue();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() =>
                        navigation.navigate('DetailsScreen', {
                            image: item.image,
                            name: item.name,
                            story: item.story,
                            coordinates: item.coordinates,
                        })
                    }
                >
                    <Text style={styles.detailsText}>Details</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ImageBackground source={require('../assets/newDiz/back1.jpg')} style={{flex: 1}}>
        <View style={styles.container}>
            {catalogueItems.length === 0 ? (
                <View style={styles.noItemsContainer}>
                    <Text style={styles.noItemsText}>
                        No saved places yet! Complete successfully at least one Pathfinder quiz and save it in details to see saved places here.
                    </Text>
                    <TouchableOpacity
                        style={styles.navigateButton}
                        onPress={() => navigation.navigate('TopicsScreen', { difficulty: 'pathfinder' })}
                    >
                        <Text style={styles.navigateButtonText}>Go to Topics</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={catalogueItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        paddingTop: height * 0.07,
        paddingBottom: height * 0.12,
    },
    noItemsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noItemsText: {
        fontSize: 18,
        color: '#FDF3E7',
        textAlign: 'center',
        marginBottom: 20,
    },
    navigateButton: {
        backgroundColor: '#FF9927',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: width * 0.85
    },
    navigateButtonText: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16,
    },
    listContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: width * 0.85
    },
    itemContainer: {
        width: width * 0.85,
        marginBottom: 30,
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: height * 0.3,
        borderRadius: 10,
    },
    itemName: {
        marginTop: 10,
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        color: '#FDF3E7',
    },
    detailsButton: {
        marginTop: 10,
        backgroundColor: '#ff9927',
        paddingVertical: 6,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%'
    },
    detailsText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '900',
    },
});

export default Catalogue;
