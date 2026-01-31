import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import RevealScreen from '../components/RevealScreen';
import { Word } from '../data/package';
import { getRandomWord, processWordForPlayer } from '../data/words';
import { Player } from '../types';

interface WordRevealScreenProps {
  players: Player[];
  selectedPacks: { [key: string]: boolean };
  hintsForImpostor: boolean;
  onFinish: (word: string, hint: string) => void;
  onBack: () => void;
}

const WordRevealScreen: React.FC<WordRevealScreenProps> = ({
  players,
  selectedPacks,
  hintsForImpostor,
  onFinish,
  onBack,
}) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);

  // Seleccionar una palabra al cargar
  useEffect(() => {
    selectWord();
  }, []);

  const selectWord = () => {
    const word = getRandomWord(selectedPacks);
    
    if (!word) {
      Alert.alert(
        'Error',
        'No hay palabras disponibles en los paquetes seleccionados',
        [
          {
            text: 'Volver',
            onPress: onBack,
          },
        ]
      );
      return;
    }

    setSelectedWord(word);
    setLoading(false);
  };

  const handleNext = () => {
    setCurrentPlayerIndex(prev => prev + 1);
  };

  const handleFinish = () => {
    if (!selectedWord) return;

    // Extraer la palabra principal (para civiles)
    // La palabra original está en selectedWord.word
    const mainWord = selectedWord.word || '';
    
    // Obtener la pista para impostores
    let hint = '';
    if (hintsForImpostor && selectedWord.hints && selectedWord.hints.length > 0) {
      // Usar una pista aleatoria del array de pistas
      const randomIndex = Math.floor(Math.random() * selectedWord.hints.length);
      hint = selectedWord.hints[randomIndex];
    }

    Alert.alert(
      '¡Todos listos!',
      'Todos los jugadores han visto sus palabras. ¿Listo para comenzar?',
      [
        {
          text: 'Comenzar',
          onPress: () => onFinish(mainWord, hint),
        },
      ]
    );
  };

  if (loading || !selectedWord) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#581c87" />
      </View>
    );
  }

  const currentPlayer = players[currentPlayerIndex];
  const isImpostor = currentPlayer.role === 'impostor';
  
  // Procesar la palabra según el rol del jugador
  const processedWord = processWordForPlayer(
    selectedWord,
    isImpostor,
    hintsForImpostor
  );

  return (
    <View style={styles.container}>
      <RevealScreen
        currentPlayer={currentPlayer}
        currentWord={processedWord}
        playerIndex={currentPlayerIndex}
        totalPlayers={players.length}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WordRevealScreen;