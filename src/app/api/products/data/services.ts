import { PrismaClient } from "@prisma/client";
import { createProduct, Product } from "./modelo";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export default class ProductsService {

  async createProduct(data: createProduct) {

    const product = await prisma.product.create({
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        price: data.price,
      },
    });
    return product;
  }

  async getProducts() {
    const products: Product[] | null = await prisma.product.findMany({
      select: {
        id: true, name: true, imageUrl: true, price: true, createdAt: true,
      },
    });

    return products;
  }

  async getProductById(id: number) {
    const product: Product | null = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true, name: true, imageUrl: true, price: true, createdAt: true,
      },
    });

    if (!product) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    return product;
  }

  async deleteProductById(id: number) {
    const product = await prisma.product.delete({
      where: { id },
    });
    if (product) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }
    return product;
  }
}

