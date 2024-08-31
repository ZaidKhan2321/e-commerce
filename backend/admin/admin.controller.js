import { response } from "express";
import AdminModel from "./admin.model.js";
import AdminRepository from "./admin.repository.js";
import bcrypt from 'bcrypt' ;
import jwt from 'jsonwebtoken' ;

export default class AdminController{
    constructor(){
        this.adminRepository = new AdminRepository() ;
    }
    async signUp(req,res){
        const {userName, userEmail, userPassword, userType} = req.body ;
        const hashedPassword = await bcrypt.hash(userPassword, 12) ;
        const newUser = new AdminModel(userName, userEmail, hashedPassword, userType) ;
        const msg = await this.adminRepository.signup(newUser) ;
        res.status(201).end(msg) ;
    }
    async login(req,res){
        const {userEmail: email, userPassword: pass} = req.body ;
        const result = await new Promise((response, rej)=>{
            const user = this.adminRepository.login(email) ;
            response(user) ;
        }) ;
        if(result.length == 0){
            res.status(400).end("User does not exists!!") ;
            return ;
        }
        const checkPass = await bcrypt.compare(pass, result[0].userPassword) ;
        if(!checkPass){
            res.status(400).send("Unauthorized access") ;
            return ;
        }
        // Authorized Person
        const token = jwt.sign(
            {userId: result[0].id, email: result[0].userEmail},
            process.env.JWT_SECRET,
            {expiresIn: '1hr'}
        )
        req.session.token = token ;
        res.status(200).send(result) ;
    }
}