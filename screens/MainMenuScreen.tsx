import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, List, Button } from 'react-native-paper';
import { Player } from '../types';
import TimeControls from '../components/TimeControls';

interface MainMenuScreenProps {
  players: Player[];
  impostorCount: number;
  duration: number;
  onPlayersPress: () => void;
  onPackagesPress: () => void;
  onStartGame: () => void;
  onIncrementDuration: () => void;
  onDecrementDuration: () => void;
}

const MainMenuScreen: React.FC<MainMenuScreenProps> = ({
  players,
  impostorCount,
  duration,
  onPlayersPress,
  onPackagesPress,
  onStartGame,
  onIncrementDuration,
  onDecrementDuration,
}) => {
  const civiliansCount = players.length - impostorCount;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>Impostor Gozu</Title>
        
        <List.Item
          title="Jugadores"
          description={`${players.length} totales (${civiliansCount} Civiles / ${impostorCount} Imp)`}
          left={props => <List.Icon {...props} icon="account-group" color="#3b82f6" />}
          onPress={onPlayersPress}
          style={styles.clickableItem}
        />
        
        <List.Item
          title="Paquetes"
          left={props => <List.Icon {...props} icon="package-variant" color="#f59e0b" />}
          onPress={onPackagesPress}
          style={styles.clickableItem}
        />
        
        <TimeControls
          duration={duration}
          onIncrement={onIncrementDuration}
          onDecrement={onDecrementDuration}
        />
        
        <Button 
          mode="contained" 
          style={styles.startButton} 
          onPress={onStartGame}
        >
          INICIAR
        </Button>
      </Card.Content>
    </Card>
  );
};

// En /src/screens/MainMenuScreen.tsx - Estilos actualizados
const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#581c87',
    marginBottom: 24,
  },
  clickableItem: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    marginVertical: 6,
    paddingHorizontal: 8,
  },
  startButton: {
    marginTop: 24,
    backgroundColor: '#10b981',
    borderRadius: 12,
  },
  timeContainer: {
    marginVertical: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#334155',
    marginBottom: 8,
  },
});

export default MainMenuScreen;