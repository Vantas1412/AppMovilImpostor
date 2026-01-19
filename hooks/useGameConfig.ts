// En /src/hooks/useGameConfig.ts (versión completa)
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { canAddImpostor } from '../utils/gameRules';

export const useGameConfig = (initialImpostorCount = 1, initialDuration = 3) => {
  const [impostorCount, setImpostorCount] = useState(initialImpostorCount);
  const [duration, setDuration] = useState(initialDuration);

  const incrementImpostor = useCallback((playersCount: number) => {
    if (canAddImpostor(playersCount, impostorCount)) {
      setImpostorCount(prev => prev + 1);
    } else {
      Alert.alert(
        "Faltan civiles", 
        "Necesitas más jugadores para poder sumar otro impostor y mantener el equilibrio."
      );
    }
  }, [impostorCount]);

  const decrementImpostor = useCallback(() => {
    if (impostorCount > 1) {
      setImpostorCount(prev => prev - 1);
    }
  }, [impostorCount]);

  const incrementDuration = useCallback(() => {
    if (duration < 10) {
      setDuration(prev => prev + 1);
    }
  }, [duration]);

  const decrementDuration = useCallback(() => {
    if (duration > 1) {
      setDuration(prev => prev - 1);
    }
  }, [duration]);

  return {
    impostorCount,
    duration,
    incrementImpostor,
    decrementImpostor,
    incrementDuration,
    decrementDuration,
    setImpostorCount,
    setDuration
  };
};