import React from "react";

function PollList({ polls, onSelect, vote }) {
  if (!polls || polls.length === 0) {
    return <div className="center">Опитувань ще немає. Створіть перше!</div>;
  }

  return (
    <div>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Список опитувань</div>
      {polls.map((poll) => (
        <div key={poll.id} className="form-block">
          <div style={{ fontWeight: 500, marginBottom: 5 }}>{poll.question}</div>
          <div style={{ marginBottom: 7 }}>
            {poll.options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => vote(poll.id, optIdx)}
                className="option-btn"
              >
                {opt.text}
              </button>
            ))}
          </div>
          <span
            className="back-link"
            onClick={() => onSelect(poll.id)}
          >
            Дивитись результати
          </span>
        </div>
      ))}
    </div>
  );
}

export default PollList;
