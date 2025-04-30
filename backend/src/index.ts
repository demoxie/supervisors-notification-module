import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import supervisorRoutes from './routes/supervisor.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Use routes (they contain route paths like /supervisors)
app.use('/api', supervisorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
