import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Hooks personalizados
import { useGameConfig } from '../../hooks/useGameConfig';
import { usePlayers } from '../../hooks/usePlayers';

// Pantallas
import GameResultsScreen from '../../screens/Gameresultsscreen';
import GameScreen from '../../screens/GameScreen';
import MainMenuScreen from '../../screens/MainMenuScreen';
import PackagesScreen from '../../screens/PackagesScreen';
import PlayersScreen from '../../screens/PlayersScreen';
import VotingScreen from '../../screens/Votingscreen';
import WordRevealScreen from '../../screens/WordRevealScreen';

// Tipos
import { ScreenType } from '../../types';

const initialPlayers = [
  { id: 1, name: 'Jugador 1', role: null },
  { id: 2, name: 'Jugador 2', role: null },
  { id: 3, name: 'Jugador 3', role: null },
];

function shuffle<T>(array: T[]): T[] {
  const result = [...array]; // copiamos para no mutar el original
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('menu');
  const [hintsForImpostor, setHintsForImpostor] = useState(false);
  const [gameResult, setGameResult] = useState<'impostors' | 'civils' | null>(null);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [currentHint, setCurrentHint] = useState<string>('');
  
  // Hooks personalizados
  const [selectedPacks, setSelectedPacks] = useState<{ [key: string]: boolean }>({
    cantantes: false,
    actores: false,
    naturaleza: true,
    animales: true,
    cine: true,
    salud: false,
    deportes: false,
    escuela: false,
    fantasia: false,
    juegos: false,
    personajes: false,
    trabajos: false,
  });

  const {
    players,
    addPlayer,
    removePlayer,
    updatePlayerName,
    assignPlayerRoles,
    resetPlayerRoles,
    playersCount,
  } = usePlayers(initialPlayers);

  const {
    impostorCount,
    duration,
    incrementImpostor,
    decrementImpostor,
    incrementDuration,
    decrementDuration,
  } = useGameConfig(1, 3);

  // Handlers
  const handleIncrementImpostor = () => {
    incrementImpostor(playersCount);
  };

  const handleRemovePlayer = (id: number) => {
    removePlayer(id, impostorCount);
  };

  const handleToggleHints = () => {
    setHintsForImpostor(!hintsForImpostor);
  };

  const handleStartGame = () => {
    // Validar que haya al menos un paquete seleccionado
    const hasSelectedPacks = Object.values(selectedPacks).some(selected => selected);
    
    if (!hasSelectedPacks) {
      Alert.alert(
        "Sin paquetes",
        "Por favor selecciona al menos un paquete de palabras antes de iniciar."
      );
      return;
    }

    // Asignar roles a los jugadores
    assignPlayerRoles(impostorCount);
    
    // Ir a la pantalla de revelación
    setCurrentScreen('reveal');
  };

  const handleRevealFinish = (word: string, hint: string) => {
    // Guardar palabra y pista del juego
    setCurrentWord(word);
    setCurrentHint(hint);
    // Ir a la pantalla del juego principal
    setCurrentScreen('game');
  };

  const handleTimeUp = () => {
    Alert.alert(
      '⏰ ¡Se acabó el tiempo!',
      'Es hora de votar. ¿Quién creen que es el impostor?',
      [
        {
          text: 'Iniciar votación',
          onPress: () => setCurrentScreen('voting'),
        }
      ]
    );
  };

  const handleStartVoting = () => {
    setCurrentScreen('voting');
  };

  const handleGameEnd = (result: 'impostors' | 'civils') => {
    setGameResult(result);
    setCurrentScreen('results');
  };

  const handlePlayAgain = () => {
    resetPlayerRoles();
    setGameResult(null);
    setCurrentScreen('reveal'); // Volver a la revelación para nuevo juego
  };

  const handleBackToMenu = () => {
    resetPlayerRoles();
    setCurrentScreen('menu');
  };

  // Renderizado condicional
  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return (
          <MainMenuScreen
            players={players}
            impostorCount={impostorCount}
            duration={duration}
            hintsForImpostor={hintsForImpostor}
            onPlayersPress={() => setCurrentScreen('jugadores')}
            onPackagesPress={() => setCurrentScreen('paquetes')}
            onStartGame={handleStartGame}
            onIncrementDuration={incrementDuration}
            onDecrementDuration={decrementDuration}
            onToggleHints={handleToggleHints}
          />
        );
      case 'jugadores':
        return (
          <PlayersScreen
            players={players}
            impostorCount={impostorCount}
            onBack={() => setCurrentScreen('menu')}
            onAddPlayer={addPlayer}
            onRemovePlayer={handleRemovePlayer}
            onUpdatePlayerName={updatePlayerName}
            onIncrementImpostor={handleIncrementImpostor}
            onDecrementImpostor={decrementImpostor}
          />
        );
      case 'paquetes':
        return (
          <PackagesScreen 
            onBack={() => setCurrentScreen('menu')} 
            selectedPacks={selectedPacks}
            setSelectedPacks={setSelectedPacks}
          />
        );
      case 'reveal':
        return (
          <WordRevealScreen
            players={shuffle(players)}
            selectedPacks={selectedPacks}
            hintsForImpostor={hintsForImpostor}
            onFinish={handleRevealFinish}
            onBack={handleBackToMenu}
          />
        );
      case 'game':
        return (
          <GameScreen
            duration={duration}
            onTimeUp={handleTimeUp}
            onBack={handleBackToMenu}
            onStartVoting={handleStartVoting}
            players={players}
            selectedPacks={selectedPacks}
            hintsForImpostor={hintsForImpostor}
          />
        );
      case 'voting':
        return (
          <VotingScreen
            players={players}
            impostorCount={impostorCount}
            word={currentWord}
            hint={currentHint}
            hintsForImpostor={hintsForImpostor}
            onGameEnd={handleGameEnd}
            onBack={handleBackToMenu}
          />
        );
      case 'results':
        return (
          <GameResultsScreen
            result={gameResult || 'civils'}
            players={players}
            word={currentWord}
            hint={currentHint}
            hintsForImpostor={hintsForImpostor}
            onBackToMenu={handleBackToMenu}
            onPlayAgain={handlePlayAgain}
          />
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient 
      colors={['#1e1b4b', '#581c87', '#831843']} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {renderScreen()}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  safeArea: { 
    flex: 1 
  },
  scrollContent: { 
    padding: 16,
    flexGrow: 1,
  },
});