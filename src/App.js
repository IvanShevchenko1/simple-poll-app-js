import React, { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import About from "./components/About";
import PollCreate from "./components/PollCreate";
import PollList from "./components/PollList";
import PollResults from "./components/PollResults";
import "./App.css";

function App() {
  const [page, setPage] = useState("login"); // "login", "register", "profile", "about", "poll"
  const [user, setUser] = useState(null);

  // Polls
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (current) {
      setUser(current);
      setPage("poll");
    }
    const stored = localStorage.getItem("polls");
    if (stored) setPolls(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("polls", JSON.stringify(polls));
  }, [polls]);

  const handleRegister = (data) => {
    // Save new user in localStorage
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(data));
    setUser(data);
    setPage("poll");
  };

  const handleLogin = (email, password) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found));
      setUser(found);
      setPage("poll");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setPage("login");
  };

  const addPoll = (poll) => {
    setPolls([...polls, poll]);
  };

  const vote = (pollId, optionIdx) => {
    setPolls(
      polls.map((poll, idx) =>
        idx === pollId
          ? {
              ...poll,
              options: poll.options.map((opt, i) =>
                i === optionIdx ? { ...opt, votes: opt.votes + 1 } : opt
              ),
            }
          : poll
      )
    );
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
          poll={polls[selectedPoll]}
          onBack={() => setSelectedPoll(null)}
        />
      )}
    </div>
  );
}

export default App;
