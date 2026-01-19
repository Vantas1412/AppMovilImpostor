import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ImpostorControlsProps } from '../types';

const ImpostorControls: React.FC<ImpostorControlsProps> = ({
  impostorCount,
  playersCount,
  onIncrement,
  onDecrement,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Impostores: {impostorCount}
      </Text>
      <View style={styles.controls}>
        <IconButton 
          icon="minus-circle" 
          disabled={impostorCount <= 1}
          onPress={onDecrement}
          size={24}
        />
        <IconButton 
          icon="plus-circle" 
          onPress={onIncrement}
          size={24}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ImpostorControls;