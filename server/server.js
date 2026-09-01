import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ Server is running perfectly',
    message: 'سهم البيوت - الخادم يعمل بشكل صحيح',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n✅ سهم البيوت - Sahm AlBuyoot`);
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📍 Health Check: http://localhost:${PORT}/api/health\n`);
});

export default app;