// src/utils/swagger.generate.ts
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Swagger API Documentation',
    description: 'This is the API documentation.',
  },
  host: `localhost:${process.env.PORT || 3000}`,
  basePath: '/',
  schemes: ['http'],
};

const outputFile = 'swagger-output.json';
const endpointsFiles = ['./src/app/router/index.ts']; // Adjust as needed

swaggerAutogen()(outputFile, endpointsFiles, doc);
