import { db } from '../models/dbModel.js';

const retrieve = async (req, res) => {
  try {
    const dbPlanets = await db.model.find();

    if (dbPlanets.length < 1) {
      res.status(404).send({ message: "Couldn't find any planets" });
    }

    res.send(dbPlanets);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Error while retrieving planets' });
  }
};

export default { retrieve };
