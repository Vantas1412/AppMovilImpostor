import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { HintsControlProps } from '../types';

const HintsControl: React.FC<HintsControlProps> = ({ 
  hintsForImpostor, 
  onToggle 
}) => {
  return (
    <View style={styles.container}>
      <List.Item
        title="Pistas para Impostor"
        description={hintsForImpostor 
          ? 'Los impostores verán 1 pista aleatoria' 
          : 'Los impostores NO verán pistas'
        }
        left={props => (
          <List.Icon 
            {...props} 
            icon={hintsForImpostor ? "lightbulb-on" : "lightbulb-off-outline"} 
            color={hintsForImpostor ? "#10b981" : "#94a3b8"} 
          />
        )}
        right={() => (
          <Switch
            value={hintsForImpostor}
            onValueChange={onToggle}
            color="#10b981"
          />
        )}
        style={styles.listItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  listItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 8,
  },
});

export default HintsControl;