import { useState } from "react";

export default function ProductCard({ product, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(String(product.price));

  function handleSave() {
    onUpdate(product, { title, price: Number(price) });
    setIsEditing(false);
  }

  function handleCancel() {
    setTitle(product.title);
    setPrice(String(product.price));
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div style={{ marginTop: "16px" }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleSave}>Salvează</button>
        <button onClick={handleCancel}>Anulează</button>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "16px" }}>
      <h3>{product.title}</h3>
      <p>{product.price} $</p>
      <button onClick={() => setIsEditing(true)}>Editează</button>
      <button onClick={() => onDelete(product)}>Șterge</button>
    </div>
  );
}