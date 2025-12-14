import React, { useState } from "react";
import API from "../api";

export default function AdminPanel() {
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "", description: "" });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
        description: form.description
      };
      await API.post("/sweets", payload);
      alert("Added");
      setForm({ name: "", category: "", price: "", quantity: "", description: "" });
      window.location.reload();
    } catch (err: any) {
      alert(err?.response?.data?.error || "Failed to add");
    }
  }

  return (
    <div style={{ marginTop: 30, padding: 12, border: "1px solid #ccc", borderRadius: 6 }}>
      <h3>Admin Panel — Add Sweet</h3>
      <form onSubmit={add}>
        <div><input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
        <div><input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required /></div>
        <div><input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
        <div><input placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required /></div>
        <div><input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <button type="submit">Add Sweet</button>
      </form>
    </div>
  );
}
