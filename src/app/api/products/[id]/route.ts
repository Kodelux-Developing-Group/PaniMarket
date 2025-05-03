import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;

    if (!productId || isNaN(Number(productId))) {
      return NextResponse.json({ message: "Product ID inválido" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        price: true,
        description: true,
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error del servidor" }, { status: 500 });
  }
}