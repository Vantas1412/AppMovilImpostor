export type PlayerRole = 'impostor' | 'civil' | null;

export interface Player {
  id: number;
  name: string;
  role?: PlayerRole; // Rol asignado durante el juego
}

export interface GameConfig {
  players: Player[];
  impostorCount: number;
  duration: number;
  hintsForImpostor: boolean;
}

export type ScreenType = 'menu' | 'jugadores' | 'paquetes' | 'game' | 'reveal';

export interface PlayerControlsProps {
  players: Player[];
  onAddPlayer: () => void;
  onRemovePlayer: (id: number) => void;
  onUpdatePlayerName: (id: number, name: string) => void;
}

export interface ImpostorControlsProps {
  impostorCount: number;
  playersCount: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export interface TimeControlsProps {
  duration: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export interface HintsControlProps {
  hintsForImpostor: boolean;
  onToggle: () => void;
}