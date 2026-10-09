import { useState } from "react";

export default function ProductForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ title, price: Number(price) });
    setTitle("");
    setPrice("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nume produs"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Preț"
        required
      />
      <button type="submit">Adaugă</button>
    </form>
  );
}