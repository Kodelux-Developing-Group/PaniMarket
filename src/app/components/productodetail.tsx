"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductDetailProps {
  productId: number;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
        <p className="text-gray-600 mb-6">El producto que estás buscando no existe o ha sido eliminado.</p>
        <Link href="/products" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 relative h-64 md:h-auto">
          <Image 
            src={product.imageUrl || "/images/Nadaa.png"} 
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-green-600 text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold mb-2">Descripción:</h2>
            <p className="text-gray-600">{product.description || "Sin descripción disponible"}</p>
          </div>
          <div className="mt-6">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition w-full md:w-auto">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}