import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, Text, View, Platform,  Dimensions } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banner.jpg')}
          style={styles.banner}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Lista de Tarefas</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Adicionar" onPress={addTask} />
      </ThemedView>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.taskItem, item.completed && styles.taskCompleted]}
            onPress={() => toggleComplete(item.id)}
            onLongPress={() => removeTask(item.id)}>
            <Text style={styles.taskText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Dica:</ThemedText>
        <ThemedText>
          Pressione a tarefa para marcar como concluída, ou segure para removê-la.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  taskItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskCompleted: {
    backgroundColor: '#d1e7dd',
    textDecorationLine: 'line-through',
  },
  taskText: {
    fontSize: 16,
  },
  stepContainer: {
    marginVertical: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  banner: {
    width: Dimensions.get('window').width, // Largura total da tela
    height: 250, // Ajuste a altura conforme necessário
    resizeMode: 'cover', // Ajusta a imagem para cobrir o espaço sem distorcer
  },
});
