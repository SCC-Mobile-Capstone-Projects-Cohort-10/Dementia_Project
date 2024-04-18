import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const gamesData = [
  {
    id: '1',
    title: 'Sudoku',
    icon: require('../img/sudoku.png'),
  },
  {
    id: '2',
    title: 'BrainTeaserScreen ',
    icon: require('../img/puzzle.png'),
  },
  {
    id: '3',
    title: 'Memory Game',
    icon: require('../img/mindgame.jpg'),
  },
];

const GameListItem = ({ game, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(game.id)}>
      <Image source={game.icon} style={styles.gameIcon} />
      <Text style={styles.gameTitle}>{game.title}</Text>
    </TouchableOpacity>
  );
};

const MindGamesScreen = ({ navigation }) => {
  const handleGamePress = (gameId) => {
    if (gameId === '1') {
      navigation.navigate('SudokuScreen');
    } else if (gameId === '2') {
      navigation.navigate('BrainTeaserScreen');
    } else if (gameId === '3') {
      navigation.navigate('MemoryGameScreen');
    }
  };

  return (
    <View style={styles.container}>
       <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      <Text style={styles.header}>Mind Stimulating Games</Text>
      </View>
      <View style={styles.gameListContainer}>
        {gamesData.map((game) => (
          <GameListItem key={game.id} game={game} onPress={handleGamePress} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10, 
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, 
  },
  gameListContainer: {
    flex: 1, 
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, 
  },
  gameIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25, 
  },
  gameTitle: {
    fontSize: 18,
  },
});

export default MindGamesScreen;
