const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let polls = [];
let nextPollId = 1;

app.post('/api/register', (req, res) => {
  const { name, email, password, gender, dob } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Користувач вже існує" });
  }
  const user = { id: users.length + 1, name, email, password, gender, dob };
  users.push(user);
  res.json({ success: true, userId: user.id });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Невірний email або пароль" });
  }
  res.json({ success: true, userId: user.id });
});

app.get('/api/polls', (req, res) => {
  res.json(polls);
});

app.post('/api/polls', (req, res) => {
  const { question, options } = req.body;
  const poll = { id: nextPollId++, question, options: options.map(text => ({ text, votes: 0 })) };
  polls.push(poll);
  res.json({ success: true, poll });
});

app.post('/api/polls/:id/vote', (req, res) => {
  const poll = polls.find(p => p.id === Number(req.params.id));
  if (!poll) return res.status(404).json({ error: "Опитування не знайдено" });
  const { option } = req.body;
  if (option < 0 || option >= poll.options.length) return res.status(400).json({ error: "Некоректний варіант" });
  poll.options[option].votes += 1;
  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => console.log("API server started on port", PORT));
