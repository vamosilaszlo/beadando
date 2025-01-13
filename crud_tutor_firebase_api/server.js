// const express = require("express");
// const app = express();

// const PORT = 3000; // Ez lesz az a port, amin a szerver fut

// // Példa route (végpont)
// app.get("/", (req, res) => {
//   res.send("Üdv az Express szerveren!");
// });

// //Szerver indítása
// app.listen(PORT, () => {
//   console.log(`Szerver fut a http://localhost:${PORT} címen`);
// });
////---------

// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const app = express();
// // példa route végpont
// app.get("/api/data", (req, res) => {
//   // JSON fájl dinamikus beolvasása
//   const filePath = path.join(__dirname, "data", "db.json");
//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       res.status(500).json({ error: "Hiba történt a fájl beolvasásakor" });
//       return;
//     }
//     res.json(JSON.parse(data)); // JSON adat küldése
//   });
// });

// app.listen(3000, () => {
//   console.log("Szerver fut a http://localhost:3000 porton");
// });

//--------

// const express = require("express");
// const app = express();
// const port = 3000;

// // JSON fájl elérési útvonal
// const path = require("path");
// const dataFilePath = path.join(__dirname ,"", "db.json");

// // Statikus fájlok kezelése
// app.use(express.static("public")); // Ha van "public" mappa
// app.use(express.json());

// // API végpontok
// app.get("/api/data", (req, res) => {
//   res.sendFile(dataFilePath);
// });

// // Szerver indítása
// app.listen(port, () => {
//   console.log(`Szerver fut a következő címen: http://localhost:${port}`);
// });
///----------------

// const express = require("express");
// const path = require("path");
// const fs = require("fs");

// const app = express();
// const port = 3000;

// // JSON fájl elérési útja
// const dataFilePath = path.join(__dirname, "data", "db.json");

// // Middleware a JSON kezeléshez
// app.use(express.json());

// // GET: Adatok lekérése
// app.get("/api/data", (req, res) => {
//   fs.readFile(dataFilePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Hiba történt az adatok olvasásakor:", err);
//       res.status(500).json({ error: "Hiba történt az adatok olvasásakor." });
//       return;
//     }
//     res.json(JSON.parse(data));
//   });
// });

// // POST: Új adat hozzáadása
// app.post("/api/data", (req, res) => {
//   const newData = req.body;

//   fs.readFile(dataFilePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Hiba történt az adatok olvasásakor:", err);
//       res.status(500).json({ error: "Hiba történt az adatok olvasásakor." });
//       return;
//     }

//     const parsedData = JSON.parse(data);
//     parsedData.push(newData);

//     fs.writeFile(dataFilePath, JSON.stringify(parsedData, null, 2), (err) => {
//       if (err) {
//         console.error("Hiba történt az adatok mentésekor:", err);
//         res.status(500).json({ error: "Hiba történt az adatok mentésekor." });
//         return;
//       }

//       res.status(201).json(newData);
//     });
//   });
// });

// // Szerver indítása
// app.listen(port, () => {
//   console.log(`Szerver fut a következő porton: http://localhost:${port}`);
// });

////-----------  CRUD   SERVER ---------

// const express = require("express");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const port = 3000;

// // Middleware: JSON body kezelés
// app.use(bodyParser.json());

// // A JSON fájl elérési útja
// const dataFilePath = path.join(__dirname, "data", "db.json");

// // 1. GET: Az összes adat lekérése
// app.get("/api/data", (req, res) => {
//   fs.readFile(dataFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Hiba történt az adatok betöltésekor!");
//     }
//     res.json(JSON.parse(data)); // JSON-t küld vissza
//   });
// });

// // 2. POST: Új adat hozzáadása
// app.post("/api/data", (req, res) => {
//   const newData = req.body;

//   // Ellenőrizzük, hogy az új adat érvényes-e
//   if (!newData.name || !newData.age) {
//     return res.status(400).send("A név és életkor mező kitöltése kötelező!");
//   }

