import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';



const questions = [
  { question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], correctAnswer: 'Paris' },
  { question: 'What is the largest mammal?', options: ['Elephant', 'Blue Whale', 'Shark', 'Rhino'], correctAnswer: 'Blue Whale' },
  { question: 'What is 10 multiplied by 5?', options: ['50', '100', '15', '5'], correctAnswer: '50' },
  { question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Jupiter', 'Venus', 'Saturn'], correctAnswer: 'Mars' },
  { question: 'Who wrote "Macbeth"?', options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], correctAnswer: 'William Shakespeare' },
  { question: 'What is the chemical symbol for water?', options: ['H2O', 'CO2', 'O2', 'N2'], correctAnswer: 'H2O' },
  { question: 'What is the hardest natural substance on Earth?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correctAnswer: 'Diamond' },
  { question: 'Which country hosted the 2016 Summer Olympics?', options: ['Brazil', 'China', 'Russia', 'Japan'], correctAnswer: 'Brazil' },
  { question: 'What is the longest river in the world?', options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'], correctAnswer: 'Amazon' },
  { question: 'Who painted the Mona Lisa?', options: ['Vincent Van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'], correctAnswer: 'Leonardo da Vinci' },
  { question: 'What is the smallest planet in our solar system?', options: ['Mercury', 'Mars', 'Earth', 'Venus'], correctAnswer: 'Mercury' },
  { question: 'How many continents are there on Earth?', options: ['Four', 'Five', 'Six', 'Seven'], correctAnswer: 'Seven' }
];


const BrainTeaserScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      Alert.alert('Correct!', 'Great job, that\'s the right answer.');
    } else {
      Alert.alert('Incorrect!', 'That\'s not the right answer.');
    }
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      endGame();
    }
  };

  const startGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(60);
    setTimerRunning(true);
  };

  const endGame = () => {
    setTimerRunning(false);
    Alert.alert('Game Over!', `Your score: ${score}`, [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            endGame();
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Brain Teaser</Text>
        <TouchableOpacity onPress={startGame} style={styles.startButton}>
          <Text>Start Game</Text>
        </TouchableOpacity>
      </View>
      {timerRunning && <Text style={styles.timer}>Timer: {timer}</Text>}
      <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
      {questions[currentQuestionIndex].options.map((option, index) => (
        <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswer(option)}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.score}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 66,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    // Styles if needed
  },
  startButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  timer: {
    fontSize: 18,
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 90,
    textAlign: 'center',
    
  },
  answerButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  score: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default BrainTeaserScreen;
