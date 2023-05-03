"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/auth/niamadminlogin", {
        email,
        password,
      });
      console.log(response.data);

      if (!response.data.success) {
        setError(response.data.message);
        return;
      }

      setResponse(response.data);
      setIsLoggedIn(true);
      console.log("Login successful");
      router.push("/Dashboard");
    } catch (error) {
      setError(`Failed to validate domain: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // if (typeof window === "undefined") {
  //   return null;
  // }

  return (
    <form onSubmit={handleSubmit} className="organizationDomainForm">
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
