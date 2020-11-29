import { db } from '../models/dbModel.js';
import { logger } from '../config/logger.js';

import SWAPI from '../helpers/StarWarsAPI.js';

const create = async (req, res) => {
  const newPlanet = {};
  newPlanet.name = req.body.name;
  newPlanet.climate = req.body.climate;
  newPlanet.terrain = req.body.terrain;

  if (!newPlanet.name || !newPlanet.climate || !newPlanet.terrain) {
    return res.status(400).send({
      message: 'Missing parameters in json',
    });
  }

  try {
    const requestPlanet = await SWAPI.getPlanet(newPlanet.name);

    if (requestPlanet.error) throw new Error(requestPlanet.error);

    newPlanet.appearances = requestPlanet.appearances;
    const dbPlanet = new db.model(newPlanet);
    await dbPlanet.save();

    logger.info(`POST /planets - ${JSON.stringify(req.body)}`);
    res.send(dbPlanet);
  } catch (error) {
    const message = error.message || 'Error while creating new planet';

    logger.error(`POST /planets - ${JSON.stringify(message)}`);
    res.status(500).send({ message: message });
  }
};

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

export default { create, retrieve };
