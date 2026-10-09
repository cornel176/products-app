import { useState } from "react";

function CardImage({ product }) {
  return (
    <div className="card-image">
      {product.thumbnail ? (
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      ) : (
        <div className="placeholder">
          {product.title.charAt(0).toUpperCase()}
        </div>
      )}
      {product.isLocal && <span className="badge-local">Nou</span>}
    </div>
  );
}

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
      <div className="card">
        <CardImage product={product} />
        <div className="card-body">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="actions">
            <button className="btn btn-primary" onClick={handleSave}>
              Salvează
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Anulează
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <CardImage product={product} />
      <div className="card-body">
        {product.category && (
          <span className="category">{product.category}</span>
        )}
        <h3>{product.title}</h3>
        {product.rating && (
          <p className="rating">
            <span>★</span> {product.rating}
          </p>
        )}
        <p className="price">${Number(product.price).toFixed(2)}</p>
        <div className="actions">
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(true)}
          >
            Editează
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(product)}>
            Șterge
          </button>
        </div>
      </div>
    </div>
  );
}