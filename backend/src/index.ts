import * as dotenv from 'dotenv'
import { dbConnect } from "./db/index.js";
import { app } from "./App.js";

dotenv.config({ path: "./.env.backend " });
const port = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is runnin on port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MONGODB connection failed !!", error);
    process.exit(1);
  });
