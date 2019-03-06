// ES6
// Dependencies
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParse from 'body-parser';
import cors from 'cors';

// Controllers
import apiControllers from './controllers/api';

// Express Application
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

// Routes
app.use('/api', apiControllers);

// Listening port
app.listen(4000);
