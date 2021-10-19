/* eslint-disable no-unused-expressions */
/* eslint-disable quotes */
import express from 'express';
import foo from '../data/users.json';

require('dotenv').config();

const fs = require('fs');
const multer = require('multer');
const usersRouter = require('../routes/users');

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage: fileStorageEngine });

// app.use((req, res, next) => {
//   console.log('Inside === >>');
//   req.start = Date.now(); next();
// });

app.use(express.static('public'));
app.get('/static', (_req, res, next) => {
  const img = `<img src="/img/Random.gif" />`;

  let html = `<!Doctype html><html><head><title>Sample Gif</title></head></html>`;
  html += `<body><h1>Sample Gif Rendered through static folder</h1><main>${img}</main></body>`;
  res.send(html);
  next();
});

app.post('/single-upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('Single file upload success!');
});

app.use('/', usersRouter);

app.post('/multi-upload', upload.array('images', 3), (req, res) => {
  res.send('Multi-file upload success!');
});

app.post('/login', (req, res) => {
  try {
    (async () => {
      await fs.readFile('./data/users.json', (err, content) => {
        if (err) throw err;
        const parseJson = JSON.parse(content);
        parseJson.push(req.body);
        fs.writeFile('./data/users.json', JSON.stringify(parseJson), (error) => {
          if (error) throw error;
        });
      });
    })();

    console.log(req.body);
    res.status(200).send(foo);
  } catch (error) {
    console.log(error);
    res.status(404).send('Not found');
  }
});

// app.use((req, res) => {
//   console.log("Inside another middleware !!");
//   const time = Date.now() - req.start;
// eslint-disable-next-line max-len
//   console.log('The Time it took to execute is ===>', time, { time1: Date.now(), time2: req.start });
// });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
