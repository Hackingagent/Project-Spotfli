import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';  
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import hotelRoutes from './routes/hotel.js'


dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());  // Add this line before your routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/hotel', hotelRoutes); // This creates the /api/hotel/register endpoint

// Error handling middleware
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen('5000', ()=>{
    connectDB()
    console.log('Server is Running');
})


// fS2p1S0VCAvKXwK4 