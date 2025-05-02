import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

function ProductDetail({ productId }: { productId: number }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/productDetail?id=${productId}`);
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>Precio: ${product.price}</p>
      <p>Descripción: {product.description}</p>
    </div>
  );
}

export default ProductDetail;