import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Player } from '../types';
import { canRemovePlayer } from '../utils/gameRules';
import { assignRoles, resetRoles } from '../utils/gameUtils';

export const usePlayers = (initialPlayers: Player[] = []) => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  const addPlayer = useCallback(() => {
    const newId = players.length > 0 
      ? Math.max(...players.map(p => p.id)) + 1 
      : 1;
    setPlayers(prev => [...prev, { 
      id: newId, 
      name: `Jugador ${newId}`,
      role: null
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

  // Nueva función para asignar roles
  const assignPlayerRoles = useCallback((impostorCount: number) => {
    try {
      const playersWithRoles = assignRoles(players, impostorCount);
      setPlayers(playersWithRoles);
      return playersWithRoles;
    } catch (error) {
      Alert.alert('Error', 'No se pudieron asignar los roles correctamente');
      return players;
    }
  }, [players]);

  // Nueva función para reiniciar roles
  const resetPlayerRoles = useCallback(() => {
    const playersWithoutRoles = resetRoles(players);
    setPlayers(playersWithoutRoles);
  }, [players]);

  return {
    players,
    setPlayers,
    addPlayer,
    removePlayer,
    updatePlayerName,
    assignPlayerRoles,
    resetPlayerRoles,
    playersCount: players.length
  };
};