const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const { swaggerUi, swaggerSpec } = require("./swagger");

dotenv.config();
const app = express();
connectDB();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
