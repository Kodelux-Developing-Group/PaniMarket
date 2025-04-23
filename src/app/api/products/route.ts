import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();


async function fetchProducts() {
  return await prisma.product.findMany({
    select: { id: true,name: true,imageUrl: true,price: true,
    },
  });
}


export async function GET(req: NextRequest) {
    try {
      const products = await fetchProducts();
  
      if (products.length === 0) {
        return NextResponse.json({ message: "No hay productos disponibles" }, { status: 404 });
      }
  
      return NextResponse.json(products, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error del servidor" }, { status: 500 });
    }
  }
  