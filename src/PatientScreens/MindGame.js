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
      <Text style={styles.subTitle}>Welcome to the Mind Stimulating Games Section! 🎮🧠</Text>
      <Text style={styles.subTitlesection}>Prepare to embark on a journey of mental agility, creativity, and intrigue. Within these digital walls, we offer an eclectic assortment of brain-teasers, riddles, and puzzles—each designed to ignite your synapses and challenge your cognitive prowess. </Text>
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
    padding: 19,
    backgroundColor: '#d8bfd8',
    borderRadius: 8,
    marginTop:30,
    shadowColor: '#d8bfd8', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, 
  },
  gameIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 25, 
  },
  gameTitle: {
    fontSize: 18,
  },
  subTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitlesection:{
    fontSize: 9,
    textAlign: 'center',
    marginBottom: 10,
    color: 'grey',
  }
});

export default MindGamesScreen;
