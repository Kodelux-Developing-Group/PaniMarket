import { NextRequest, NextResponse } from "next/server";
import ProductsService from "../data/services";

const productService = new ProductsService();

////************OBTENER PRODUCTO POR ID */

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Producto no encontrado
 */
export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const productId = Number(params.id);

    if (!params.id || isNaN(productId)) {
      return NextResponse.json({ message: "Product ID inválido" }, { status: 400 });
    }

    const product = await productService.getProductById(productId);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error del servidor" }, { status: 500 });
  }
}

////************ELIMINAR PRODUCTO */

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const productId = Number(params.id);

    if (!params.id || isNaN(productId)) {
      return NextResponse.json({ message: "Product ID inválido" }, { status: 400 });
    }

    await productService.deleteProductById(productId);

    return NextResponse.json({ message: "Producto eliminado" });
  } catch {
    return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
  }
}