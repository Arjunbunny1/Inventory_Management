const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inventory Management API",
      version: "1.0.0",
      description: "API docs for Inventory Management project",
    },
    components: {
        securitySchemes: {
        bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
  },
},
security: [
  {
    bearerAuth: [],
  },
],

    servers: [
      {
        url: "http://localhost:8000/api",
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);



module.exports = {
  swaggerUi,
  swaggerSpec,
};
