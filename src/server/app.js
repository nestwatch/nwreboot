import express from 'express';
import cors from 'cors';

const app = express();

const allowedOrigins = [
  'https://5173-idx-nestwatchreboot-1717789146677.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev'
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define the port directly
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});