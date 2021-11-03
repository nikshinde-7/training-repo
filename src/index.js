/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
/* eslint-disable quotes */
import express from 'express';
import foo from '../data/users.json';

const passport = require('passport');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth20');
const session = require('express-session');
const connectPgSimple = require('connect-pg-simple');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const multer = require('multer');
const usersRouter = require('../routes/users');

require('dotenv').config();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

const pgSessionStorage = new (connectPgSimple(session))({
  pool,
  pruneSessionInterval: true,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cors({
  credentials: true,
  origin: `${process.env.APP_URL}`,
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: pgSessionStorage,
  resave: true,
  saveUninitialized: false,
  rolling: true, // forces resetting of max age
  cookie: {
    maxAge: parseInt(process.env.SESSION_EXPIRATION_TIME),
    // eslint-disable-next-line max-len
    // secure: true, // this should be true only when you don't want to show the cookie in browser for security reasons
  },
}));
app.use(passport.initialize());
app.use(passport.session());
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

// passport methods
passport.serializeUser(async (user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const defaultUser = {
        profile,
        accessToken,
        refreshToken,
      };
      try {
        console.log({ profile });
        return done(null, defaultUser);
      } catch (error) {
        console.log(error);
        return done(null, false, { message: error });
      }
    }
  )
);
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
