import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, PanResponder, ImageBackground } from "react-native";
import { history } from '../constants/history.js';

const { height, width } = Dimensions.get("window");

const History = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const sliderRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newIndex = Math.min(
        Math.max(Math.round(gestureState.moveX / (width / history.length)), 0),
        history.length - 1
      );
      setSelectedDateIndex(newIndex);
    },
  });

  const handleDateChange = (index) => {
    setSelectedDateIndex(index);
  };

  return (
    <ImageBackground source={require('../assets/newDiz/back1.jpg')} style={{flex: 1}}>
    <View style={styles.container}>
      <View style={styles.scrollLine}>
        <View
          {...panResponder.panHandlers}
          style={[
            styles.slider,
            { left: (selectedDateIndex * (width / history.length)) },
          ]}
        />
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateBar}
      >
        {history.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateButton,
              selectedDateIndex === index && styles.selectedDateButton
            ]}
            onPress={() => handleDateChange(index)}
          >
            <Text style={styles.dateText}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{history[selectedDateIndex].title}</Text>
        <ScrollView style={{width: '100%'}}>
            <Text style={styles.content}>{history[selectedDateIndex].content}</Text>
        </ScrollView>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: height * 0.07,
    paddingBottom: height * 0.12,
  },
  scrollLine: {
    height: 10,
    backgroundColor: "#e7d6c3",
    borderRadius: 5,
    marginBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
  slider: {
    width: width / history.length,
    height: 10,
    backgroundColor: "#FF6347",
    position: "absolute",
    top: 0,
  },
  dateBar: {
    marginBottom: height * 0.02,
  },
  dateButton: {
    height: height * 0.06,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginRight: 10,
    backgroundColor: "#8454ff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDateButton: {
    backgroundColor: "#FF6347",
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: "#fff",
  },
  contentContainer: {
    height: height * 0.7,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 10,
    color: '#432887',
    textAlign: 'center'
  },
  content: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'justify',
    color: '#3C3C3C',
  },
});

export default History;
