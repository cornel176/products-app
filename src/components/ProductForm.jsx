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
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Adaugă un produs nou</h2>
      <div className="form-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nume produs"
          required
        />
        <input
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Preț"
          required
        />
        <button className="btn btn-primary" type="submit">
          Adaugă
        </button>
      </div>
    </form>
  );
}