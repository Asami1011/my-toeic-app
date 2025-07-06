import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import words from '../../data/words.json';

export default function QuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mode = params.mode || 'ja-to-en'; // デフォルトは日本語→英語

  const [question, setQuestion] = useState(null);

  useEffect(() => {
    generateNewQuestion();
  }, [mode]);

  const generateNewQuestion = () => {
    const correct = words[Math.floor(Math.random() * words.length)];

    const wrongChoices = words
      .filter((w) =>
        mode === 'ja-to-en' ? w.word !== correct.word : w.meaning !== correct.meaning
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const allChoices = [...wrongChoices, correct].sort(() => 0.5 - Math.random());

    setQuestion({
      prompt: mode === 'ja-to-en' ? correct.meaning : correct.word,
      answer: mode === 'ja-to-en' ? correct.word : correct.meaning,
      choices:
        mode === 'ja-to-en'
          ? allChoices.map((c) => c.word)
          : allChoices.map((c) => c.meaning),
    });
  };

  const handleAnswer = (choice: string) => {
    if (!question) return;

    if (choice === question.answer) {
      Alert.alert('正解！', `✅ ${question.prompt} = ${question.answer}`, [
        { text: '次の問題へ', onPress: generateNewQuestion },
      ]);
    } else {
      Alert.alert('不正解', `❌ 正解は ${question.answer}`, [
        { text: '次の問題へ', onPress: generateNewQuestion },
      ]);
    }
  };

  if (!question) {
    return (
      <View style={styles.container}>
        <Text>読み込み中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Q. 「{question.prompt}」とは？</Text>

      {question.choices.map((choice, index) => (
        <View style={styles.buttonContainer} key={index}>
          <Button title={choice} onPress={() => handleAnswer(choice)} />
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="ホームに戻る" onPress={() => router.push('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    marginVertical: 6,
    width: '80%',
  },
});
