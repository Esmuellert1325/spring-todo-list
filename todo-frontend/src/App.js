import './App.css';
import ButtonAppBar from './ButtonAppBar';
import MediaCard from './MediaCard';
import { Paper, FormControl, Button, TextField} from '@mui/material';
import { useEffect, useState } from 'react';

export default function App() {
  const mainPaperStyle = {
    width: '700px',
    marginTop: '40px',
    marginBottom: '22px',
  }

  const [todos, setTodos] = useState([]);
  const [name, setTaskName] = useState('');
  const [description, setTaskDesc] = useState('');

  useEffect(() => {
    refreshView();
  }, []);

  function refreshView() {
    setTimeout(() => {
      fetch('http://localhost:8080/todos/getAll')
        .then(data => data.json())
        .then((data) => {setTodos(data)});
    }, 250);
  }

  function handleAdd(e) {
    e.preventDefault();
    const newTodo = {name, description};
    fetch('http://localhost:8080/todos/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(newTodo)
    })
    refreshView();
  }

  function deleteCompleted() {
    let idString = '';

    let textinputs = document.querySelectorAll('input[type=checkbox]'); 
    if (textinputs) { 
      textinputs.forEach(elem => {
        if (elem.checked) {
          let id = elem.parentElement.parentElement.id;
          idString += String(id)+',';
        }
      })
      if (idString.length > 0) {
        idString = idString.slice(0, -1);

        fetch(`http://localhost:8080/todos/deleteAllSelected/${idString}`,
          { method: 'DELETE'}
        );
        refreshView();
      }
    }
  }

  return (
    <div className="App">
      <ButtonAppBar />
      <FormControl>
        <Paper elevation={3} style={mainPaperStyle}>
          {
            todos.map(todo => (
              <MediaCard 
                key={todo.id}
                id={todo.id}
                name={todo.name}
                description={todo.description}
                addedOn={todo.added_on}
                completed={todo.completed}
                refresh={refreshView}
              />
            ))
          }
        </Paper>
        <div style={{display: 'flex', flexDirection: 'row', margin: '10px', width: '600px'}}>
          <Button variant='contained' onClick={deleteCompleted} style={{width: '250px', height: '40px', margin: '30px 0', marginLeft: '200px', background: 'red'}}>Delete completed todo's</Button>
        </div>
        <Paper elevation={3} style={mainPaperStyle}>
          <TextField label="Name" variant="outlined" style={{marginTop: '20px'}} 
            value={name} 
            onChange={(e) => setTaskName(e.target.value)}
          /><br></br>
          <TextField label="Description" variant="outlined" style={{marginTop: '20px'}} 
            value={description}
            onChange={(e) => setTaskDesc(e.target.value)}
          /><br></br>
          <Button variant='contained' onClick={handleAdd} style={{width: '200px', height: '40px', margin: '30px 15px'}}>Add todo</Button>
        </Paper>
      </FormControl>
    </div>
  );
}
