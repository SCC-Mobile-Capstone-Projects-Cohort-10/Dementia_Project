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
    title: 'Brain Teaser',
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
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>Mind Games</Text>
      </View>
      <Text style={styles.subTitle}>Choose a Game to Play!</Text>
      <View style={styles.gameListContainer}>
        {gamesData.map(game => (
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
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  gameListContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default MindGamesScreen;
