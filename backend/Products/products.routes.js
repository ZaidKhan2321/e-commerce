import express from 'express' ;
import ProductController from './products.controller.js';
import uploadFile from '../Middlewares/multer.middleware.js';
import fileValidator from '../Middlewares/file.validation.middleware.js' ;
import {accessAuthVendor, accessAuthCustomer} from '../Middlewares/Access.auth.middleware.js' ;

const router = express.Router() ;
const productController = new ProductController() ;

router.post('/add', uploadFile.single('productImagePath'), fileValidator, accessAuthVendor, (req,res)=>{
    productController.add(req, res) ;
}) ;
router.put('/edit',uploadFile.single('productImagePath'), fileValidator, accessAuthVendor, (req,res)=>{
    productController.update(req, res) ;
}) ;
router.delete('/delete', accessAuthVendor, (req,res)=>{
    productController.delete(req, res) ;
}) ;
router.get('/cust/view', accessAuthCustomer, (req,res)=>{
    productController.getForCustomer(req, res) ;
}) ;
router.get('/vend/view', accessAuthVendor, (req,res)=>{
    productController.getForVendor(req, res) ;
}) ;

export default router ;