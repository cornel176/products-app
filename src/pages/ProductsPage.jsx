import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [actionError, setActionError] = useState(null);

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

  async function handleAdd(product) {
    setActionError(null);
    try {
      const created = await createProduct(product);
      const newProduct = { ...created, id: Date.now(), isLocal: true };
      setProducts([newProduct, ...products]);
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleUpdate(product, changes) {
    setActionError(null);
    try {
      if (!product.isLocal) {
        await updateProduct(product.id, changes);
      }
      setProducts(
        products.map((p) => (p.id === product.id ? { ...p, ...changes } : p))
      );
    } catch (err) {
      setActionError(err.message);
    }
  }

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

  if (loading) return <p className="status">Se încarcă...</p>;
  if (loadError) return <p className="status error">{loadError}</p>;

  return (
    <div className="page">
      <h1>Produse</h1>

      {actionError && <p className="error">{actionError}</p>}

      <ProductForm onAdd={handleAdd} />

      <div className="grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}