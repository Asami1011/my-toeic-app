import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TOEIC App!</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="日本語 → 英語 クイズを始める"
          onPress={() => router.push('/quiz?mode=ja-to-en')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="英語 → 日本語 クイズを始める"
          onPress={() => router.push('/quiz?mode=en-to-ja')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});
