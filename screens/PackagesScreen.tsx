import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, List, Switch, Text, Title } from 'react-native-paper';

interface PackagesScreenProps {
  onBack: () => void;
  selectedPacks: { [key: string]: boolean };
  setSelectedPacks: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}


const PackagesScreen: React.FC<PackagesScreenProps> = ({ 
  onBack, 
  selectedPacks, 
  setSelectedPacks 
}) => {
  const togglePack = (id: string) => {
    setSelectedPacks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Definición de todos tus paquetes solicitados
  const categories = [
    { id: 'cantantes', name: 'Cantantes', icon: 'microphone', color: '#ec4899' },
    { id: 'actores', name: 'Actores', icon: 'star', color: '#f59e0b' },
    { id: 'naturaleza', name: 'Naturaleza', icon: 'leaf', color: '#22c55e' },
    { id: 'animales', name: 'Animales', icon: 'dog', color: '#8b5cf6' },
    { id: 'cine', name: 'Cine y Televisión', icon: 'television-classic', color: '#3b82f6' },
    { id: 'salud', name: 'Cuerpo y Salud', icon: 'heart-pulse', color: '#ef4444' },
    { id: 'deportes', name: 'Deportes', icon: 'basketball', color: '#f97316' },
    { id: 'escuela', name: 'Escuela', icon: 'school', color: '#6366f1' },
    { id: 'fantasia', name: 'Fantasía', icon: 'wizard-hat', color: '#a855f7' },
    { id: 'juegos', name: 'Juegos', icon: 'controller-classic', color: '#06b6d4' },
    { id: 'personajes', name: 'Personajes', icon: 'account-cowboy-hat', color: '#f43f5e' },
    { id: 'trabajos', name: 'Trabajos y Oficios', icon: 'briefcase', color: '#71717a' },
  ];

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Title style={styles.title}>Paquetes de Palabras</Title>
          <Text style={styles.subtitle}>Selecciona los temas para la partida</Text>
          
          <Divider style={styles.divider} />

          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
            {categories.map((item) => (
              <View key={item.id}>
                <List.Item
                  title={item.name}
                  left={(props) => <List.Icon {...props} icon={item.icon} color={item.color} />}
                  right={() => (
                    <Switch
                      value={!!selectedPacks[item.id]}
                      onValueChange={() => togglePack(item.id)}
                      color={item.color}
                    />
                  )}
                  onPress={() => togglePack(item.id)}
                  style={styles.listItem}
                />
                <Divider style={styles.itemDivider} />
              </View>
            ))}
          </ScrollView>

          <Button 
            mode="contained" 
            onPress={onBack} 
            style={styles.backButton}
            labelStyle={styles.buttonLabel}
          >
            GUARDAR Y VOLVER
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 20,
    backgroundColor: 'white',
    flex: 1,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#581c87', // Color morado para el título
    marginTop: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 14,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  scroll: {
    flex: 1,
  },
  listItem: {
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  itemDivider: {
    backgroundColor: '#f1f5f9',
  },
  backButton: {
    backgroundColor: '#581c87',
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 4,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PackagesScreen;