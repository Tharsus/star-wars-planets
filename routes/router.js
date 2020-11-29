import express from 'express';
import planetController from '../controllers/planetController.js';

const app = express();

app.get('/planets/', planetController.retrieve);
app.post('/planets/', planetController.create);
// app.delete('/planets/', planetController.delete);

export default app;
