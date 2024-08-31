import '../backend/config/env.js' ;

import express from 'express' ;
import AdminRouter from './admin/admin.routes.js' ;
import bodyParser from 'body-parser';
import session from 'express-session';
import auth from './Middlewares/jwt.auth.middleware.js';



const server = express() ;
server.use(express.json()) ;
server.use(bodyParser.json()) ;
server.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false},
    })
) ;
server.use('/api/admin', AdminRouter) ;
server.get('/api/products', auth, (req,res)=>{
    res.send("products section") ;
}) ;

export default server ;