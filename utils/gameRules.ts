export const canRemovePlayer = (totalPlayers: number, impostorCount: number): boolean => {
  // Mínimo 3 jugadores
  if (totalPlayers <= 3) return false;
  
  // Verificar mayoría de civiles
  const civiliansAfterRemoval = totalPlayers  - impostorCount;
  return civiliansAfterRemoval > impostorCount * 2;
};

export const canAddImpostor = (totalPlayers: number, currentImpostors: number): boolean => {
  return totalPlayers > (currentImpostors + 1) * 2;
};

export const getCiviliansCount = (totalPlayers: number, impostorCount: number): number => {
  return totalPlayers - impostorCount;
};