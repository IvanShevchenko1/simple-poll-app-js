import React, { useState } from "react";

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErr(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(form.email, form.password, setErr);
  };

  return (
    <form className="form-block" onSubmit={handleSubmit}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Вхід до сайту</div>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
      {err && <div style={{ color: "red", marginBottom: 8 }}>Неправильний email або пароль</div>}
      <button className="button" type="submit">Увійти</button>
    </form>
  );
}

export default Login;
