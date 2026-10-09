import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [actionError, setActionError] = useState(null);

  // formularul de creare
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  // editare
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // READ: la încărcarea paginii
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setLoadError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // CREATE
  async function handleSubmit(e) {
    e.preventDefault();
    setActionError(null);

    try {
      const created = await createProduct({
        title,
        price: Number(price),
      });

      // DummyJSON returnează mereu același id, deci generăm unul local
      // și marcăm produsul ca "local" (nu există cu adevărat pe server)
      const newProduct = { ...created, id: Date.now(), isLocal: true };

      setProducts([newProduct, ...products]);
      setTitle("");
      setPrice("");
    } catch (err) {
      setActionError(err.message);
    }
  }

  // Intrăm în modul de editare
  function startEdit(product) {
    setEditingId(product.id);
    setEditTitle(product.title);
    setEditPrice(String(product.price));
  }

  function cancelEdit() {
    setEditingId(null);
  }

  // UPDATE
  async function handleUpdate(product) {
    setActionError(null);

    const updated = { title: editTitle, price: Number(editPrice) };

    try {
      // produsele create local nu există pe server, deci nu le trimitem
      if (!product.isLocal) {
        await updateProduct(product.id, updated);
      }

      setProducts(
        products.map((p) => (p.id === product.id ? { ...p, ...updated } : p))
      );
      setEditingId(null);
    } catch (err) {
      setActionError(err.message);
    }
  }

  // DELETE
  async function handleDelete(product) {
    setActionError(null);

    try {
      if (!product.isLocal) {
        await deleteProduct(product.id);
      }

      setProducts(products.filter((p) => p.id !== product.id));
    } catch (err) {
      setActionError(err.message);
    }
  }

  if (loading) return <p>Se încarcă...</p>;
  if (loadError) return <p>{loadError}</p>;

  return (
    <div>
      <h1>Produse</h1>

      {actionError && <p style={{ color: "red" }}>{actionError}</p>}

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

      {products.map((product) => (
        <div key={product.id} style={{ marginTop: "16px" }}>
          {editingId === product.id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
              <button onClick={() => handleUpdate(product)}>Salvează</button>
              <button onClick={cancelEdit}>Anulează</button>
            </>
          ) : (
            <>
              <h3>{product.title}</h3>
              <p>{product.price} $</p>
              <button onClick={() => startEdit(product)}>Editează</button>
              <button onClick={() => handleDelete(product)}>Șterge</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}