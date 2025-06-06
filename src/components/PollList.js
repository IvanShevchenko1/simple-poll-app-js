import React from "react";

function PollList({ polls, onSelect, vote }) {
  if (polls.length === 0) {
    return <div className="center">Опитувань ще немає. Створіть перше!</div>;
  }

  return (
    <div>
      <div style={{fontWeight: 600, marginBottom: 8}}>Список опитувань</div>
      {polls.map((poll, idx) => (
        <div key={idx} className="form-block">
          <div style={{fontWeight: 500, marginBottom: 5}}>{poll.question}</div>
          <div style={{marginBottom: 7}}>
            {poll.options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => vote(idx, optIdx)}
                className="option-btn"
              >
                {opt.text}
              </button>
            ))}
          </div>
          <span
            className="back-link"
            onClick={() => onSelect(idx)}
          >
            Дивитись результати
          </span>
        </div>
      ))}
    </div>
  );
}

export default PollList;
