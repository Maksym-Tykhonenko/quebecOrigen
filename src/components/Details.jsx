import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert, ImageBackground } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const Details = ({ image, name, story, coordinates }) => {
    const navigation = useNavigation();
    const [showMap, setShowMap] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const checkCatalogue = async () => {
            try {
                const catalogue = await AsyncStorage.getItem("catalogue");
                const parsedCatalogue = catalogue ? JSON.parse(catalogue) : [];

                const itemExists = parsedCatalogue.some((item) => item.name === name);
                setIsAdded(itemExists);
            } catch (error) {
                console.error("Error checking catalogue:", error);
            }
        };

        checkCatalogue();
    }, [name]);

    const addToCatalogue = async () => {
        try {
            const catalogue = await AsyncStorage.getItem("catalogue");
            const parsedCatalogue = catalogue ? JSON.parse(catalogue) : [];

            if (isAdded) {
                Alert.alert("Already Added", "This item is already in the catalogue.");
                return;
            }

            parsedCatalogue.push({ image, name, story, coordinates });
            await AsyncStorage.setItem("catalogue", JSON.stringify(parsedCatalogue));
            setIsAdded(true);
            Alert.alert("Success", "Item added to catalogue.");
        } catch (error) {
            console.error("Error adding to catalogue:", error);
            Alert.alert("Error", "Could not add item to catalogue.");
        }
    };

    return (
        <ImageBackground source={require('../assets/newDiz/back2.jpg')} style={{flex: 1}}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Icons type={"back"} />
            </TouchableOpacity>
            <Image source={image} style={styles.image} />
            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={styles.addBtn} 
                    onPress={isAdded ? () => navigation.navigate('CatalogueScreen') : addToCatalogue}
                    >
                    <Text style={styles.btnText}>
                        {isAdded ? "Go to catalogue" : "Add to Catalogue"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.locationBtn}
                    onPress={() => setShowMap((prev) => !prev)}
                >
                    <Text style={styles.btnText}>
                        {showMap ? "Story" : "Location"}
                    </Text>
                </TouchableOpacity>
            </View>
            {showMap ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: coordinates[0],
                        longitude: coordinates[1],
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: coordinates[0],
                            longitude: coordinates[1],
                        }}
                        title={name}
                        description={story}
                    />
                </MapView>
            ) : (
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <ScrollView style={{ width: "100%" }}>
                        <Text style={styles.story}>{story}</Text>
                        <View style={{ height: 120 }} />
                    </ScrollView>
                </View>
            )}
        </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingBottom: height * 0.2,
    },

    image: {
        width: "100%",
        height: height * 0.33,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginBottom: height * 0.02,
    },

    btnContainer: {
        width: "100%",
        marginBottom: height * 0.03,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    addBtn: {
        width: "48%",
        backgroundColor: "#432887",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    locationBtn: {
        width: "48%",
        backgroundColor: "#8454ff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    btnText: {
        fontSize: 14,
        fontWeight: "900",
        color: "#fff",
    },

    title: {
        fontWeight: "800",
        fontSize: 26,
        textAlign: "center",
        marginBottom: height * 0.03,
        color: "#FDF3E7",
    },

    textContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingBottom: height * 0.4,
    },

    story: {
        fontWeight: "400",
        fontSize: 18,
        textAlign: "justify",
        color: "#fff",
    },

    icon: {
        width: 60,
        height: 60,
        padding: 10,
        position: "absolute",
        top: height * 0.04,
        left: 10,
        zIndex: 10,
    },

    map: {
        width: "90%",
        height: height * 0.42,
        borderRadius: 10
    },
});

export default Details;
