import { createHouseNeedsApp } from './app';

const app = createHouseNeedsApp();

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});
