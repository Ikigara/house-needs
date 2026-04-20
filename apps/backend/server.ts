// FIXME: should not be using .js extension here, but ts-node is not resolving it correctly without it
import { createHouseNeedsApp } from './app.js';

const app = createHouseNeedsApp();

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});
