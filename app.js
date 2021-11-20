const express = require('express');
const app = express();
const nhatKy = require('./routes/nhatky');
const connectDB = require('./db/connect');
require('dotenv').config();

const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());


// route
app.use('/api/v1/nhatky', nhatKy);



app.use(notFound);
app.use(errorHandlerMiddleware);




const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`port: ${port}`);
        })
    }
    catch (error) {
        console.log(error);
    }
}

start();
