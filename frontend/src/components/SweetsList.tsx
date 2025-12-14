import React, { useEffect, useState } from "react";
import API from "../api";

type Sweet = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
};

export default function SweetsList({ user }: { user: any }) {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadAll() {
    try {
      setLoading(true);
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch {
      alert("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  }

  async function searchSweets() {
    if (!q.trim()) {
      loadAll();
      return;
    }

    try {
      setLoading(true);
      const res = await API.get("/sweets/search", {
        params: { name: q },
      });
      setSweets(res.data);
    } catch {
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  }

  async function purchase(id: string) {
    try {
      await API.post(`/sweets/${id}/purchase`);
      alert("Purchased successfully!");
      loadAll();
    } catch (err: any) {
      alert(err?.response?.data?.error || "Purchase failed");
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      <h2 style={{ marginBottom: 16 }}>🍬 Available Sweets</h2>

      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search sweet by name..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            padding: 10,
            width: 240,
            marginRight: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <button onClick={searchSweets} style={{ marginRight: 8 }}>
          Search
        </button>
        <button onClick={loadAll}>Reset</button>
      </div>

      {loading && <p>Loading sweets...</p>}
      {!loading && sweets.length === 0 && <p>No sweets found.</p>}

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {sweets.map((s) => (
          <div
            key={s.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ marginBottom: 6 }}>{s.name}</h3>

            <p style={{ fontSize: 14, color: "#555" }}>
              Category: {s.category}
            </p>

            <p style={{ fontWeight: "bold" }}>₹{s.price}</p>

            <p style={{ fontSize: 14 }}>Stock: {s.quantity}</p>

            {s.description && (
              <p style={{ fontSize: 13, color: "#666" }}>
                {s.description}
              </p>
            )}

            <button
              disabled={!user || s.quantity === 0}
              onClick={() => purchase(s.id)}
              style={{
                marginTop: 12,
                width: "100%",
                padding: 10,
                borderRadius: 6,
                border: "none",
                backgroundColor:
                  s.quantity === 0 ? "#ccc" : "#ff6f61",
                color: "#fff",
                cursor:
                  !user || s.quantity === 0
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {s.quantity === 0 ? "Sold Out" : "Purchase"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
