import { response } from "express";
import AdminModel from "./admin.model.js";
import AdminRepository from "./admin.repository.js";
import bcrypt from 'bcrypt' ;
import jwt from 'jsonwebtoken' ;
import session from "express-session";

export default class AdminController{
    constructor(){
        this.adminRepository = new AdminRepository() ;
    }
    async signUp(req,res){
        const {userName, userEmail, userPassword, userType} = req.body ;
        const hashedPassword = await bcrypt.hash(userPassword, 12) ;
        const newUser = new AdminModel(userName, userEmail, hashedPassword, userType) ;
        const msg = await this.adminRepository.signup(newUser) ;
        if(msg.userCreated){
            return res.status(201).end(msg.message) ;
        }else{
            return res.status(200).end(msg.message) ;
        }
    }
    async login(req,res){
        const {userEmail: email, userPassword: pass} = req.body ;
        const result = await new Promise((response, rej)=>{
            const user = this.adminRepository.login(email) ;
            response(user) ;
        }) ;
        if(result.length == 0){
            res.status(401).end("User does not exists!!") ;
            return ;
        }
        const checkPass = await bcrypt.compare(pass, result[0].userPassword) ;
        if(!checkPass){
            res.status(401).send("Unauthorized access") ;
            return ;
        }
        // Authorized Person
        const token = jwt.sign(
            {userId: result[0].id, email: result[0].userEmail, userType: result[0].userType},
            process.env.JWT_SECRET,
            {expiresIn: '1hr'}
        )
        req.session.token = token ;
        res.status(200).send(result[0]) ;
    }
    async logOut(req, res){
        await req.session.destroy((err)=>{
            if(err){
                console.log(err) ;
                return res.status(400).end("Logout unseccessful") ;
            }else{
                 return res.status(200).end("Logout Successfully") ;
            }
        })
    }
}