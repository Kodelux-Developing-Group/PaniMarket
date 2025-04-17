import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

function validateMethod(req: NextApiRequest, res: NextApiResponse): boolean 
{
  if (req.method !== "GET")
     {
    res.status(405).json({ message: "Method not allowed" });
    return false;
  }
  return true;
}

async function fetchProducts()
 {
  return await prisma.product.findMany({
    select: {
       id: true,
      name: true,
      description: true,
      price: true,
    },
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) 
{
  try {
    if (!validateMethod(req, res)) {
      return;
    }

    const products = await fetchProducts();
    return res.status(200).json(products);
  } catch (e) {


    return res.status(500).json({ message: "Internal Server Error Sorry Customer" });
  }
}