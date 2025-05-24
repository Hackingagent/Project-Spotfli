import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
// fS2p1S0VCAvKXwK4
app.listen('5000', ()=>{
    connectDB()
    console.log('Server is Running');
})