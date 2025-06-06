import React from "react";

function PollResults({ poll, onBack }) {
  const totalVotes = poll.options.reduce((a, b) => a + b.votes, 0);

  return (
    <div className="poll-block">
      <span className="back-link" onClick={onBack}>
        ← Назад до списку
      </span>
      <div style={{fontWeight: 600, marginBottom: 8}}>{poll.question}</div>
      {poll.options.map((opt, idx) => (
        <div key={idx} style={{marginBottom: 12}}>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <span>{opt.text}</span>
            <span className="result-info">
              {opt.votes} голос(ів) (
              {totalVotes === 0
                ? 0
                : Math.round((opt.votes / totalVotes) * 100)}
              %)
            </span>
          </div>
          <div className="result-bar">
            <div
              className="result-fill"
              style={{
                width:
                  totalVotes === 0
                    ? "0%"
                    : `${(opt.votes / totalVotes) * 100}%`,
              }}
            />
          </div>
        </div>
      ))}
      <div style={{marginTop: 10, color: "#666"}}>
        Всього голосів: {totalVotes}
      </div>
    </div>
  );
}

export default PollResults;
