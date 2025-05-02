import Image from "next/image";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white p-4">
   
      <div className="w-full h-48 relative">
        <Image
          src={product.imageUrl || "/images/Nadaa.png"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

     
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600 text-sm">{product.description || "Sin descripción disponible"}</p>
        <span className="block mt-2 text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>

       
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
          Ver detalles
        </button>
      </div>
    </div>
  );
}