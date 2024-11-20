import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Alert, Modal, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import crafts from '../constants/crafts';
import Icons from './Icons';

const { height, width } = Dimensions.get('window');

const Crafts = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [storedCrafts, setStoredCrafts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchTotalScore = async () => {
      const score = await AsyncStorage.getItem('totalScore');
      setTotalScore(score ? parseInt(score) : 0);
    };

    fetchTotalScore();
  }, []);

  useEffect(() => {
    const fetchCrafts = async () => {
      const storedCrafts = await AsyncStorage.getItem('crafts');
      if (storedCrafts) {
        setStoredCrafts(JSON.parse(storedCrafts));
      } else {
        await AsyncStorage.setItem('crafts', JSON.stringify(crafts));
        setStoredCrafts(crafts);
      }
    };

    fetchCrafts();
  }, []);

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % storedCrafts.length;
    setCurrentIndex(nextIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
  };

  const goToPrevious = () => {
    const prevIndex = (currentIndex - 1 + storedCrafts.length) % storedCrafts.length;
    setCurrentIndex(prevIndex);
    flatListRef.current.scrollToIndex({ animated: true, index: prevIndex });
  };

  const handleBuyMaterial = async (craftIndex, materialIndex) => {
    if (totalScore >= 500) {
      const newScore = totalScore - 500;
      setTotalScore(newScore);
      await AsyncStorage.setItem('totalScore', newScore.toString());

      const updatedCrafts = [...storedCrafts];
      updatedCrafts[craftIndex].materials[materialIndex].purchased = true;
      setStoredCrafts(updatedCrafts);
      await AsyncStorage.setItem('crafts', JSON.stringify(updatedCrafts));
    } else {
      Alert.alert('Insufficient Funds', 'You do not have enough score to buy this material.');
    }
  };

  const handleCombineClick = (craft) => {
    setSelectedCraft(craft);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleNavigateToDetails = (craft) => {
    navigation.navigate('CraftDetailsScreen', {
      name: craft.name,
      fact: craft.fact,
      history: craft.history,
      significance: craft.significance,
    });
    setIsModalVisible(false);
  };

  const isAllMaterialsPurchased = (materials) => {
    return materials.every(material => material.purchased);
  };

  return (
    <ImageBackground source={require('../assets/newDiz/back1.jpg')} style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.scoreText}>{totalScore}</Text>

      <FlatList
        horizontal
        data={storedCrafts}
        renderItem={({ item, index: craftIndex }) => (
          <View style={styles.card}>
            <Text style={styles.craftName}>{item.name}</Text>
            <Text style={styles.materialsTitle}>Materials:</Text>
            <FlatList
              data={item.materials}
              renderItem={({ item: material, index: materialIndex }) => (
                <View style={styles.materialContainer}>
                  <Text style={styles.materials}>{material.material}</Text>
                  <TouchableOpacity 
                    onPress={() => handleBuyMaterial(craftIndex, materialIndex)}
                    disabled={material.purchased || totalScore < 500}
                    style={[
                      styles.buyButton, 
                      { backgroundColor: material.purchased || totalScore < 500 ? '#ccc' : '#FF6347' }
                    ]}
                  >
                    <Text style={styles.buyButtonText}>
                      {material.purchased ? 'Purchased' : '500'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

            {isAllMaterialsPurchased(item.materials) && (
              <TouchableOpacity
                style={styles.combineButton}
                onPress={() => handleCombineClick(item)}
              >
                <Text style={styles.combineButtonText}>Combine</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        extraData={currentIndex}
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

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.recipeTitle}>Recipe</Text>
            <FlatList
              data={selectedCraft?.recipe}
              renderItem={({ item }) => (
                <Text style={styles.recipeItem}>{item}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleNavigateToDetails(selectedCraft)}
                style={styles.viewDetailsButton}
              >
                <Text style={styles.viewDetailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: height * 0.04,
  },
  card: {
    width: width * 0.85,
    height: height * 0.6,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  craftName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#432887',
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
  materialsTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#432887',
    marginBottom: height * 0.02,
  },
  materials: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  materialContainer: {
    marginBottom: height * 0.04,
    alignItems: 'center',
  },
  buyButton: {
    marginTop: 10,
    paddingVertical: 7,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  combineButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
  },
  combineButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  arrow: {
    width: 50,
    height: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#432887',
    marginBottom: 20,
  },
  recipeItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  modalButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  closeButton: {
    width: '47%',
    paddingVertical: 10,
    backgroundColor: '#8454ff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  viewDetailsButton: {
    paddingVertical: 10,
    width: '47%',
    backgroundColor: '#432887',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default Crafts;
