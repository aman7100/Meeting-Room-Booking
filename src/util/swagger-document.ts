import path from "path";
import {config} from 'dotenv'
config()

const SwaggerDocument = {
  swaggerDefinition: {
    info: {
      title: "REST API for Metting Room Application",
      version: "1.0.0",
      description: "This is the REST API for Meeting Room Application",
    },
    host: process.env.SWAGGER_URL,
    basePath: "/api/",
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "x-auth-token",
        scheme: "bearer",
        in: "header",
      },
    },
    schemes: ["htts", "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  explorer: true,
  apis: [path.join(__dirname, "..", "..", "swagger-doc", "*.yaml")],
};

export default SwaggerDocument;
