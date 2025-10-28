const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const pokemonRoutes = require('./routes/pokemonRoutes');
const connectDB = require('./config/database');
const User = require('./models/userModel');

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const dbUrl = process.env.DATABASE_URL;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json()); //middleware pour parser le body des requetes en json

connectDB(dbUrl).then(() => {
    app.listen(PORT, () => console.log(`Server started on : http://localhost:${PORT}`));
}).catch((err) => console.error(err));

app.use('/api/user', userRoutes);
app.use('/api/pokemon', pokemonRoutes);
