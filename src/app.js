const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.send(repositories)
});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body

  repositories.push({ id: uuid(), title, url, techs, likes: 0 })

  return response.status(201).send(repositories[repositories.length - 1])

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params

  let index = repositories.findIndex(repo => repo.id === id);

  if (index < 0) return response.status(400).send({ error: "Repository not found" })

  const { title, url, techs } = request.body

  repositories[index]['title'] = title
  repositories[index]['url'] = url
  repositories[index]['techs'] = techs

  return response.status(200).send(repositories[index]);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params

  const index = repositories.findIndex(repo => repo.id === id)

  if (index < 0) return response.status(400).send({ error: "Repository not found" })

  repositories.splice(index, 1);

  return response.status(204).send(repositories[index]);
});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params

  const index = repositories.findIndex(repo => repo.id === id)

  if (index < 0) return response.status(400).send()

  repositories[index]['likes'] += 1;

  return response.status(200).send({ likes: repositories[index]['likes'] })

});

module.exports = app;
