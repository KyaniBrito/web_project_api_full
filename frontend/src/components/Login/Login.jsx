import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Entrar</h2>
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
          Entrar
        </button>
      </form>
      <p className="auth__text">
        Ainda não é membro?{" "}
        <Link to="/signup" className="auth__link">
          Inscreva-se aqui!
        </Link>
      </p>
    </div>
  );
}

export default Login;
