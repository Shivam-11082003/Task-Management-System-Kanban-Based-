import { useState } from "react";
import { login } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await login({ email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      window.location = "/kanban";
    } else alert(res.message);
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
      <p onClick={() => (window.location = "/register")}>Register</p>
    </div>
  );
}
