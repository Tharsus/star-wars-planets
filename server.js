import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: 'http://localhost:3000',
  })
);

//Middlewares
app.get('/', (req, res) => {
  res.send('API running');
});

app.listen(process.env.PORT || 8081, () => {
  console.log(`API running on port ${process.env.PORT || 8081}`);
});
