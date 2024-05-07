var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//Tambahkan body-parser
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// gunakan body parser sebgai middleware
app.use(bodyParser.json());
// data yang kita gunakan adalah kelas pada karakter game
var kelas = [
  { id: 1, nama_kelas: "Backend" },
  { id: 2, nama_kelas: "Frontend" },
  { id: 3, nama_kelas: "Fullstack" },
];
app.get("/api/kelas", function (req, res) {
  res.json({ data: kelas });
  res.send({ data: kelas });
});

app.get("/api/kelas/:id", function (req, res) {
  const kls = kelas.find((k) => k.id === parseInt(req.params.id));
  if (!kls) res.status(404).send("Kelas tidak ditemukan"); // tampilkan status 404
  res.json({ data: kls });
  res.send({ data: kls });
});

// Menambahkan data
app.post("/api/kelas", function (req, res) {
  //Kondisi apabila nama kelas kosong
  if (!req.body.nama_kelas) {
    // Menampilkan pesan error ketika field nama kelas kosong
    res.status(400).send("Nama kelas harus diisi");
    return;
  }

  const kls = {
    id: kelas.length + 1,
    nama_kelas: req.body.nama_kelas,
  };
  kelas.push(kls);
  res.send(kls);
});

// Mengupdate data
app.put("/api/kelas/:id", function (req, res) {
  //Cek id kelas
  const klas = kelas.find((k) => k.id === parseInt(req.params.id));
  if (!klas) res.status(404).send("Kelas tidak ditemukan"); // tampilkan status 404

  if (!req.body.nama_kelas) {
    // Menampilkan pesan error ketika field nama kelas kosong
    res.status(400).send("Nama kelas harus diisi");
    return;
  }

  klas.nama_kelas = req.body.nama_kelas;
  res.send({ pesan: "Data berhasil diupdate.", data: klas });
});

// Menghapus data
app.delete("/api/kelas/:id", function (req, res) {
  //Cek id kelas
  const klas = kelas.find((k) => k.id === parseInt(req.params.id));
  if (!klas) res.status(404).send("Kelas tidak ditemukan"); // tampilkan status 404

  const index = kelas.indexOf(klas);
  kelas.splice(index, 1);
  res.send({ pesan: "Data berhasil dihapus.", data: klas });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
