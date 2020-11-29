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
    // Verify if database already has the planet record
    const condition = { name: newPlanet.name };
    if ((await db.model.findOne(condition)) !== null)
      throw new Error('Planet already in the database');

    // Validate planet name with the Star Wars API
    const requestPlanet = await SWAPI.getPlanet(newPlanet.name);
    // Possible errors: more than one record found or planet doesn't exist
    if (requestPlanet.error) throw new Error(requestPlanet.error);

    newPlanet.appearances = requestPlanet.appearances;
    const dbPlanet = new db.model(newPlanet);
    await dbPlanet.save();

    logger.info(`POST /planets - ${JSON.stringify(dbPlanet)}`);
    res.send(dbPlanet);
  } catch (error) {
    const message = error.message || 'Error while creating new planet';

    logger.error(`POST /planets - ${JSON.stringify(message)}`);
    res.status(500).send({ message: message });
  }
};

const retrieve = async (req, res, next) => {
  // If query has name, allow next route to handle the request
  if (req.query.name) next();

  try {
    const dbPlanets = await db.model.find();

    if (dbPlanets.length < 1) {
      const message = "Couldn't find any planets";

      logger.error(`GET ${req.originalUrl} - ${JSON.stringify(message)}`);
      res.status(404).send({ message: message });
      return;
    }

    logger.info(`GET ${req.originalUrl}`);
    res.send(dbPlanets);
  } catch (error) {
    const message = error.message || 'Error while retrieving planets';

    logger.error(`GET ${req.originalUrl} - ${JSON.stringify(message)}`);
    res.status(500).send({ message: message });
  }
};

const retrieveByName = async (req, res) => {
  const name = req.query.name;
  const condition = { name: name };

  try {
    const planet = await db.model.findOne(condition);

    if (!planet) {
      const message = "Couldn't find planet";

      logger.error(`GET ${req.originalUrl} - ${JSON.stringify(message)}`);
      res.status(404).send({ message: message });
      return;
    }

    logger.info(`GET ${req.originalUrl}`);
    res.send(planet);
  } catch (error) {
    const message = error.message || 'Error while retrieving planet';

    logger.error(`GET ${req.originalUrl} - ${JSON.stringify(message)}`);
    res.status(500).send({ message: message });
  }
};

const retrieveById = async (req, res) => {
  const id = req.params.id;

  try {
    const planet = await db.model.findById({ _id: id });

    if (!planet) {
      const message = "Couldn't find planet";

      logger.error(`GET ${req.originalUrl} - ${JSON.stringify(message)}`);
      res.status(404).send({ message: message });
      return;
    }

    logger.info(`GET ${req.originalUrl}`);
    res.send(planet);
  } catch (error) {
    const message = error.message || 'Error while retrieving planet';

    logger.error(`GET ${req.originalUrl} - ${JSON.stringify(message)}`);
    res.status(500).send({ message: message });
  }
};

const deleteById = async (req, res) => {
  const id = req.params.id;

  try {
    const planet = await db.model.findByIdAndDelete({ _id: id });

    if (!planet) {
      const message = "Couldn't find planet to delete";

      logger.error(`DELETE ${req.originalUrl} - ${JSON.stringify(message)}`);
      res.status(404).send({ message: message });
      return;
    }

    logger.info(`DELETE ${req.originalUrl}`);
    res.send({ message: 'Planet successfully deleted' });
  } catch (error) {
    const message = error.message || 'Error while retrieving planet to delete';

    logger.error(`DELETE ${req.originalUrl} - ${JSON.stringify(message)}`);
    res.status(500).send({ message: message });
  }
};

export default { create, retrieve, retrieveByName, retrieveById, deleteById };
