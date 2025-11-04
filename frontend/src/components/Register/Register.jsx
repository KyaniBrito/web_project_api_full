import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Inscrever-se</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__input"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth__button">
          Inscrever-se
        </button>
      </form>
      <p className="auth__text">
        Já é um membro?{" "}
        <Link to="/signin" className="auth__link">
          Faça o login aqui!
        </Link>
      </p>
    </div>
  );
}

export default Register;
