import express from 'express'
import cors from 'cors';
import path from 'path';
import * as db from './database/connection.config.js'

import { employeeRoutes } from './routes/organization-routes/employee.routes.js';
import { expenseRoutes } from './routes/organization-routes/expenses.route.js';
import { dashboardRoutes } from './routes/organization-routes/dashboard.routes.js';

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
app.use('/api', expenseRoutes);
app.use('/api', dashboardRoutes);

export { app }

