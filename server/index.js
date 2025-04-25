import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config(); // This line allows us to use environment variables from the .env file

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); //
app.use('/api/v1/post', postRoutes); // This line sets up the route for post requests
app.use('/api/v1/dalle', dalleRoutes); // This line sets up the route for dalle requests

app.get('/', async(req, res) => {

        res.status(200).json({ message: 'Hello from DALL-E!' });
});

const startServer = async () => {

    try{

        connectDB(process.env.MONGODB_URL); // Connect to MongoDB using the URL from the .env file  
        app.listen(5000, () => console.log('Server has started on port http://localhost:5000'));


    }catch(err){
            console.log(err);
    }

    
}

startServer();