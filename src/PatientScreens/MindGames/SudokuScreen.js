import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

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

const SudokuScreen = ({ navigation }) => {
  const [grid, setGrid] = useState(() => initializeGrid(initialPuzzle));
  const [gameActive, setGameActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);


  useEffect(() => {
    let interval;
    if (gameActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameActive]);



  useEffect(() => {
    if (checkComplete()) {
      Alert.alert("Congratulations!", "You have completed the puzzle correctly!");
      setGameActive(false);
    }
  }, [grid]);

  function initializeGrid(puzzle) {
    return puzzle.map((row, i) => row.map((num, j) => ({
      value: num ? String(num) : '',
      readOnly: num !== 0
    })));
  }

  function handleUpdateCell(value, x, y) {
    const newGrid = [...grid];
    if (!newGrid[x][y].readOnly && value.replace(/[^1-9]/g, '') !== '') {
      if (newGrid[x][y].value !== value) {
        setScore(score + 1); 
      }
      newGrid[x][y].value = value.replace(/[^1-9]/g, '');
      setGrid(newGrid);
    }
  }

  function checkComplete() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j].value === '' || grid[i][j].value !== String(initialPuzzle[i][j])) {
          return false;
        }
      }
    }
    return true;
  }


  function handleGameToggle() {
    setGameActive(!gameActive);
    if (!gameActive) {
      setTimer(0);
      setScore(0);
      setGrid(initializeGrid(initialPuzzle)); 
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Sudoku Game Section!</Text>
      </View>
      <Text style={styles.timer}>Time: {timer}s | Score: {score}</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleGameToggle}>
        <Text style={styles.buttonText}>{gameActive ? 'Pause Game' : 'Start Game'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightyellow',
  },
  header: {
    flexDirection: 'row',
   // justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 10,
   // marginTop: 30,
    marginBottom:29,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  grid: {
    width: 315,
    height: 315,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: 'lavender',
    padding: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 1,
  },
  readOnlyCell: {
    backgroundColor: '#f0f0f0',
  },
  editableCell: {
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#8fbc8f',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  timer: {
    fontSize: 16,
    margin: 30,
  },
});

export default SudokuScreen;
