import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);
      const productId = searchParams.get("id");
  
      if (!productId) {
        return NextResponse.json({ message: "Required Product ID" }, { status: 400 });
      }
  
      const product = await prisma.product.findUnique({
        where: { id: Number(productId) },
        select: {   id: true,  name: true,    imageUrl: true,    price: true,    description: true 
        },
      });
  
      if (!product) {
        return NextResponse.json({ message: "Product not found" }, { status: 404 });
      }
  
      return NextResponse.json(product, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Server error sorry customers" }, { status: 500 });
    }
  }