const express = require("express");
const app = express();
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const cors = require("cors");
app.use(cors());

app.use(requestLogger);
app.use(express.json());
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
  app.get("/api/persons", (request, response) => {
    response.json(persons);
  });
  app.get("/info", (request, response) => {
    const date = new Date();
    const num = persons.length;
    response.send(`<p> Phonebook has info for ${num}</p>
    <p>${date} `);
  });
};

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  per = persons.find((p) => p.id === id);

  if (per) {
    response.json(per);
  } else {
    return response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  console.log(persons);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const findperson = persons.find((p) => p.name === String(body.name));
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "Either you havent added name or number" });
  }
  if (findperson) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.random(1000000000),
  };
  persons = persons.concat(person);
  response.json(persons);
});
const PORT = 3001;
app.listen(PORT);
console.log(`we are listening at ${PORT}`);
