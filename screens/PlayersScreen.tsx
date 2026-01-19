import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Card, Title, Text, Button, Divider } from 'react-native-paper';
import { Player } from '../types';
import PlayerItem from '../components/PlayerItem';
import ImpostorControls from '../components/ImpostorControls';

interface PlayersScreenProps {
  players: Player[];
  impostorCount: number;
  onBack: () => void;
  onAddPlayer: () => void;
  onRemovePlayer: (id: number, impostorCount: number) => void;
  onUpdatePlayerName: (id: number, name: string) => void;
  onIncrementImpostor: () => void;
  onDecrementImpostor: () => void;
}

const PlayersScreen: React.FC<PlayersScreenProps> = ({
  players,
  impostorCount,
  onBack,
  onAddPlayer,
  onRemovePlayer,
  onUpdatePlayerName,
  onIncrementImpostor,
  onDecrementImpostor,
}) => {
  const handleRemovePlayer = (id: number) => {
    if (players.length <= 3) {
      Alert.alert("Límite mínimo", "El juego requiere al menos 3 jugadores.");
      return;
    }
    onRemovePlayer(id, impostorCount);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Lista de Jugadores</Title>
          <Text style={styles.subtitle}>
            Mínimo: 3 jugadores ({players.length - impostorCount} civiles / {impostorCount} impostores)
          </Text>

          <ImpostorControls
            impostorCount={impostorCount}
            playersCount={players.length}
            onIncrement={onIncrementImpostor}
            onDecrement={onDecrementImpostor}
          />

          <Divider style={styles.divider} />

          <ScrollView style={styles.playerList}>
            {players.map((player) => (
              <PlayerItem
                key={player.id}
                player={player}
                onUpdateName={onUpdatePlayerName}
                onRemove={handleRemovePlayer}
              />
            ))}
          </ScrollView>

          <Button 
            mode="outlined" 
            icon="plus" 
            onPress={onAddPlayer} 
            style={styles.addButton}
          >
            Añadir Jugador
          </Button>

          <Button 
            mode="contained" 
            onPress={onBack} 
            style={styles.backButton}
          >
            CONFIRMAR
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#581c87',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#64748b',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  playerList: {
    maxHeight: 350,
    marginBottom: 16,
  },
  addButton: {
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: '#581c87',
  },
});

export default PlayersScreen;