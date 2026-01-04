import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './prisma.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import visitorRoutes from './routes/visitorRoutes.js';
import equipmentRoutes from './routes/equipmentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection on startup
testConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
});