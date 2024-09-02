import "../backend/config/env.js";

import express from "express";
import AdminRouter from "./admin/admin.routes.js";
import ProductRouter from "./Products/products.routes.js";
import bodyParser from "body-parser";
import session from "express-session";
import auth from "./Middlewares/jwt.auth.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: "http://localhost:5500",
  credentials: true,
  allowedHeaders: [
    "Authorization",
    "Content-type",
    "Accept",
    "Origin",
    "X-Requested-With",
  ],
};
const server = express();
server.use(cors(corsOptions));
server.use(cookieParser()) ;
server.use(express.json());
server.use(bodyParser.json());
server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false , maxAge: 1*24*60*60*1000},
  })
);


server.use("/api/admin", AdminRouter);
server.use("/api/products", auth, ProductRouter);

export default server;
