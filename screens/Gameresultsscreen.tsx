import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Player } from '../types';

interface GameResultsScreenProps {
  result: 'impostors' | 'civils';
  players: Player[];
  onBackToMenu: () => void;
  onPlayAgain: () => void;
  word?: string;
  hint?: string;
  hintsForImpostor: boolean;
}

export default function GameResultsScreen({
  result,
  players,
  onBackToMenu,
  onPlayAgain,
  word = '',
  hint = '',
  hintsForImpostor,
}: GameResultsScreenProps) {
  const impostors = players.filter(p => p.role === 'impostor');
  const civils = players.filter(p => p.role === 'civil');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Resultado principal */}
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>
            {result === 'impostors' ? '🎭' : '👥'}
          </Text>
          <Text style={styles.resultTitle}>
            {result === 'impostors' ? '¡Ganaron los Impostores!' : '¡Ganaron los Civiles!'}
          </Text>
          <Text style={styles.resultSubtitle}>
            {result === 'impostors'
              ? 'Los impostores lograron igualar el número de civiles'
              : 'Los civiles eliminaron a todos los impostores'}
          </Text>
        </View>

        {/* Lista de impostores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎭 Los Impostores eran:</Text>
          {impostors.map((player) => (
            <View key={player.id} style={[styles.playerCard, styles.impostorCard]}>
              <View style={styles.playerCardContent}>
                <Text style={styles.playerCardName}>{player.name}</Text>
                <Text style={styles.impostorBadge}>IMPOSTOR</Text>
                {hintsForImpostor && hint ? (
                  <View style={styles.wordContainer}>
                    <Text style={styles.wordLabel}>💡 Pista recibida:</Text>
                    <Text style={styles.wordText}>{hint}</Text>
                  </View>
                ) : (
                  <View style={styles.wordContainer}>
                    <Text style={styles.noWordText}>❌ Sin pista</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Lista de civiles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Los Civiles eran:</Text>
          {civils.map((player) => (
            <View key={player.id} style={[styles.playerCard, styles.civilCard]}>
              <View style={styles.playerCardContent}>
                <Text style={styles.playerCardName}>{player.name}</Text>
                <Text style={styles.civilBadge}>CIVIL</Text>
                {word ? (
                  <View style={styles.wordContainer}>
                    <Text style={styles.wordLabel}>🎯 Palabra secreta:</Text>
                    <Text style={styles.wordText}>{word}</Text>
                  </View>
                ) : (
                  <View style={styles.wordContainer}>
                    <Text style={styles.noWordText}>Sin palabra</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Estadísticas */}
        <View style={styles.statsSection}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total de jugadores</Text>
            <Text style={styles.statValue}>{players.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Impostores</Text>
            <Text style={styles.statValue}>{impostors.length}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Civiles</Text>
            <Text style={styles.statValue}>{civils.length}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.playAgainButton]}
          onPress={onPlayAgain}
        >
          <Text style={styles.buttonText}>🔄 Jugar otra vez</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.menuButton]}
          onPress={onBackToMenu}
        >
          <Text style={styles.buttonText}>🏠 Volver al menú</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  playerCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  playerCardContent: {
    gap: 8,
  },
  impostorCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: '#ef4444',
  },
  civilCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderColor: '#10b981',
  },
  playerCardName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  impostorBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  civilBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10b981',
  },
  wordContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  wordLabel: {
    fontSize: 12,
    color: '#cbd5e1',
    marginBottom: 4,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  noWordText: {
    fontSize: 14,
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionsContainer: {
    gap: 12,
    paddingTop: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  playAgainButton: {
    backgroundColor: '#8b5cf6',
  },
  menuButton: {
    backgroundColor: '#64748b',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});