exports.swaggerJSDocOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth api",
      version: "1.0.0",
      description: "A simple auth server",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    servers: [
      {
        url: "http://localhost:8000"
      }
    ]
  },
  apis: ["./routes/*.js", "./swagger/schemas/*.js"]
}

exports.swaggerUIOptions = {
  swaggerOptions:
  {
    urls:
      [
        {
          url: 'http://localhost:8000/api-docs.json'
        }
      ]
  }
}