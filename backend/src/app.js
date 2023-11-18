import express from 'express'
import cors from 'cors';
import path from 'path';
import * as db from './database/connection.config.js'

import { employeeRoutes } from './routes/organization-routes/employee.routes.js';

db.connectDB();

const app = express();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const corsOptions = {};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('backend');
});

app.use('/api', employeeRoutes);

export { app }
