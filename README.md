# star-wars-planets
## Descrição:
API que contém informações relacionadas aos planetas que aparecem na franquia Star Wars.

Linguagem: Node.js

Banco de dados: MongoDB, com o ODM Mongoose

Demo publicada no Heroku: https://star-wars-planets-api.herokuapp.com/.

Documentação com o swagger-ui-express que permite a execução de testes: https://star-wars-planets-api.herokuapp.com/documentation/.

## Instalação
Clonar ou baixar o projeto, acessar o diretório raiz e executar o código:
```bash
npm install
```
Criar o arquivo .env com as constantes:
```
MONGODB=
PORT=
LOCALHOST=
```
Onde:
- MONGODB é a string de conexão que o Mongoose utiliza para acessar o MongoDB;
- PORT é a porta que a aplicação será executada, exemplo: 8081;
- LOCALHOST é o hostname que o swagger-ui-express utiliza para poder executar as solicitações, exemplo: localhost:8081.

Executar o projeto:
```
node -r dotenv/config server.js
```

## Casos de uso

#### Listar planetas
Aguarda requests `GET` em `/planets/` e retorna um array com todos os planetas armazenados na base. Permite o parâmetro `name` detalhado na próxima seção.

- Documentação: https://star-wars-planets-api.herokuapp.com/documentation/#/planets/get_planets
- Exemplo utilizando a demo: GET https://star-wars-planets-api.herokuapp.com/planets/

#### Buscar planeta por nome
Aguarda requests `GET` em `/planets/?name=` e retorna apenas um planeta, exigindo que o nome recebido como parâmetro seja exatamente igual ao cadastrado na base de dados.

- Documentação: https://star-wars-planets-api.herokuapp.com/documentation/#/planets/get_planets
- Exemplo utilizando a demo: GET https://star-wars-planets-api.herokuapp.com/planets/?name=Tatooine

#### Buscar planeta por ID
Aguarda requests `GET` em `/planets/:id` e retorna apenas um planeta.

- Documentação: https://star-wars-planets-api.herokuapp.com/documentation/#/planets/get_planets__planetId_
- Exemplo utilizando a demo: GET https://star-wars-planets-api.herokuapp.com/planets/5fc400e7386dc41c9ca05172

#### Adicionar um planeta
Aguarda requests `POST` em `/planets/` com json no body contendo `name` e retorna o planeta com o `id` cadastrado na base de dados.

- Documentação: https://star-wars-planets-api.herokuapp.com/documentation/#/planets/post_planets
- Exemplo utilizando a demo: POST https://star-wars-planets-api.herokuapp.com/planets/ com json: {"name":"Endor"}

#### Remover um planeta
Aguarda requests `DELETE` em `/planets/:id` com json no body contendo `name` e retorna um json com `message` informando a remoção ou motivo da falha.

- Documentação: https://star-wars-planets-api.herokuapp.com/documentation/#/planets/delete_planets__planetId_
- Exemplo utilizando a demo: DELETE https://star-wars-planets-api.herokuapp.com/planets/5fc400e7386dc41c9ca05172
