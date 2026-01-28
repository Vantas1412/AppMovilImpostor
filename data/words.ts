// data/words.ts
export interface WordPackage {
  id: string;
  name: string;
  words: Word[];
}

export interface Word {
  word: string;
  hints: string[];
}

export const wordPackages: WordPackage[] = [
  {
    id: 'cantantes',
    name: 'Cantantes',
    words: [
      { word: 'Shakira', hints: ['Colombia', 'Voz', 'Danza'] },
      { word: 'Bad Bunny', hints: ['PuertoRico', 'Trap', 'Conejo'] },
      { word: 'Karol G', hints: ['Bichota', 'Azul', 'Flow'] },
      { word: 'Taylor Swift', hints: ['Eras', 'Pop', 'Guitarra'] },
      { word: 'Ariana Grande', hints: ['Vocales', 'Ponytail', 'Pop'] },
    ],
  },
  {
    id: 'actores',
    name: 'Actores',
    words: [
      { word: 'Ryan Gosling', hints: ['Ken', 'Hollywood', 'Sonrisa'] },
      { word: 'Margot Robbie', hints: ['Barbie', 'Australia', 'Rubia'] },
      { word: 'Tom Holland', hints: ['Araña', 'Joven', 'Marvel'] },
      { word: 'Zendaya', hints: ['Euphoria', 'Modelo', 'Talento'] },
      { word: 'Leonardo DiCaprio', hints: ['Titanic', 'Oscar', 'Drama'] },
    ],
  },
  {
    id: 'naturaleza',
    name: 'Naturaleza',
    words: [
      { word: 'Montaña', hints: ['Altura', 'Rocas', 'Frío'] },
      { word: 'Río', hints: ['Agua', 'Fluir', 'Origen'] },
      { word: 'Tormenta', hints: ['Truenos', 'Nubes', 'Energía'] },
      { word: 'Bosque', hints: ['Árboles', 'Sombra', 'Animales'] },
      { word: 'Desierto', hints: ['Arena', 'Calor', 'Dunas'] },
    ],
  },
  {
    id: 'animales',
    name: 'Animales',
    words: [
      { word: 'León', hints: ['Melena', 'Rugido', 'Rey'] },
      { word: 'Elefante', hints: ['Trompa', 'Gigante', 'Memoria'] },
      { word: 'Delfín', hints: ['Inteligencia', 'Acuático', 'Sonido'] },
      { word: 'Pingüino', hints: ['Frío', 'NegroBlanco', 'Andar'] },
      { word: 'Tiburón', hints: ['Dientes', 'Oceano', 'Cazador'] },
    ],
  },
  {
    id: 'cine',
    name: 'Cine y Televisión',
    words: [
      { word: 'Avatar', hints: ['Azules', 'Pandora', '3D'] },
      { word: 'Titanic', hints: ['Barco', 'Romance', 'Hielo'] },
      { word: 'Barbie', hints: ['Rosa', 'Muñeca', 'Comedia'] },
      { word: 'Stranger Things', hints: ['UpsideDown', 'Niños', '80s'] },
      { word: 'Star Wars', hints: ['Galaxia', 'Fuerza', 'Sables'] },
    ],
  },
  {
    id: 'salud',
    name: 'Cuerpo y Salud',
    words: [
      { word: 'Vacuna', hints: ['Protección', 'Dosis', 'Inyección'] },
      { word: 'Estetoscopio', hints: ['Sonidos', 'Pecho', 'Metal'] },
      { word: 'Pulso', hints: ['Latido', 'Ritmo', 'Mano'] },
      { word: 'Alergia', hints: ['Polen', 'Reacción', 'Picazón'] },
      { word: 'Terapia', hints: ['Sesiones', 'Apoyo', 'Cambio'] },
    ],
  },
  {
    id: 'deportes',
    name: 'Deportes',
    words: [
      { word: 'Fútbol', hints: ['Balón', 'Campo', 'Equipo'] },
      { word: 'Natación', hints: ['Piscina', 'Respiración', 'Brazada'] },
      { word: 'Boxeo', hints: ['Guantes', 'Golpes', 'Ring'] },
      { word: 'Básquet', hints: ['Aro', 'Bote', 'Salto'] },
      { word: 'Ciclismo', hints: ['Ruedas', 'Ruta', 'Pedal'] },
    ],
  },
  {
    id: 'escuela',
    name: 'Escuela',
    words: [
      { word: 'Cuaderno', hints: ['Páginas', 'Notas', 'Lápiz'] },
      { word: 'Recreo', hints: ['Descanso', 'Patio', 'Risas'] },
      { word: 'Examen', hints: ['Preguntas', 'Puntos', 'Nervios'] },
      { word: 'Biblioteca', hints: ['Libros', 'Silencio', 'Estudio'] },
      { word: 'Profesor', hints: ['Clase', 'Guía', 'Pizarra'] },
    ],
  },
  {
    id: 'fantasia',
    name: 'Fantasía',
    words: [
      { word: 'Dragón', hints: ['Fuego', 'Alas', 'Leyenda'] },
      { word: 'Hechizo', hints: ['Magia', 'Palabras', 'Efecto'] },
      { word: 'Elfo', hints: ['Orejas', 'Ágil', 'Bosque'] },
      { word: 'Bruja', hints: ['Caldero', 'Escoba', 'Sombrero'] },
      { word: 'Hada', hints: ['Alas', 'Brillo', 'Pequeña'] },
    ],
  },
  {
    id: 'juegos',
    name: 'Juegos',
    words: [
      { word: 'Minecraft', hints: ['Bloques', 'Construir', 'Pixel'] },
      { word: 'Fortnite', hints: ['Construcción', 'Battle', 'Color'] },
      { word: 'Mario Kart', hints: ['Carrera', 'Items', 'Nintendo'] },
      { word: 'Call of Duty', hints: ['Guerra', 'FPS', 'Equipo'] },
      { word: 'Zelda', hints: ['Aventura', 'Espada', 'Hyrule'] },
    ],
  },
  {
    id: 'personajes',
    name: 'Personajes',
    words: [
      { word: 'Iron Man', hints: ['Armadura', 'Tecnología', 'Genio'] },
      { word: 'Sherlock Holmes', hints: ['Detective', 'Lupa', 'Londres'] },
      { word: 'Goku', hints: ['Ki', 'Saiyajin', 'Pelea'] },
      { word: 'Naruto', hints: ['Ninja', 'Konoha', 'Sueño'] },
      { word: 'Darth Vader', hints: ['Oscuro', 'Máscara', 'Respirar'] },
    ],
  },
  {
    id: 'trabajos',
    name: 'Trabajos y Oficios',
    words: [
      { word: 'Chef', hints: ['Cocina', 'Sabores', 'Fuego'] },
      { word: 'Arquitecto', hints: ['Planos', 'Diseño', 'Construcción'] },
      { word: 'Enfermero', hints: ['Cuidado', 'Turnos', 'Pacientes'] },
      { word: 'Piloto', hints: ['Cabina', 'Vuelo', 'Altura'] },
      { word: 'Carpintero', hints: ['Madera', 'Herramientas', 'Taller'] },
    ],
  },
];

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