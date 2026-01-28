import { Player } from '../types';

/**
 * Mezcla un array usando el algoritmo Fisher-Yates
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Asigna roles aleatorios a los jugadores
 * @param players - Array de jugadores
 * @param impostorCount - Número de impostores a asignar
 * @returns Array de jugadores con roles asignados
 */
export const assignRoles = (
  players: Player[], 
  impostorCount: number
): Player[] => {
  // Validación
  if (impostorCount >= players.length) {
    throw new Error('El número de impostores debe ser menor al total de jugadores');
  }

  // Crear una copia de los jugadores y mezclarlos
  const shuffledPlayers = shuffleArray([...players]);

  // Asignar roles
  return shuffledPlayers.map((player, index) => ({
    ...player,
    role: index < impostorCount ? 'impostor' : 'civil'
  }));
};

/**
 * Reinicia los roles de todos los jugadores
 * @param players - Array de jugadores
 * @returns Array de jugadores sin roles asignados
 */
export const resetRoles = (players: Player[]): Player[] => {
  return players.map(player => ({
    ...player,
    role: null
  }));
};

/**
 * Verifica si un jugador es impostor
 * @param player - Jugador a verificar
 * @returns true si el jugador es impostor
 */
export const isImpostor = (player: Player): boolean => {
  return player.role === 'impostor';
};

/**
 * Verifica si un jugador es civil
 * @param player - Jugador a verificar
 * @returns true si el jugador es civil
 */
export const isCivil = (player: Player): boolean => {
  return player.role === 'civil';
};

/**
 * Obtiene todos los impostores de una lista de jugadores
 * @param players - Array de jugadores
 * @returns Array de jugadores que son impostores
 */
export const getImpostors = (players: Player[]): Player[] => {
  return players.filter(player => player.role === 'impostor');
};

/**
 * Obtiene todos los civiles de una lista de jugadores
 * @param players - Array de jugadores
 * @returns Array de jugadores que son civiles
 */
export const getCivils = (players: Player[]): Player[] => {
  return players.filter(player => player.role === 'civil');
};