import { NextResponse } from "next/server";
import ProductsService from "./data/services";

const productService = new ProductsService();

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Agrega un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
export async function POST(request: Request) {
  const data = await request.json();
  const product = await productService.createProduct(data);
  return NextResponse.json(product, { status: 201 });
}

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
export async function GET() {
  const products = await productService.getProducts();
  return NextResponse.json(products);
}

