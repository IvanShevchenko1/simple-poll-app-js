import React, { useState, useEffect } from "react";
import PollCreate from "./components/PollCreate";
import PollList from "./components/PollList";
import PollResults from "./components/PollResults";
import "./App.css";

function App() {
  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("polls");
    if (stored) setPolls(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("polls", JSON.stringify(polls));
  }, [polls]);

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
      <h1 className="title">Опитування</h1>
      {!selectedPoll && (
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
