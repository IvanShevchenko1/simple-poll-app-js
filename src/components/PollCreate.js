import React, { useState } from "react";

function PollCreate({ addPoll }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (idx, value) => {
    setOptions(options.map((opt, i) => (i === idx ? value : opt)));
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validOptions = options.filter(o => o.trim().length > 0);
    if (question.trim().length > 0 && validOptions.length >= 2) {
      addPoll({ question, options: validOptions }, () => {
        setQuestion("");
        setOptions(["", ""]);
      });
    }
  };

  return (
    <form className="form-block" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Створити нове опитування</div>
      <input
        type="text"
        placeholder="Питання"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        required
      />
      {options.map((opt, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Варіант ${idx + 1}`}
          value={opt}
          onChange={e => handleOptionChange(idx, e.target.value)}
          required={idx < 2}
        />
      ))}
      <button type="button" className="button" style={{ background: "#eee", color: "#222" }} onClick={addOption}>
        Додати варіант
      </button>
      <br />
      <button type="submit" className="button">
        Створити опитування
      </button>
    </form>
  );
}

export default PollCreate;
