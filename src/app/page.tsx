import ProductCard from "@/app/components/productCard";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

export default async function HomePage() {
  let products: Product[] = [];
  let error = null;

  try {
    const res = await fetch("http://localhost:3000/api/products", { //me parece que hacer esto esta mal, pero lo hice solo para probar temporalmente
      cache: "no-store",
    
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      throw new Error(`Error al cargar productos: ${res.status} ${res.statusText}`);
    }
    
    products = await res.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    error = err instanceof Error ? err.message : "Error desconocido al cargar productos";
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Nuestros Productos
      </h1>

      {error && (
        <div className="text-center py-10 px-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600 font-medium">Error al cargar productos</p>
          <p className="text-red-500 text-sm mt-2">{error}</p>
        </div>
      )}

      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="text-center text-gray-600">No hay productos disponibles</p>
          )}
        </div>
      )}
    </main>
  );
}
