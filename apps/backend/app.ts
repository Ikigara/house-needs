import express, { Application } from 'express';

export function createHouseNeedsApp(): Application {
  const app = express();

  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: true }));

  return app;
}
