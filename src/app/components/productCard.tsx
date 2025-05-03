import Image from "next/image";
import Link from "next/link";

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
    <div className="rounded-md shadow-md overflow-hidden bg-white flex flex-col h-full">
      <div className="w-full aspect-[4/3] relative">
        <Image
          src={product.imageUrl || "/images/Nadaa.png"}
          alt={product.name}
          fill
          className="rounded-t-md object-cover"
        />
      </div>
      <div className="p-3 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-base font-semibold line-clamp-1">{product.name}</h2>
          <p className="text-gray-600 text-xs line-clamp-2 mt-1">
            {product.description || "Sin descripción disponible"}
          </p>
          <span className="block mt-2 text-base font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <Link href={`/products/${product.id}`} className="mt-3 block">
          <button className="w-full bg-blue-500 text-white py-1.5 px-3 rounded-md hover:bg-blue-600 transition text-sm">
            Ver detalles
          </button>
        </Link>
      </div>
    </div>
  );
}