import express from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

export default ({ app }: { app: express.Application }) => {
  const swaggerPath = 'swagger-output.json';

  if (!fs.existsSync(swaggerPath)) {
    throw new Error(
      `${swaggerPath} not found. Please generate it using swagger.generate.ts`,
    );
  }

  const swaggerDoc = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  const port = process.env.PORT || 3000;
  console.log(`Swagger UI is available at http://localhost:${port}/api-docs`);
};
