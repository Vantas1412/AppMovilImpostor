import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

// Hooks personalizados
import { usePlayers } from '../../hooks/usePlayers';
import { useGameConfig } from '../../hooks/useGameConfig';

// Pantallas
import MainMenuScreen from '../../screens/MainMenuScreen';
import PlayersScreen from '../../screens/PlayersScreen';
import PackagesScreen from '../../screens/PackagesScreen';

// Tipos
import { ScreenType } from '../../types';

const initialPlayers = [
  { id: 1, name: 'Jugador 1' },
  { id: 2, name: 'Jugador 2' },
  { id: 3, name: 'Jugador 3' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('menu');
  
  // Hooks personalizados
  const {
    players,
    addPlayer,
    removePlayer,
    updatePlayerName,
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

  const handleStartGame = () => {
    Alert.alert("¡A jugar!", `Configuración:\nJugadores: ${playersCount}\nImpostores: ${impostorCount}\nDuración: ${duration} min`);
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
            onPlayersPress={() => setCurrentScreen('jugadores')}
            onPackagesPress={() => setCurrentScreen('paquetes')}
            onStartGame={handleStartGame}
            onIncrementDuration={incrementDuration}
            onDecrementDuration={decrementDuration}
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