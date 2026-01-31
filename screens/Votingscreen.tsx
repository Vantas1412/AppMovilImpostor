import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Player } from '../types';

interface VotingScreenProps {
  players: Player[];
  impostorCount: number;
  word: string;
  hint: string;
  hintsForImpostor: boolean;
  onGameEnd: (result: 'impostors' | 'civils') => void;
  onBack: () => void;
}

export default function VotingScreen({
  players,
  impostorCount,
  word,
  hint,
  hintsForImpostor,
  onGameEnd,
  onBack,
}: VotingScreenProps) {
  const [activePlayers, setActivePlayers] = useState<Player[]>(players);
  const [votingRound, setVotingRound] = useState(1);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  // Contar impostores y civiles activos
  const activeImpostors = activePlayers.filter(p => p.role === 'impostor').length;
  const activeCivils = activePlayers.filter(p => p.role === 'civil').length;

  // Verificar condiciones de victoria
  const checkGameEnd = (remainingPlayers: Player[]) => {
    const remainingImpostors = remainingPlayers.filter(p => p.role === 'impostor').length;
    const remainingCivils = remainingPlayers.filter(p => p.role === 'civil').length;

    // Los impostores ganan si igualan o superan a los civiles
    if (remainingImpostors >= remainingCivils) {
      return 'impostors';
    }

    // Los civiles ganan si eliminan a todos los impostores
    if (remainingImpostors === 0) {
      return 'civils';
    }

    return null;
  };

  const handleVote = () => {
    if (selectedPlayer === null) {
      Alert.alert('Selecciona un jugador', 'Debes seleccionar a quién eliminar');
      return;
    }

    const votedPlayer = activePlayers.find(p => p.id === selectedPlayer);
    if (!votedPlayer) return;

    const isImpostorVoted = votedPlayer.role === 'impostor';

    // Eliminar jugador
    const newActivePlayers = activePlayers.filter(p => p.id !== selectedPlayer);

    // Verificar condiciones de victoria
    const gameResult = checkGameEnd(newActivePlayers);

    if (gameResult) {
      // Mostrar resultado antes de terminar
      Alert.alert(
        gameResult === 'impostors' ? '🎭 ¡Ganaron los Impostores!' : '👥 ¡Ganaron los Civiles!',
        gameResult === 'impostors'
          ? `Los impostores han igualado el número de civiles. ${votedPlayer.name} era ${isImpostorVoted ? 'impostor' : 'civil'}.`
          : `¡Todos los impostores han sido eliminados! ${votedPlayer.name} era el último impostor.`,
        [
          {
            text: 'Ver resultados',
            onPress: () => onGameEnd(gameResult),
          },
        ]
      );
      return;
    }

    // Continuar con siguiente ronda
    Alert.alert(
      isImpostorVoted ? '✅ ¡Acierto!' : '❌ Error',
      `${votedPlayer.name} era ${isImpostorVoted ? 'IMPOSTOR' : 'CIVIL'}. ${
        isImpostorVoted
          ? `¡Bien hecho! Quedan ${newActivePlayers.filter(p => p.role === 'impostor').length} impostor(es).`
          : `Se eliminó a un civil. Quedan ${newActivePlayers.filter(p => p.role === 'civil').length} civiles.`
      }`,
      [
        {
          text: 'Continuar',
          onPress: () => {
            setActivePlayers(newActivePlayers);
            setSelectedPlayer(null);
            setVotingRound(votingRound + 1);
          },
        },
      ]
    );
  };

  const handleCancelVoting = () => {
    Alert.alert(
      'Cancelar votación',
      '¿Estás seguro de que quieres volver al menú?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí',
          style: 'destructive',
          onPress: onBack,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🗳️ Ronda de Votación {votingRound}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Impostores restantes</Text>
            <Text style={styles.statValue}>{activeImpostors}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Civiles restantes</Text>
            <Text style={styles.statValue}>{activeCivils}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.playersContainer}>
        <Text style={styles.instruction}>Selecciona a quién eliminar:</Text>
        
        {activePlayers.map((player) => (
          <TouchableOpacity
            key={player.id}
            style={[
              styles.playerCard,
              selectedPlayer === player.id && styles.playerCardSelected,
            ]}
            onPress={() => setSelectedPlayer(player.id)}
          >
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              {selectedPlayer === player.id && (
                <Text style={styles.selectedBadge}>✓ Seleccionado</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.voteButton,
            selectedPlayer === null && styles.buttonDisabled,
          ]}
          onPress={handleVote}
          disabled={selectedPlayer === null}
        >
          <Text style={styles.buttonText}>
            {selectedPlayer
              ? `Eliminar a ${activePlayers.find(p => p.id === selectedPlayer)?.name}`
              : 'Selecciona un jugador'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancelVoting}
        >
          <Text style={styles.buttonText}>Cancelar votación</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>
          ⚠️ Los impostores ganan si igualan el número de civiles
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  playersContainer: {
    flex: 1,
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#cbd5e1',
    marginBottom: 16,
    textAlign: 'center',
  },
  playerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  playerCardSelected: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderColor: '#8b5cf6',
  },
  playerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  selectedBadge: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: 'bold',
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  voteButton: {
    backgroundColor: '#ef4444',
  },
  cancelButton: {
    backgroundColor: '#64748b',
  },
  buttonDisabled: {
    backgroundColor: '#334155',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  warningContainer: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  warningText: {
    color: '#fbbf24',
    fontSize: 12,
    textAlign: 'center',
  },
});