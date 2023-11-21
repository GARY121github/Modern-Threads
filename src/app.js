import express from 'express';
import engine from 'ejs-mate';
import path from 'path';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



// Get the current module's filename and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an Express application
const app = express();

// console.log(path.join(__dirname, '..' ,'public'));
// Configure the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.engine('ejs', engine);

// Middleware setup
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// routers
import { productRouter, reviewRouter } from './routes/index.js';

app.use(productRouter);
app.use(reviewRouter);


export default app;