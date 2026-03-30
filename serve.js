const express = require('express')
const fs = require('fs')

const app = express()
app.use(express.json())

const FILE = './tasks.json';

// Listar tarefas
app.get('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(FILE));
  res.json(tasks);
});

// Criar tarefa
app.post('/tasks', (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(FILE));
  const task = {
    id: Date.now(),
    title: req.body.title,
    done: false
  };
  tasks.push(task);
  fs.writeFileSync(FILE, JSON.stringify(tasks));
  res.status(201).json(task);
});

// Concluir tarefa
app.patch('/tasks/:id', (req, res) => {
  let tasks = JSON.parse(fs.readFileSync(FILE));
  tasks = tasks.map(t => 
    t.id == req.params.id ? { ...t, done: true } : t
  );
  fs.writeFileSync(FILE, JSON.stringify(tasks));
  res.json({ message: 'Tarefa concluída!' });
});

// Deletar tarefa
app.delete('/tasks/:id', (req, res) => {
  let tasks = JSON.parse(fs.readFileSync(FILE));
  tasks = tasks.filter(t => t.id != req.params.id);
  fs.writeFileSync(FILE, JSON.stringify(tasks));
  res.json({ message: 'Tarefa deletada!' });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));