"use client";
import { useState } from "react";
import axios from "axios";

export default function LoginPage(email, setEmail, password, setPassword) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/auth/niamadminlogin", {
        email,
        password,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (typeof window === "undefined") {
    return null;
  }

  const { AuthContext } = require("../global/contexts/AuthContext");
  const { setEmail, setPassword } = useContext(AuthContext);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
