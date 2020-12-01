# star-wars-planets
API that contains information related to the planets of the Star Wars franchise

Live demo deployed at Heroku, see the documentation in the following link: https://star-wars-planets-api.herokuapp.com/documentation/.
It's also possible to execute tests in the documentation by clicking in 'Try it out'.

Methods:
- List all stored planets: GET https://star-wars-planets-api.herokuapp.com/planets/
- Search planet by name: GET https://star-wars-planets-api.herokuapp.com/planets/?name=Tatooine
- Search planet by id: GET https://star-wars-planets-api.herokuapp.com/planets/5fc400e7386dc41c9ca05172
- Create new planet: POST https://star-wars-planets-api.herokuapp.com/planets/ with an object as follow: {"name":"Endor"}
- Delete planet: DELETE https://star-wars-planets-api.herokuapp.com/planets/5fc400e7386dc41c9ca05172
