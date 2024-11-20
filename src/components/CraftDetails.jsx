import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icons from "./Icons";

const { height } = Dimensions.get("window");

const CraftDetails = ({name, fact, history, significance}) => {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../assets/newDiz/back2.jpg')} style={{flex: 1}}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                <Icons type={"back"} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name}</Text>
                <ScrollView style={{ width: "100%" }}>
                    <Text style={styles.subTitle}>Interesting fact</Text>
                    <Text style={styles.story}>{fact}</Text>
                    <Text style={styles.subTitle}>History</Text>
                    <Text style={styles.story}>{history}</Text>
                    <Text style={styles.subTitle}>Significance</Text>
                    <Text style={styles.story}>{significance}</Text>
                    <View style={{ height: 50 }} />
                </ScrollView>
            </View>
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
        paddingTop: height * 0.07,
        padding: 30,
    },

    title: {
        fontWeight: "900",
        fontSize: 26,
        textAlign: "center",
        marginBottom: height * 0.03,
        color: "#FDF3E7",
    },

    subTitle: {
        fontWeight: "600",
        fontSize: 20,
        textAlign: "justify",
        color: "#FDF3E7",
        marginBottom: height * 0.01,
        textAlign: "center",
    },

    textContainer: {
        width: "100%",
    },

    story: {
        fontWeight: "400",
        fontSize: 18,
        textAlign: "justify",
        color: "#fff",
        marginBottom: height * 0.03
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

});

export default CraftDetails;
