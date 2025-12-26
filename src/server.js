import express from 'express';
import { connectDB } from './config/database.js';
import apiRoutes from "./routes/apiRoutes.js"
import { PORT } from './config/serverConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req,res) => {
  res.status(200).json({ success: true, message: 'Server is running'});
});

app.use('/api', apiRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
};

startServer();

export default app;
