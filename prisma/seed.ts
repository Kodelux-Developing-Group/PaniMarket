import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("⏳ Iniciando inserción de datos...");

    const panFlauta = await prisma.product.create({
      data: {
        name: "Pan Flauta",
        description: "Cocinado a horno de leña, crocante por fuera, suave por dentro.",
        price: 999.99,
        imageUrl: "/images/PanFlauta.jpg",
      },
    });
    console.log("Producto insertado:", panFlauta);

    const panMolde = await prisma.product.create({
      data: {
        name: "Pan de Molde",
        description: "Pan hecho al molde, con semillas, ideal para untar o hacer sandwiches.",
        price: 199.99,
        imageUrl: "/images/PanSemilla.jpg",
      },
    });
    console.log(" Producto insertado:", "PanSemilla");

    console.log("Todos los productos fueron insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  } finally {
    await prisma.$disconnect();
    console.log("sPrisma desconectado.");
  }
}

main();
