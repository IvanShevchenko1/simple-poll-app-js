import React, { useState } from "react";

function Register({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    dob: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onRegister(form);
  };

  return (
    <form className="form-block" onSubmit={handleSubmit}>
      <div style={{fontWeight: 600, marginBottom: 8}}>Реєстрація користувача</div>
      <input name="name" type="text" placeholder="Ім’я" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
      <select name="gender" value={form.gender} onChange={handleChange} required>
        <option value="">Стать</option>
        <option value="Чоловіча">Чоловіча</option>
        <option value="Жіноча">Жіноча</option>
      </select>
      <input name="dob" type="date" placeholder="Дата народження" value={form.dob} onChange={handleChange} required />
      <button className="button" type="submit">Зареєструватися</button>
    </form>
  );
}

export default Register;
