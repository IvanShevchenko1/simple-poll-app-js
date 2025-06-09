import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import About from "./components/About";
import PollCreate from "./components/PollCreate";
import PollList from "./components/PollList";
import PollResults from "./components/PollResults";
import "./App.css";

const API_URL = "http://localhost:3001/api"; 

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);

  const fetchPolls = () => {
    fetch(`${API_URL}/polls`)
      .then(res => res.json())
      .then(setPolls)
      .catch(() => setPolls([]));
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleRegister = (data) => {
    fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setUser({ ...data, id: res.userId });
          setPage("poll");
        } else {
          alert(res.error || "Помилка реєстрації");
        }
      })
      .catch(() => alert("Помилка з'єднання з сервером"));
  };

  const handleLogin = (email, password, setErr) => {
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setUser({ email, id: res.userId });
          setPage("poll");
          setErr(false);
        } else {
          setErr(true);
        }
      })
      .catch(() => setErr(true));
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  const addPoll = (pollData, reset) => {
    fetch(`${API_URL}/polls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pollData)
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          fetchPolls();
          if (reset) reset();
        } else {
          alert("Помилка створення опитування");
        }
      })
      .catch(() => alert("Помилка з'єднання з сервером"));
  };

  const vote = (pollId, optionIdx) => {
    fetch(`${API_URL}/polls/${pollId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ option: optionIdx })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          fetchPolls();
        } else {
          alert("Помилка голосування");
        }
      })
      .catch(() => alert("Помилка з'єднання з сервером"));
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <button onClick={() => setPage("about")}>Про додаток</button>
        {user && <button onClick={() => setPage("profile")}>Профіль</button>}
        {user && <button onClick={() => setPage("poll")}>Опитування</button>}
        {user && <button onClick={handleLogout}>Вийти</button>}
        {!user && <button onClick={() => setPage("login")}>Вхід</button>}
        {!user && <button onClick={() => setPage("register")}>Реєстрація</button>}
      </nav>

      {page === "about" && <About />}
      {page === "register" && <Register onRegister={handleRegister} />}
      {page === "login" && <Login onLogin={handleLogin} />}
      {page === "profile" && user && <Profile user={user} />}
      {page === "poll" && user && !selectedPoll && (
        <>
          <PollCreate addPoll={addPoll} />
          <PollList polls={polls} onSelect={setSelectedPoll} vote={vote} />
        </>
      )}
      {selectedPoll !== null && (
        <PollResults
          poll={polls.find(p => p.id === selectedPoll)}
          onBack={() => setSelectedPoll(null)}
        />
      )}
    </div>
  );
}

export default App;
