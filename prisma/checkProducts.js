const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log(" Productos en la BD:", products);
}

main()
  .catch((error) => console.error(" Error al obtener productos:", error))
  .finally(async () => {
    await prisma.$disconnect();
  });
