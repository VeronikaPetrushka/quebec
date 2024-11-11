import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const ChampionQuiz = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [showHints, setShowHints] = useState(false);
  const [showLives, setShowLives] = useState(false);
  const [hintsUsed, setHintsUsed] = useState({
    skip: false,
    showAnswer: false,
  });

  useEffect(() => {
    if (!showHints && !showLives) {
      setAnswered(false);
      setSelectedOption(null);
      setCorrectOption(null);
    }
  }, [showHints, showLives]);

  useEffect(() => {
    setHintsUsed({ skip: false, showAnswer: false });
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option) => {
    if (answered || lives === 0) return;

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

  const handleHintSelect = (type) => {
    if (type === 'skip') {
      setScore(score - 50);
      setHintsUsed((prev) => ({ ...prev, skip: true }));
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (type === 'showAnswer') {
      setScore(score - 75);
      setHintsUsed((prev) => ({ ...prev, showAnswer: true }));
      setCorrectOption(quiz.questions[currentQuestionIndex].correct);
    }

    setShowHints(false);
  };

  const handleLifePurchase = (amount) => {
    const lifePrices = { 1: 50, 2: 75, 3: 100 };
    const price = lifePrices[amount];

    if (score >= price && lives + amount <= 3) {
      setScore(score - price);
      setLives((prevLives) => Math.min(prevLives + amount, 3));
    }

    setShowLives(false);
  };

  const renderHints = () => {
    const hints = [
      { id: 'skip', text: 'Skip Question - 50 Points', price: 50 },
      { id: 'showAnswer', text: 'Show Answer - 75 Points', price: 75 },
    ];

    return (
      <FlatList
        horizontal
        data={hints}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.hintCard, { opacity: score >= item.price ? 1 : 0.5 }]}
            onPress={() => score >= item.price && handleHintSelect(item.id)}
            disabled={score < item.price}
          >
            <Text style={styles.hintText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderLives = () => {
    const livesOptions = [
      { id: 1, text: '1 Life - 50 Points', price: 50 },
      { id: 2, text: '2 Lives - 75 Points', price: 75 },
      { id: 3, text: '3 Lives - 100 Points', price: 100 },
    ];

    return (
      <FlatList
        horizontal
        data={Array(10).fill(livesOptions).flat()}
        keyExtractor={(_, index) => `life-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.hintCard,
              {
                opacity: score >= item.price && lives + item.id <= 3 ? 1 : 0.5,
              },
            ]}
            onPress={() => handleLifePurchase(item.id)}
            disabled={score < item.price || lives + item.id > 3}
          >
            <Text style={styles.hintText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderQuestion = () => {
    const question = quiz.questions[currentQuestionIndex];
    const options = question.options;

    return (
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question.question}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Text style={styles.timer}>{score}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowLives(true)}>
            {[...Array(3)].map((_, index) => (
              <View key={index} style={styles.heart}>
                <Icons type={index < lives ? 'heart' : 'heart-grey'} />
              </View>
            ))}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowHints(true)} style={styles.hint}>
            <Icons type="hint" />
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
              : isCorrect
              ? styles.correctOption
              : styles.option;

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleOptionSelect(option)}
                disabled={answered || hintsUsed.showAnswer}
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

  return (
    <View style={styles.container}>
      <Text style={styles.topic}>{quiz.topic}</Text>
      {showHints ? (
        renderHints()
        ) : showLives ? (
        renderLives()
        ) : currentQuestionIndex < quiz.questions.length ? (
        renderQuestion()
        ) : (
        renderFinish()
      )}
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
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0A3D62',
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
  questionContainer: {
    marginBottom: height * 0.02,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: height * 0.02,
    textAlign: 'center',
    color: '#3C3C3C',
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
    marginRight: 1,
  },
  hint: {
    width: 35,
    height: 35,
  },
  hintCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChampionQuiz;
