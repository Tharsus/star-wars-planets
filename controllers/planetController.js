import { db } from '../models/dbModel.js';
import { logger } from '../config/logger.js';

const retrieve = async (req, res) => {
  try {
    const dbPlanets = await db.model.find();

    if (dbPlanets.length < 1) {
      res.status(404).send({ message: "Couldn't find any planets" });
    }

    logger.info(`GET /planets`);
    res.send(dbPlanets);
  } catch (error) {
    const message = error.message || 'Error while retrieving planets';

    logger.error(`GET /planets - ${JSON.stringify(message)}`);
    res.status(500).send({ message: message });
  }
};

export default { retrieve };
