import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import express from 'express';

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API de mi aplicación',
            version: '1.0.0',
            description: 'Documentación de la API de mi aplicación',
        },
    },
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
