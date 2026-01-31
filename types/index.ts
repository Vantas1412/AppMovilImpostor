export type PlayerRole = 'impostor' | 'civil' | null;

export interface Player {
  id: number;
  name: string;
  role: 'impostor' | 'civil' | null;
}

export interface GameConfig {
  players: Player[];
  impostorCount: number;
  duration: number;
  hintsForImpostor: boolean;
}

export type ScreenType = 'menu' | 'jugadores' | 'paquetes' | 'reveal' | 'game' | 'voting' | 'results';

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