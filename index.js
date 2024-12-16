const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Obtener todas las canciones
app.get("/repertorio", (req, res) => {
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(repertorio);
});

// Agregar una nueva canción
app.post("/repertorio", (req, res) => {
  const nuevaCancion = req.body;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  repertorio.push(nuevaCancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio, null, 2));
  res.status(201).send("Canción agregada con éxito");
});

// Eliminar una canción
app.delete("/repertorio/:id", (req, res) => {
  const { id } = req.params;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = repertorio.findIndex((c) => c.id == id);

  if (index !== -1) {
    repertorio.splice(index, 1);
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio, null, 2));
    res.send("Canción eliminada con éxito");
  } else {
    res.status(404).send("Canción no encontrada");
  }
});

// Editar una canción existente
app.put("/repertorio/:id", (req, res) => {
  const { id } = req.params;
  const nuevaCancion = req.body;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = repertorio.findIndex((c) => c.id == id);

  if (index !== -1) {
    repertorio[index] = nuevaCancion;
    fs.writeFileSync("repertorio.json", JSON.stringify(repertorio, null, 2));
    res.send("Canción modificada con éxito");
  } else {
    res.status(404).send("Canción no encontrada");
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
