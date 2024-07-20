// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const saveTodos = async (todos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error(error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos) {
        setTodoList(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = () => {
    if (text.trim()) {
      const newTodo = { id: Date.now().toString(), text };
      const updatedTodos = [...todoList, newTodo];
      setTodoList(updatedTodos);
      saveTodos(updatedTodos);
      setText('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodos);
    saveTodos(updatedTodos);
  };

  return (
    // <ScrollView>
    <View style={styles.container}>

      <Text style = {{fontSize:40, textAlign:"center", margin:10, marginVertical:15, fontFamily : "cursive" , fontWeight  :"bold"}}>TODO APP</Text>

      <TextInput
        placeholder="Add a new to-do"
        value={text}
        onChangeText={setText}
        style={styles.inpStyle}
      />
      <Button title="Add To-Do" onPress={addTodo} />
      <Text style={{marginBottom:0}}></Text>
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listStyle}>
            <Text style={{ color: "white", fontSize: 17, }}>{item.text}</Text>
            <TouchableOpacity style={styles.touchStyle} onPress={() => deleteTodo(item.id)}>
              <Text style={{ color: 'white'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    backgroundColor: "#C0C0C0",
    padding: 20,
    flex: 1
  },

  inpStyle: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    // color:white
    borderWidth: 1.5,
    borderColor: "black"

  },

  listStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    marginVertical: 3,
    borderRadius: 10,
    backgroundColor: "#191970"


  },

  touchStyle: {
    backgroundColor: "red", borderRadius: 5, padding: 5
  }

})

export default App;
