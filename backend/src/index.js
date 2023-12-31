import { config } from "dotenv";
import { app } from './app.js';
config();

const port = process.env.MAIN_PORT;
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

