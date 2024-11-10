import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ChampionQuiz = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);

  const handleOptionSelect = (option) => {
    if (answered) return;

    setSelectedOption(option);
    setAnswered(true);

    if (option === quiz.questions[currentQuestionIndex].correct) {
      setCorrectOption(option);
    } else {
      setCorrectOption(quiz.questions[currentQuestionIndex].correct);
    }

    setTimeout(() => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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

  const renderEndMessage = () => {
    return (
      <View style={styles.endMessageContainer}>
        <Text style={styles.endMessage}>Quiz Finished!</Text>
        <Text style={styles.endMessage}>You have completed all the questions.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topic}>{quiz.topic}</Text>
      {currentQuestionIndex < quiz.questions.length
        ? renderQuestion()
        : renderEndMessage()}
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
});

export default ChampionQuiz;
