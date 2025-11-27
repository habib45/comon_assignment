"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const { player } = await res.json();
        login(player);
      } else {
        const data = await res.json();
        setError(data.message || 'An error occurred.');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div
      className="ui middle aligned center aligned grid"
      style={{ minHeight: "60vh" }}
    >
      <div
        className="column"
        style={{
          maxWidth: 600,
          width: "100%",
          padding: "3rem 3.5rem",
          boxShadow: "0 14px 40px rgba(0,0,0,0.15)",
          borderRadius: "1.25rem",
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <h2 className="ui teal image header">
          <div className="content">
            Log-in to your account
          </div>
        </h2>
        <form className="ui large form" onSubmit={handleSubmit}>
          <div className="ui stacked segment">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ height: "52px", fontSize: "1rem" }}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ height: "52px", fontSize: "1rem" }}
                />
              </div>
            </div>
            <button
              className="ui fluid large teal submit button"
              type="submit"
              style={{ height: "52px", fontSize: "1.05rem", letterSpacing: "0.5px" }}
            >
              Login
            </button>
          </div>
          {error && <div className="ui error message">{error}</div>}
        </form>
      </div>
    </div>
  );
}
