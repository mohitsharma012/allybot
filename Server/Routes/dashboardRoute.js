const express = require('express');

const {getDashboard , AIResponse}  = require('../Controllers/dashboardController');
const {isAuthorized} = require('../Middleware/isAuthorized');


const dashboardRouter = express.Router();


dashboardRouter.get('/get-data',isAuthorized ,getDashboard);
dashboardRouter.post('/airesponse', AIResponse);



module.exports = dashboardRouter; // Directly export the router

