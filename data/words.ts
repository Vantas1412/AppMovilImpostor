import { Word, wordPackages } from "./package";
// Función helper para obtener palabras de los paquetes seleccionados
export const getWordsFromSelectedPacks = (
  selectedPacks: { [key: string]: boolean }
): Word[] => {
  const activePacks = Object.keys(selectedPacks).filter(key => selectedPacks[key]);

  return wordPackages
    .filter(pack => activePacks.includes(pack.id))
    .flatMap(pack => pack.words);
};

// Implementación correcta de Fisher-Yates shuffle
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Función para obtener una palabra aleatoria (retorna objeto Word completo)
export const getRandomWord = (
  selectedPacks: { [key: string]: boolean }
): Word | null => {
  const words = getWordsFromSelectedPacks(selectedPacks);
  
  if (words.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};

// Función para obtener palabras sin repetir (retorna objetos Word completos)
export const getRandomWords = (
  selectedPacks: { [key: string]: boolean },
  count: number
): Word[] => {
  const words = getWordsFromSelectedPacks(selectedPacks);
  
  // Mezclar array usando Fisher-Yates
  const shuffled = shuffleArray(words);
  
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Función para obtener una pista aleatoria
const getRandomHint = (hints: string[]): string => {
  if (hints.length === 0) return '';
  const randomIndex = Math.floor(Math.random() * hints.length);
  return hints[randomIndex];
};

// Función para obtener una palabra con o sin pistas según configuración
export const getWordForPlayer = (
  selectedPacks: { [key: string]: boolean },
  isImpostor: boolean,
  hintsForImpostor: boolean
): Word | null => {
  const word = getRandomWord(selectedPacks);
  
  if (!word) return null;
  
  // Si es impostor
  if (isImpostor) {
    if (hintsForImpostor && word.hints.length > 0) {
      // Impostor con pistas: solo 1 pista aleatoria, SIN palabra
      return {
        word: '???',
        hints: [getRandomHint(word.hints)]
      };
    } else {
      // Impostor sin pistas: nada
      return {
        word: '???',
        hints: []
      };
    }
  }
  
  // Si es civil: solo la palabra, SIN pistas
  return {
    word: word.word,
    hints: []
  };
};

// Función para procesar una palabra según el rol del jugador
export const processWordForPlayer = (
  word: Word,
  isImpostor: boolean,
  hintsForImpostor: boolean
): Word => {
  // Si es impostor
  if (isImpostor) {
    if (hintsForImpostor && word.hints.length > 0) {
      // Impostor con pistas: solo 1 pista aleatoria, SIN palabra
      return {
        word: '???',
        hints: [getRandomHint(word.hints)]
      };
    } else {
      // Impostor sin pistas: nada
      return {
        word: '???',
        hints: []
      };
    }
  }
  
  // Si es civil: solo la palabra, SIN pistas
  return {
    word: word.word,
    hints: []
  };
};