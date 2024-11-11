import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import Icons from './Icons';

const { height } = Dimensions.get('window');

const PathfinderQuiz = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(90);
  const [lives, setLives] = useState(3);
  const [showHints, setShowHints] = useState(false);
  const [showLives, setShowLives] = useState(false);
  const [hintsUsed, setHintsUsed] = useState({
    eliminate: false,
    answerTwice: false,
    skip: false,
  });

  useEffect(() => {
    if (timer > 0 && currentQuestionIndex < quiz.questions.length && lives > 0 && !showHints  && !showLives) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, currentQuestionIndex, lives, showHints, showLives]);

  useEffect(() => {
    if (!showHints && !showLives) {
      setAnswered(false);
      setSelectedOption(null);
      setCorrectOption(null);
    }
  }, [showHints, showLives]);

  useEffect(() => {
    setHintsUsed({ eliminate: false, answerTwice: false, skip: false });
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option) => {
    if (answered || timer === 0 || lives === 0) return;

    setSelectedOption(option);

    if (!hintsUsed.answerTwice || selectedOption) {
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
    }
  };

  const handleHintSelect = (type) => {
    if (type === 'eliminate') {

      const question = quiz.questions[currentQuestionIndex];
      const wrongOptions = question.options.filter((opt) => opt !== question.correct);
      const optionToEliminate = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];

      question.options = question.options.filter((opt) => opt !== optionToEliminate);
      setScore(score - 25);
      setHintsUsed((prev) => ({ ...prev, eliminate: true }));
    } else if (type === 'answerTwice') {

      setScore(score - 50);
      setHintsUsed((prev) => ({ ...prev, answerTwice: true }));
    } else if (type === 'skip') {

      setScore(score - 75);
      setHintsUsed((prev) => ({ ...prev, skip: true }));
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
      { id: 'eliminate', text: 'Eliminate 1 Option - 25 Points', price: 25 },
      { id: 'answerTwice', text: 'Answer Twice - 50 Points', price: 50 },
      { id: 'skip', text: 'Skip Question - 75 Points', price: 75 },
    ];

    return (
      <FlatList
        horizontal
        data={Array(10).fill(hints).flat()}
        keyExtractor={(_, index) => `hint-${index}`}
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
          <Text style={styles.timer}>{formatTime(timer)}</Text>
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
      <Image source={quiz.image} style={styles.image} />
      {showHints ? (
        renderHints()
        ) : showLives ? (
        renderLives()
        ) : timer > 0 && currentQuestionIndex < quiz.questions.length ? (
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
    paddingTop: height * 0.08,
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
  image: {
    width: '100%',
    height: height * 0.35,
    resizeMode: 'cover',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3C3C3C',
    marginBottom: height * 0.03,
  },
});

export default PathfinderQuiz;
