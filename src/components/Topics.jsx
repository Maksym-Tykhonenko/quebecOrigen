import React from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import pathfinder from "../constants/pathfinder";
import champion from "../constants/champion";

const { height } = Dimensions.get('window');

const Topics = ({ difficulty }) => {
    const navigation = useNavigation();

    const handleNavigation = (item, difficulty) => {
        if (difficulty === 'pathfinder') {
            navigation.navigate('PathfinderQuizScreen', { quiz: item });
        } else if (difficulty === 'champion') {
            navigation.navigate('ChampionQuizScreen', { quiz: item });
        }
    };

    return (
        <ImageBackground source={require('../assets/newDiz/back1.jpg')} style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.title}>Topics</Text>

            <ScrollView style={{width: '100%'}}>
                <View style={styles.btnContainer}>
                    {difficulty === 'pathfinder' && pathfinder.map((item, index) => (
                        <View key={index} style={{width: '40%', marginBottom: height * 0.015, alignItems: 'center'}}>
                            <TouchableOpacity style={styles.btn} onPress={() => handleNavigation(item, 'pathfinder')}>
                                <Image source={item.image} style={styles.image}/>
                            </TouchableOpacity>
                            <Text style={styles.btnText}>{item.topic}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <ScrollView style={{width: '100%'}}>
                <View style={styles.btnContainer}>
                    {difficulty === 'champion' && champion.map((item, index) => (
                        <View key={index} style={{width: '40%', marginBottom: height * 0.015, alignItems: 'center'}}>
                            <TouchableOpacity style={styles.btn} onPress={() => handleNavigation(item, 'champion')}>
                                <Image source={item.image} style={styles.image}/>
                            </TouchableOpacity>
                            <Text style={styles.btnText}>{item.topic}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

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
      padding: 30,
      paddingTop: height * 0.07,
      paddingBottom: height * 0.12,
    },

    title: {
      fontWeight: "bold",
      fontSize: 34,
      textAlign: "center",
      marginBottom: height * 0.04,
      color: "#FDF3E7",
    },

    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },

    btn: {
        width: '100%',
        height: height * 0.15,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },

    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    btnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FDF3E7',
    }
});

export default Topics;