//   fs.readFile(dataFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Hiba történt az adat hozzáadása során!");
//     }

//     const db = JSON.parse(data);
//     // newData.id = Date.now(); // UNIX idő
//     // --------
//     // const { v4: uuidv4 } = require("uuid");
//     // newData.id = uuidv4(); //   UUID generálása
//     // --------

//     const newData = db.length + 1; // növekvő ID, a tömb hosszával

//     db.push(newData); // Az új adat hozzáadása

//     fs.writeFile(dataFilePath, JSON.stringify(db, null, 2), (err) => {
//       if (err) {
//         return res.status(500).send("Hiba történt az adat mentése során!");
//       }
//       res.status(201).json(newData); // Válasz a kliensnek
//     });
//   });
// });

// // 3. PUT: Adat módosítása
// app.put("/api/data/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const updatedData = req.body;

//   if (!updatedData.name || !updatedData.age) {
//     return res.status(400).send("A név és életkor mező kitöltése kötelező!");
//   }

//   fs.readFile(dataFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Hiba történt az adat módosítása során!");
//     }

//     const db = JSON.parse(data);
//     const index = db.findIndex((item) => item.id === id);

//     if (index === -1) {
//       return res.status(404).send("A módosítandó adat nem található!");
//     }

//     // Módosítjuk az adatot
//     db[index] = { ...db[index], ...updatedData };

//     fs.writeFile(dataFilePath, JSON.stringify(db, null, 2), (err) => {
//       if (err) {
//         return res.status(500).send("Hiba történt az adat mentése során!");
//       }
//       res.json(db[index]); // Válasz a kliensnek
//     });
//   });
// });

// // 4. DELETE: Adat törlése
// app.delete("/api/data/:id", (req, res) => {
//   const id = parseInt(req.params.id);

//   fs.readFile(dataFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send("Hiba történt az adat törlése során!");
//     }

//     const db = JSON.parse(data);
//     const index = db.findIndex((item) => item.id === id);

//     if (index === -1) {
//       return res.status(404).send("A törlendő adat nem található!");
//     }

//     db.splice(index, 1); // Az adat törlése

//     fs.writeFile(dataFilePath, JSON.stringify(db, null, 2), (err) => {
//       if (err) {
//         return res.status(500).send("Hiba történt az adat mentése során!");
//       }
//       res.send("Adat sikeresen törölve!");
//     });
//   });
// });

// // Indítjuk a szervert
// app.listen(port, () => {
//   console.log(`Szerver fut a http://localhost:${port}`);
// });

///---- növekvö id -----
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
app.use(cors());




const dataFilePath = path.join(__dirname,"data", "db.json"); // JSON fájl helye
let data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

// Legnagyobb `id` meghatározása induláskor
let currentId = data.length > 0 ? Math.max(...data.map((item) => item.id)) : 0;

app.use(express.json());

// GET - Adatok lekérése
app.get("/api/data", (req, res) => {
  res.json(data);
});

// POST - Új adat hozzáadása
app.post("/api/data", (req, res) => {
  const newItem = req.body;

  // Új `id` generálása
  currentId += 1;
  newItem.id = currentId;

  data.push(newItem);

  // Adat mentése fájlba
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

  res.status(201).json(newItem); // Új adat visszaküldése
});

// DELETE - Adat törlése
app.delete("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = data.findIndex((item) => item.id === id);

  if (index !== -1) {
    data.splice(index, 1);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.status(200).json({ message: "Adat törölve." });
  } else {
    res.status(404).json({ error: "Adat nem található." });
  }
});

// PUT - Adat módosítása
app.put("/api/data/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedItem = req.body;

  const index = data.findIndex((item) => item.id === id);

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    res.status(200).json(data[index]);
  } else {
    res.status(404).json({ error: "Adat nem található." });
  }
});

// Szerver indítása
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
