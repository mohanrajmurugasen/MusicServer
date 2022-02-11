const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../models");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /mpeg|mp3|jpg|jpeg|png|gif|mp4/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files to upload");
  },
}).fields([
  { name: "audio", maxCount: 1 },
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

router.post("/upload", upload, async (req, res) => {
  const upload = {
    tittle: req.body.tittle,
    audio: req.files.audio[0].filename,
    image: req.files.image[0].filename,
    video: req.files.video[0].filename,
    hero: req.body.hero,
    heroine: req.body.heroine,
    singerName: req.body.singerName,
    movieName: req.body.movieName,
    albumName: req.body.albumName,
    musicDirector: req.body.musicDirector,
    movieDirector: req.body.movieDirector,
    lyricist: req.body.lyricist,
    feelings: req.body.feelings,
    mood: req.body.mood,
    language: req.body.language,
    albumReleaseDate: req.body.albumReleaseDate,
    filmReleaseDate: req.body.filmReleaseDate,
    banner: req.body.banner,
    vendorName: req.body.vendorName,
    pline: req.body.pline,
    cline: req.body.cline,
    category: req.body.category,
    genre: req.body.genre,
  };

  await db.upload
    .findOne({
      where: {
        tittle: req.body.tittle,
      },
    })
    .then((user) => {
      if (!user) {
        db.upload
          .create(upload)
          .then((user) => {
            res.send("Uploaded");
          })
          .catch((err) => {
            res.send(err.message);
          });
      } else {
        res.send("Song is already exist");
      }
    });
});

router.post("/getAllUploads", async (req, res) => {
  await db.upload.findAll().then((data) => res.send(data));
});

module.exports = router;
