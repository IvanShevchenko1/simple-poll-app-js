import React from "react";

function Profile({ user }) {
  return (
    <div className="form-block">
      <div style={{fontWeight: 600, marginBottom: 8}}>Профіль користувача</div>
      <table className="profile-table">
        <tbody>
          <tr><td>Ім'я</td><td>{user.name}</td></tr>
          <tr><td>Email</td><td>{user.email}</td></tr>
          <tr><td>Стать</td><td>{user.gender}</td></tr>
          <tr><td>Дата народження</td><td>{user.dob}</td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default Profile;