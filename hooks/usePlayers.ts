import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Player } from '../types';
import { canAddImpostor, canRemovePlayer } from '../utils/gameRules';

export const usePlayers = (initialPlayers: Player[] = []) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const addPlayer = useCallback(() => {
    const newId = players.length > 0 
      ? Math.max(...players.map(p => p.id)) + 1 
      : 1;
    setPlayers(prev => [...prev, { 
      id: newId, 
      name: `Jugador ${newId}` 
    }]);
  }, [players]);

  const removePlayer = useCallback((id: number, impostorCount: number) => {
    if (!canRemovePlayer(players.length, impostorCount)) {
      Alert.alert(
        "¡Mayoría en riesgo!", 
        "Si quitas a este jugador, los impostores tendrían demasiado poder en la votación."
      );
      return;
    }

    setPlayers(prev => prev.filter(p => p.id !== id));
  }, [players.length]);

  const updatePlayerName = useCallback((id: number, newName: string) => {
    setPlayers(prev => 
      prev.map(p => p.id === id ? { ...p, name: newName } : p)
    );
  }, []);

  return {
    players,
    setPlayers,
    addPlayer,
    removePlayer,
    updatePlayerName,
    playersCount: players.length
  };
};