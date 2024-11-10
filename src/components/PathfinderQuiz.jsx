import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icons from './Icons';

const PathfinderQuiz = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(90);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    if (timer > 0 && currentQuestionIndex < quiz.questions.length && lives > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, currentQuestionIndex, lives]);

  const handleOptionSelect = (option) => {
    if (answered || timer === 0 || lives === 0) return;

    setSelectedOption(option);
    setAnswered(true);

    if (option === quiz.questions[currentQuestionIndex].correct) {
      setCorrectOption(option);
      setScore(score + 100);
    } else {
      setCorrectOption(quiz.questions[currentQuestionIndex].correct);
      setLives(lives - 1);
    }

    if (lives === 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(quiz.questions.length);
      }, 1000);
    }

    setTimeout(() => {
      if (lives > 0) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      setAnswered(false);
      setSelectedOption(null);
      setCorrectOption(null);
    }, 1000);
  };

  const renderQuestion = () => {
    const question = quiz.questions[currentQuestionIndex];
    const options = question.options;

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question.question}</Text>
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
            <Text style={styles.timer}>{formatTime(timer)}</Text>
            <Text style={styles.timer}>{score}</Text>
        </View>
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {[...Array(3)].map((_, index) => (
                    <View key={index} style={styles.heart}>
                        <Icons type={index < lives ? 'heart' : 'heart-grey'} />
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.hint}>
                <Icons type={'hint'} />
            </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            const isSelected = option === selectedOption;
            const isCorrect = option === correctOption;
            const optionStyle = isSelected
              ? isCorrect
                ? styles.correctOption
                : styles.incorrectOption
              : styles.option;

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleOptionSelect(option)}
                disabled={answered}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderFinish = () => {
    return (
      <View style={styles.endMessageContainer}>
        <Text style={styles.endMessage}>Quiz Finished!</Text>
        <Text style={styles.endMessage}>Your final score is: {score}</Text>
      </View>
    );
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topic}>{quiz.topic}</Text>

      {timer > 0 && currentQuestionIndex < quiz.questions.length
        ? renderQuestion()
        : renderFinish()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  topic: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionsContainer: {
    marginTop: 10,
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  correctOption: {
    backgroundColor: 'green',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  incorrectOption: {
    backgroundColor: 'red',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  endMessageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  endMessage: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  heart: {
    width: 35,
    height: 35,
    marginRight: 1
  },
  hint: {
    width: 35,
    height: 35,
  }
});

export default PathfinderQuiz;
