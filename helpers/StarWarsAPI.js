import axios from 'axios';

const getAllPlanets = async () => {
  let planets = [];
  let url = 'http://swapi.dev/api/planets/';
  let hasNextPage = true;
  while (hasNextPage) {
    const resp = await axios.get(url);

    let pagePlanets = resp.data.results.map((planet) => {
      const { name, climate, terrain, films } = planet;

      return {
        name,
        climate,
        terrain,
        appearances: films.length,
      };
    });

    planets.push(...pagePlanets);

    url = resp.data.next;
    if (url === null) {
      hasNextPage = false;
    }
  }

  return planets;
};

const getPlanet = async (planetName) => {
  let url = `http://swapi.dev/api/planets/?search=${planetName}`;

  const resp = await axios.get(url);

  if (resp.data.results.length > 1) {
    return { error: 'More than a planet has been found with this name' };
  }

  if (resp.data.results.length === 0) {
    return { error: "Couldn't find planet name" };
  }

  const { name, climate, terrain, films } = resp.data.results[0];

  return {
    name,
    climate,
    terrain,
    appearances: films.length,
  };
};

export default { getAllPlanets, getPlanet };
