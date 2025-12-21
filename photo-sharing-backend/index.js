const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session")

const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const AuthRouter = require("./routes/AuthRouter")
const RegisterRouter = require("./routes/RegisterRouter")
const CommentRouter = require("./routes/CommentRouter");
const requireLogin = require("./middleware/requireLogin");
//const CommentRouter = require("./routes/CommentRouter");

dbConnect();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: 'tungdc',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}))

app.use(express.json());

// Config đường dẫn tĩnh cho ảnh
app.use('/images', express.static('public/images'));

app.use("/admin", AuthRouter);
app.use("/api", RegisterRouter);
app.use("/api/commentsOfPhoto", requireLogin, CommentRouter);
app.use("/api/user", requireLogin, UserRouter);
app.use("/api/photo", requireLogin, PhotoRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
