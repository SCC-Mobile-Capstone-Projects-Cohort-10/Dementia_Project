import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have expo installed or use a different icon set

// Mock function for Sudoku puzzle generation
const generatePuzzle = () => {
  const puzzle = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push({ value: '', readOnly: false }); // Empty for user to fill
    }
    puzzle.push(row);
  }
  return puzzle;
};

// Sudoku Cell Component
const SudokuCell = ({ cell, onUpdate, cellIndex, rowIndex }) => {
  return (
    <TextInput
      style={[styles.cell, cell.readOnly ? styles.readOnlyCell : styles.editableCell]}
      onChangeText={(text) => onUpdate(text, rowIndex, cellIndex)}
      value={cell.value}
      editable={!cell.readOnly}
      maxLength={1}
      keyboardType="number-pad"
      textAlign="center"
    />
  );
};

// Main Sudoku Game Component
const SudokuScreen = ({ navigation }) => {
  const [grid, setGrid] = useState(generatePuzzle());
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (gameActive) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    } else if (!gameActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameActive, timer]);

  const handleUpdateCell = (value, x, y) => {
    const newGrid = [...grid];
    newGrid[x][y] = { ...newGrid[x][y], value: value.replace(/[^1-9]/g, '') };
    setGrid(newGrid);
    setScore(score + 1); // Assuming each valid entry increases score by 1
  };

  const handleStartGame = () => {
    setGameActive(true);
    setTimer(0);
    setScore(0);
    setGrid(generatePuzzle());
  };

  const handleEndGame = () => {
    setGameActive(false);
    Alert.alert("Game Over", "Your final score: " + score);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Sudoku Game</Text>
        <Text style={styles.scoreText}>Score: {score} Time: {timer}s</Text>
      </View>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => (
              <SudokuCell
                key={`${rowIndex}-${cellIndex}`}
                cell={cell}
                cellIndex={cellIndex}
                rowIndex={rowIndex}
                onUpdate={handleUpdateCell}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEndGame}>
          <Text style={styles.buttonText}>End Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
   // marginTop: 30,
    marginBottom:79,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 16,
  },
  grid: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: '#000',
    marginTop: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  readOnlyCell: {
    backgroundColor: '#f0f0f0',
  },
  editableCell: {
    backgroundColor: '#fff',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SudokuScreen;
