import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { TimeControlsProps } from '../types';

const TimeControls: React.FC<TimeControlsProps> = ({
  duration,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tiempo de Ronda</Text>
      <View style={styles.controlsRow}>
        <IconButton 
          icon="minus-box" 
          iconColor="#64748b"
          onPress={onDecrement}
          disabled={duration <= 1}
          size={28}
        />
        <Text style={styles.durationText}>
          {duration} {duration === 1 ? 'minuto' : 'minutos'}
        </Text>
        <IconButton 
          icon="plus-box" 
          iconColor="#64748b"
          onPress={onIncrement}
          disabled={duration >= 10}
          size={28}
        />
      </View>
      <Text style={styles.hint}>
        Duración por ronda de votación
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
    paddingVertical: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  durationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#581c87',
    minWidth: 100,
    textAlign: 'center',
  },
  hint: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    fontStyle: 'italic',
  },
});

export default TimeControls;