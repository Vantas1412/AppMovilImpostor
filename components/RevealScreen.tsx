import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { Word } from '../data/words';
import { Player } from '../types';

interface RevealScreenProps {
  currentPlayer: Player;
  currentWord: Word;
  playerIndex: number;
  totalPlayers: number;
  onNext: () => void;
  onFinish: () => void;
}

const RevealScreen: React.FC<RevealScreenProps> = ({
  currentPlayer,
  currentWord,
  playerIndex,
  totalPlayers,
  onNext,
  onFinish,
}) => {
  const [revealed, setRevealed] = useState(false);
  const isImpostor = currentPlayer.role === 'impostor';
  const isLastPlayer = playerIndex === totalPlayers - 1;

  // Resetear revelación cuando cambia el jugador
  useEffect(() => {
    setRevealed(false);
  }, [currentPlayer.id]);

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleContinue = () => {
    if (isLastPlayer) {
      onFinish();
    } else {
      onNext();
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {/* Header con info del jugador */}
          <View style={styles.header}>
            <Text style={styles.playerName}>{currentPlayer.name}</Text>
            <Text style={styles.playerCount}>
              Jugador {playerIndex + 1} de {totalPlayers}
            </Text>
          </View>

          {!revealed ? (
            /* Vista antes de revelar */
            <View style={styles.beforeReveal}>
              <Text style={styles.instructionText}>
                {currentPlayer.name}, toca el botón cuando estés listo para ver tu palabra
              </Text>
              
              <TouchableOpacity 
                style={styles.revealButton}
                onPress={handleReveal}
                activeOpacity={0.8}
              >
                <Text style={styles.revealButtonText}>👁️ REVELAR PALABRA</Text>
              </TouchableOpacity>

              <Text style={styles.warningText}>
                ⚠️ Asegúrate de que nadie más esté mirando
              </Text>
            </View>
          ) : (
            /* Vista después de revelar */
            <View style={styles.afterReveal}>
              {/* Indicador de rol */}
              <View style={[
                styles.roleBadge,
                isImpostor ? styles.impostorBadge : styles.civilBadge
              ]}>
                <Text style={styles.roleText}>
                  {isImpostor ? '🎭 IMPOSTOR' : '✅ CIVIL'}
                </Text>
              </View>

              {/* Contenido según rol */}
              {isImpostor ? (
                /* Vista para IMPOSTOR */
                <>
                  {currentWord.hints.length > 0 ? (
                    <View style={styles.hintContainer}>
                      <Text style={styles.hintLabel}>Tu pista:</Text>
                      <View style={styles.singleHintCard}>
                        <Text style={styles.singleHintText}>
                          {currentWord.hints[0]}
                        </Text>
                      </View>
                      <Text style={styles.hintInstruction}>
                        Debes adivinar la palabra que todos los demás tienen
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.noHintsContainer}>
                      <Text style={styles.noHintsText}>
                        🎭 Sin pistas
                      </Text>
                      <Text style={styles.noHintsSubtext}>
                        Debes adivinar la palabra solo escuchando a los demás
                      </Text>
                    </View>
                  )}
                </>
              ) : (
                /* Vista para CIVIL */
                <View style={styles.wordContainer}>
                  <Text style={styles.wordLabel}>Tu palabra secreta:</Text>
                  <Text style={styles.wordText}>{currentWord.word}</Text>
                  <Text style={styles.wordInstruction}>
                    Da pistas para que otros adivinen, ¡pero cuidado con el impostor!
                  </Text>
                </View>
              )}

              {/* Botón continuar */}
              <Button
                mode="contained"
                style={styles.continueButton}
                onPress={handleContinue}
                labelStyle={styles.continueButtonText}
              >
                {isLastPlayer ? '🎮 INICIAR JUEGO' : '➡️ SIGUIENTE JUGADOR'}
              </Button>

              <Text style={styles.reminderText}>
                Memoriza tu palabra y tus pistas
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
  },
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#581c87',
    marginBottom: 8,
  },
  playerCount: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  beforeReveal: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#334155',
    marginBottom: 32,
    lineHeight: 26,
    paddingHorizontal: 16,
  },
  revealButton: {
    backgroundColor: '#581c87',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  revealButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  warningText: {
    fontSize: 14,
    color: '#f59e0b',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  afterReveal: {
    paddingVertical: 16,
  },
  roleBadge: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  impostorBadge: {
    backgroundColor: '#fee2e2',
  },
  civilBadge: {
    backgroundColor: '#dcfce7',
  },
  roleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  wordContainer: {
    backgroundColor: '#f8fafc',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#10b981',
  },
  wordLabel: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 8,
    fontWeight: '600',
  },
  wordText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 8,
  },
  wordInstruction: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
  hintContainer: {
    marginBottom: 24,
  },
  hintLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 12,
    textAlign: 'center',
  },
  singleHintCard: {
    backgroundColor: '#fef3c7',
    padding: 24,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#f59e0b',
    alignItems: 'center',
  },
  singleHintText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#92400e',
    textAlign: 'center',
  },
  hintInstruction: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 12,
  },
  hintsContainer: {
    marginBottom: 24,
  },
  hintsLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 12,
  },
  hintsList: {
    gap: 8,
  },
  hintItem: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  hintText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  noHintsContainer: {
    backgroundColor: '#fee2e2',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#ef4444',
  },
  noHintsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#991b1b',
    marginBottom: 4,
  },
  noHintsSubtext: {
    fontSize: 14,
    color: '#7f1d1d',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 8,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reminderText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});

export default RevealScreen;