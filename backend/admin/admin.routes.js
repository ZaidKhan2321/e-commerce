import express from 'express' ;
import AdminController from './admin.controller.js';
import validator from '../Middlewares/Signup.validator.middleware.js';

const adminController = new AdminController() ;
const router = express.Router() ;
router.post('/signup', validator, (req,res)=>{
    adminController.signUp(req,res) ;
}) ;
router.post('/login', (req,res)=>{
    adminController.login(req,res) ;
})

router.get('/logout', (req,res)=>{
    adminController.logOut(req, res) ;
}) ;


export default router ;