import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GameScreenProps {
  duration: number; 
  onTimeUp: () => void;
  onBack: () => void;
  onStartVoting?: () => void;
  players: Array<{ id: number; name: string; role: 'impostor' | 'civil' | null }>;
  selectedPacks: { [key: string]: boolean };
  hintsForImpostor: boolean;
}
function shuffle<T>(array: T[]): T[] {
  const result = [...array]; // copiamos para no mutar el original
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export default function GameScreen({
  duration,
  onTimeUp,
  onBack,
  onStartVoting,
  players,
  selectedPacks,
  hintsForImpostor,
}: GameScreenProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convertir minutos a segundos
  const [isPaused, setIsPaused] = useState(false);

  // Temporizador
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, timeLeft, onTimeUp]);

  // Formatear tiempo (mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Obtener color según tiempo restante
  const getTimeColor = (): string => {
    if (timeLeft > duration * 40) return '#10b981'; // verde
    if (timeLeft > duration * 20) return '#f59e0b'; // amarillo
    return '#ef4444'; // rojo
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStartVoting = () => {
    Alert.alert(
      '🗳️ Iniciar votación',
      '¿Están listos para votar y eliminar al primer sospechoso?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Iniciar votación',
          onPress: () => {
            // Navegar a la pantalla de votación
            if (onStartVoting) {
              onStartVoting();
            }
          },
        },
      ]
    );
  };

  const handleEndGame = () => {
    Alert.alert(
      'Finalizar partida',
      '¿Estás seguro de que quieres terminar el juego?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          style: 'destructive',
          onPress: onBack,
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Juego en progreso</Text>
        <Text style={styles.subtitle}>
          {players.filter(p => p.role === 'impostor').length} impostor(es) entre {players.length} jugadores
        </Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Tiempo restante</Text>
        <Text style={[styles.timerText, { color: getTimeColor() }]}>
          {formatTime(timeLeft)}
        </Text>
        {isPaused && (
          <Text style={styles.pausedText}>⏸️ PAUSADO</Text>
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.pauseButton]}
          onPress={handlePauseResume}
        >
          <Text style={styles.buttonText}>
            {isPaused ? '▶️ Reanudar' : '⏸️ Pausar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.voteButton]}
          onPress={handleStartVoting}
        >
          <Text style={styles.buttonText}>🗳️ Iniciar votación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.endButton]}
          onPress={handleEndGame}
        >
          <Text style={styles.buttonText}>❌ Finalizar partida</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>💡 Instrucciones</Text>
        <Text style={styles.infoText}>
        {shuffle(players)[0].name} 
        </Text>
        <Text style={styles.infoText}>
          • Los impostores deben intentar pasar desapercibidos
        </Text>
        <Text style={styles.infoText}>
          • Al final del tiempo, voten por quién creen que es el impostor
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
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
  },
  timerContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  timerLabel: {
    fontSize: 18,
    color: '#cbd5e1',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  pausedText: {
    fontSize: 20,
    color: '#fbbf24',
    marginTop: 10,
    fontWeight: 'bold',
  },
  actionsContainer: {
    gap: 15,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: '#3b82f6',
  },
  voteButton: {
    backgroundColor: '#f59e0b',
  },
  endButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 8,
    lineHeight: 20,
  },
});