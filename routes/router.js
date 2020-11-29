import express from 'express';
import planetController from '../controllers/planetController.js';

const app = express();

app.post('/planets/', planetController.create);
app.get('/planets/', planetController.retrieve);
app.get('/planets/', planetController.retrieveByName);
app.get('/planets/:id', planetController.retrieveById);
app.delete('/planets/:id', planetController.deleteById);

export default app;
