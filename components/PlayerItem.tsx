import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { Player } from '../types';

interface PlayerItemProps {
  player: Player;
  onUpdateName: (id: number, name: string) => void;
  onRemove: (id: number) => void;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ 
  player, 
  onUpdateName, 
  onRemove 
}) => {
  return (
    <View style={styles.container}>
      <Avatar.Text 
        size={34} 
        label={player.name.charAt(0)} 
        style={styles.avatar} 
      />
      <TextInput
        style={styles.input}
        value={player.name}
        onChangeText={(text) => onUpdateName(player.id, text)}
        placeholder="Nombre del jugador"
      />
      <IconButton 
        icon="trash-can-outline" 
        iconColor="#ef4444" 
        onPress={() => onRemove(player.id)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingLeft: 10,
  },
  avatar: { 
    backgroundColor: '#8b5cf6' 
  },
  input: { 
    flex: 1, 
    height: 45, 
    paddingHorizontal: 10, 
    color: '#334155',
    fontSize: 16,
  },
});

export default PlayerItem;