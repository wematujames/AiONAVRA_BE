const swaggerJsDoc = require("swagger-jsdoc");

const swaggerSpecs = (apiroute) => swaggerJsDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "SIP LAW API SPEC",
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local Development Server",
            },
        ],
    },
    apis: [apiroute],
});

module.exports = swaggerSpecs;
