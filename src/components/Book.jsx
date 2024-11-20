import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, Alert, ScrollView, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import book from '../constants/book';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const Book = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [purchasedTopics, setPurchasedTopics] = useState({});
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const score = await AsyncStorage.getItem('totalScore');
      const storedTopics = await AsyncStorage.getItem('purchasedTopics');

      setTotalScore(score ? parseInt(score) : 0);
      setPurchasedTopics(storedTopics ? JSON.parse(storedTopics) : {});
    };

    fetchData();
  }, []);

  const handleBuy = async (index) => {
    if (totalScore < 2000) {
      Alert.alert('Insufficient Score', 'You do not have enough score to purchase this topic.');
      return;
    }

    const topic = book[index];
    const newScore = totalScore - 2000;
    const updatedTopics = { ...purchasedTopics, [index]: topic };

    setTotalScore(newScore);
    setPurchasedTopics(updatedTopics);

    await AsyncStorage.setItem('totalScore', newScore.toString());
    await AsyncStorage.setItem('purchasedTopics', JSON.stringify(updatedTopics));
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % book.length;
    setCurrentIndex(nextIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + book.length) % book.length;
    setCurrentIndex(prevIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: prevIndex });
  };

  return (
    <ImageBackground source={require('../assets/newDiz/back1.jpg')} style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.scoreText}>{totalScore}</Text>

      <FlatList
        horizontal
        data={book}
        renderItem={({ item, index }) => (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.topicCard}>
              <Image source={item.image} style={styles.topicImage} />
              <Text style={styles.topicTitle}>{item.topic}</Text>

              <TouchableOpacity
                style={[
                  styles.buyButton,
                  totalScore < 2000 && { backgroundColor: '#d3d3d3' },
                ]}
                onPress={() => handleBuy(index)}
                disabled={!!purchasedTopics[index] || totalScore < 2000}
              >
                <Text style={styles.buyButtonText}>
                  {purchasedTopics[index] ? 'Purchased' : 'Buy for 2000'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: width * 0.85, alignItems: 'center' }}>
              <ScrollView
                style={{ width: width * 0.85, maxHeight: height * 0.2 }}
                nestedScrollEnabled={true}
              >
                {purchasedTopics[index] &&
                  purchasedTopics[index].articles.map((article, idx) => (
                    <TouchableOpacity 
                        key={idx} 
                        style={styles.titleBtn} 
                        onPress={() => navigation.navigate('ArticleScreen', {
                        title: article.title,
                        content: article.content,
                        image: article.image,
                    })}>
                      <Text style={styles.articleTitle}>{article.title}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        extraData={{ currentIndex, purchasedTopics }}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={goToPrevious}
          style={[styles.arrow, { transform: [{ rotate: '180deg' }] }]}
        >
          <Icons type={'arrow'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNext} style={styles.arrow}>
          <Icons type={'arrow'} />
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: height * 0.07,
    paddingBottom: height * 0.12,
  },
  scoreText: {
    color: '#FF6347',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: height * 0.02,
  },
  topicCard: {
    width: width * 0.85,
    height: height * 0.42,
    marginBottom: height * 0.03,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  topicImage: {
    width: '100%',
    height: height * 0.25,
    borderRadius: 10,
    marginBottom: height * 0.03,
  },
  topicTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#432887',
    textAlign: 'center',
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#FF6347',
    paddingVertical: height * 0.01,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
  articleTitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: height * 0.01,
    paddingHorizontal: 20,
  },
  arrow: {
    width: 50,
    height: 50,
  },
  titleBtn: {
    padding: 5,
    backgroundColor: '#fff',
    marginBottom: 7,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default Book;
