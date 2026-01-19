export interface Player {
  id: number;
  name: string;
}

export interface GameConfig {
  players: Player[];
  impostorCount: number;
  duration: number;
}

export type ScreenType = 'menu' | 'jugadores' | 'paquetes';

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