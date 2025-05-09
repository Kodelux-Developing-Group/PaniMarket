import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Next.js con OpenAPI",
      version: "1.0.0",
      description: "Documentación de las APIs del proyecto",
    },
    servers: [
      {
        url: "http://localhost:3000", // Base URL de tu API
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            imageUrl: { type: "string" },
            price: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/app/api/**/*.ts"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
