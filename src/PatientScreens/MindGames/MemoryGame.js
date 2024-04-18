import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const createCardSet = () => {
  const cardValues = ['😀', '🐶', '🍎', '🚗', '🌵', '🏀'];
  const deck = [...cardValues, ...cardValues];
  return deck.sort(() => Math.random() - 0.5);
};

const Card = ({ value, onFlip, isFlipped }) => {
  const content = isFlipped ? value : '❓';
  return (
    <TouchableOpacity
      style={[styles.card, isFlipped ? styles.flippedCard : styles.hiddenCard]}
      onPress={onFlip}>
      <Text style={styles.cardText}>{content}</Text>
    </TouchableOpacity>
  );
};

const MemoryGameScreen = ({ navigation }) => {
  const [cards, setCards] = useState(createCardSet());
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [score, setScore] = useState(0);
  const [pairCheck, setPairCheck] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn]);

  useEffect(() => {
    if (pairCheck.length === 2) {
      const [firstIndex, secondIndex] = pairCheck;
      if (cards[firstIndex] === cards[secondIndex]) {
        setScore(score + 20);
      } else {
        setTimeout(() => {
          setFlippedIndexes(flippedIndexes.filter(index => index !== firstIndex && index !== secondIndex));
        }, 1000);
      }
      setPairCheck([]);
    }
  }, [pairCheck]);

  useEffect(() => {
    if (flippedIndexes.length === 2 && !timerOn) {
      setTimerOn(true);
    }
    if (flippedIndexes.length === cards.length) {
      setTimerOn(false);
      Alert.alert("Game Over!", `Score: ${score}. Time taken: ${timeElapsed} seconds`, [
        { text: "Restart", onPress: () => restartGame() }
      ]);
    }
  }, [flippedIndexes, timerOn]);

  const handleFlip = (index) => {
    if (!flippedIndexes.includes(index)) {
      setFlippedIndexes([...flippedIndexes, index]);
      setPairCheck([...pairCheck, index]);
    }
  };

  const restartGame = () => {
    setFlippedIndexes([]);
    setCards(createCardSet());
    setScore(0);
    setTimeElapsed(0);
    setTimerOn(false);
    setPairCheck([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Memory Game</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      <Text style={styles.timerText}>Time: {timeElapsed} sec</Text>
      <FlatList
        data={cards}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card
            value={item}
            isFlipped={flippedIndexes.includes(index)}
            onFlip={() => handleFlip(index)}
          />
        )}
        contentContainerStyle={styles.cardGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {},
  cardGrid: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  hiddenCard: {
    backgroundColor: '#cccccc',
  },
  flippedCard: {
    backgroundColor: '#4CAF50',
  },
  cardText: {
    fontSize: 24,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MemoryGameScreen;
