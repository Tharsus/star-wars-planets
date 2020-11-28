import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from './models/planetModel.js';
import router from './routes/router.js';

(async () => {
  try {
    console.log(`Initializing DB connection`);

    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
})();

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
app.use(router);

app.listen(process.env.PORT || 8081, () => {
  console.log(`API running on port ${process.env.PORT || 8081}`);
});
