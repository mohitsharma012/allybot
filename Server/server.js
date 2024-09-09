const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const connectDB = require('./Config/db');
const userRoute = require('./Routes/userRoute');



const app = express();                  

// middlewares
app.use(express.json())

// Allow all origins
app.use(cors());

// or for more control
const corsOptions = {
  origin: '*', // Allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // If you need to allow credentials (cookies, etc.)
};
app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: true }));


// database connection
connectDB();


// api endpoints
app.use('/api/user', userRoute);
const dashboardRoute = require('./Routes/dashboardRoute');
app.use('/api/dashboard', dashboardRoute);



app.get('/', (req, res) => {
  res.send('Server is working');
});

app.listen(3000, () => {
  console.log('Server is running on', process.env.URL + process.env.PORT);
});
