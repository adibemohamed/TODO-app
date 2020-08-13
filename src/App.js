import React, { useState, useEffect } from "react"
import "./App.css"
import { Button, FormControl, InputLabel, Input } from "@material-ui/core"
import Todo from './Todo'
import {db} from './firebase'
import firebase from "firebase"

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we need to list to the database and fetch new todos as they get added/removed

  useEffect(function() {
    // This code here... fires when the app.js loads 
    db.collection("todos").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()))
      setTodos(snapshot.docs.map(doc => doc.data().todo))
    }) 
  }, [])



  const addTodo = (event) => {
    //This will fire off when we click the button
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  }

  return (
    <div className="App">
      <h1>Hello World🔥! This Adibe here🚀 </h1>
    <form>
      <FormControl>
        <InputLabel>Write a Todo</InputLabel>
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </FormControl>
      <Button
        disabled={!input}
        variant="contained"
        color="primary"
        type="submit"
        onClick={addTodo}
      >
        Add Todo
      </Button>
      </form>
      <ul>
        {todos.map((todo) => (
         <Todo todo={todo}/>
        ))}
      </ul>
    </div>
  );
}

export default App

 