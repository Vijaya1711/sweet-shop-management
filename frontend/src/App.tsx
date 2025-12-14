import React, { useEffect, useState } from "react";
import API, { setAuthToken } from "./api";
import { Link, useNavigate } from "react-router-dom";
import SweetsList from "./components/SweetsList";
import AdminPanel from "./components/AdminPanel";

type User = { id: string; name: string; email: string; role: string };

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);
  }, []);

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    navigate("/login");
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Sweet Shop</h1>
        <nav>
          {!user ? (
            <>
              <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span style={{ marginRight: 12 }}>Hi, {user.name} ({user.role})</span>
              <button onClick={onLogout}>Logout</button>
            </>
          )}
        </nav>
      </header>

      <main>
        <SweetsList user={user} />
        {user?.role === "admin" && <AdminPanel />}
      </main>
    </div>
  );
}
