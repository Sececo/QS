const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));

let textos = JSON.parse(fs.readFileSync("./banco.json"));
let asignados = [];

// Obtener textos
app.get("/banco", (req, res) => {
  res.json(textos);
});

// Asignar texto aleatorio
app.get("/asignar-texto", (req, res) => {

  const disponibles = textos.filter(
    t => !asignados.some(a => a.texto.contenido === t.contenido)
  );

  if (disponibles.length === 0) {
    return res.json({ error: "No hay textos disponibles" });
  }

  const elegido = disponibles[Math.floor(Math.random() * disponibles.length)];

  const estudiante = {
    numero: Math.floor(Math.random() * 10000), // mejor rango
    texto: elegido
  };

  asignados.push(estudiante);

  res.json(estudiante);
});

// Comprobar pareja
app.post("/comprobar-pareja", (req, res) => {
  const { numero1, numero2 } = req.body;

  const e1 = asignados.find(e => e.numero === numero1);
  const e2 = asignados.find(e => e.numero === numero2);

  if (!e1 || !e2) {
    return res.json({
      correcto: false,
      mensaje: "Número inválido"
    });
  }

  const correcta =
    e1.texto.id === e2.texto.id &&
    e1.texto.tipo !== e2.texto.tipo;

  res.json({
    correcto: correcta,
    mensaje: correcta
      ? "¡Son pareja correcta! 🎉"
      : "No coinciden, sigan buscando ❌"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
