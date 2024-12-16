const express = require("express");
const app = express();
const fs = require("fs");

app.listen(3000, console.log("Servidor encendido"));

app.use(express.json());
// Mostramos la informacion
app.get("/repertorio", (req, res) => {
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  res.json(repertorio);
});
// Enviamos la informacion
app.post("/repertorio", (req, res) => {
  const cancion = req.body; //<= Se envia la info del payload
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  repertorio.push(cancion);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("cancion agregada con éxito");
});
// Eliminamos la informacion
app.delete("/repertorio/:id", (req, res) => {
  const { id } = req.params;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = repertorio.findIndex((c) => c.id == id);
  repertorio.splice(index, 1);
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("Cancion eliminada con exito");
});

// Modificamos la informacion
app.put("/repertorio/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const repertorio = JSON.parse(fs.readFileSync("repertorio.json"));
  const index = repertorio.findIndex((c) => c.id == id);
  repertorio[index] = cancion;
  fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
  res.send("Cancion modificada con exito");
});
