export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Star Wars Planets API description',
    version: '1.0.0',
    title: 'Star Wars Planets API',
  },
  host: process.env.HOST,
  tags: [
    {
      name: 'planets',
      description: 'Planets management',
    },
  ],
  paths: {
    '/planets': {
      post: {
        tags: ['planets'],
        summary: 'Create new planet',
        description: `This method uses the SWAPI to validate the name provided and to get its climate, terrain and number of appearances of the planet in films. It does not allow duplicated values in the database.`,
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description:
              'Planet object that needs to be added to the database, the name needs to be an exact match of a planet in SWAPI.',
            required: true,
            schema: {
              $ref: '#/definitions/NewPlanet',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/Planet',
            },
          },
          400: {
            description: 'Invalid input',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Planet already in the database',
                },
              },
            },
          },
          500: {
            description: 'An error occurred',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Error while creating new planet',
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['planets'],
        summary: 'Get existing planets',
        description:
          'Return an array with all stored planets. If name is included in query, return a single value.',
        produces: ['application/json'],
        parameters: [
          {
            in: 'query',
            name: 'name',
            description: 'Planet name used for filtering the array.',
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Planet',
              },
            },
          },
          404: {
            description: 'Planet not found',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: "Couldn't find any planets",
                },
              },
            },
          },
          500: {
            description: 'An error occurred',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Error while retrieving planets',
                },
              },
            },
          },
        },
      },
    },
    '/planets/{planetId}': {
      get: {
        tags: ['planets'],
        summary: 'Get planet by ID',
        // description: 'Return a single planet',
        produces: ['application/json'],
        parameters: [
          {
            name: 'planetId',
            in: 'path',
            description: 'ID of planet to return.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/Planet',
            },
          },
          404: {
            description: 'Planet not found',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: "Couldn't find planet",
                },
              },
            },
          },
          500: {
            description: 'An error occurred',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Error while retrieving planet',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['planets'],
        summary: 'Delete planet',
        // description: 'Delete planet',
        produces: ['application/json'],
        parameters: [
          {
            name: 'planetId',
            in: 'path',
            description: 'ID of planet to delete.',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Planet successfully deleted',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Planet successfully deleted',
                },
              },
            },
          },
          404: {
            description: 'Planet not found',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: "Couldn't find planet to delete",
                },
              },
            },
          },
          500: {
            description: 'An error occurred',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Error while retrieving planet to delete',
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    NewPlanet: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          example: 'Tatooine',
        },
      },
    },
    Planet: {
      type: 'object',
      properties: {
        _id: {
          type: 'integer',
          example: '5fc41faa26905b3718516946',
        },
        name: {
          type: 'string',
          example: 'Tatooine',
        },
        climate: {
          type: 'string',
          example: 'arid',
        },
        terrain: {
          type: 'string',
          example: 'desert',
        },
        appearances: {
          type: 'integer',
          example: 5,
        },
        __v: {
          type: 'integer',
          example: 0,
        },
      },
    },
  },
};
