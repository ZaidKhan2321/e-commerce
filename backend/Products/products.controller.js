import { resolve } from "path";
import ProductModel from "./products.model.js";
import ProductRepository from "./products.repository.js";
import fs from 'fs' ;
import path from "path";
import { promisify } from "util";

const readdirec = promisify(fs.readdir) ;
const unlink = promisify(fs.unlink) ;

export default class ProductController{
    constructor(){
        this.productRepository = new ProductRepository() ;
    }
    async add(req, res){
        const {productName, productPrice, productDescription} = req.body ;
        const productImagePath = req.file.filename ;
        const productOwner = req.userId ;
        const newProduct = new ProductModel(productName, productPrice, productDescription, productImagePath, productOwner) ;
        const response = await this.productRepository.add(newProduct) ;
        return res.status(201).end("Product is added") ;
    }
    
    async update(req,res){
        const {pId, productName, productPrice, productDescription} = req.body ;
        const productImagePath = req.file.filename ;
        const productOwner = req.userId ;
        const newProduct = new ProductModel(productName, productPrice, productDescription, productImagePath, productOwner) ;
        const updatedProduct = await this.productRepository.update(pId, newProduct) ;
        return res.status(201).end("Product is updated") ;
    }
    
    async delete(req, res){
        const pId = req.body.pId ;
        const response = await this.productRepository.delete(pId) ;
        // Delete from assests
        try{
            const files = await readdirec('./assets/Product.Images/') ;
            for(const existingFile of files){
                // const [timeStampPart, existingOriginaName] = existingFile.split('-', 2) ;
                // const [timeStampPart2, originalName] = response[0].productImagePath.split('-',2) ;
                if(existingFile === response[0].productImagePath){
                    const existingFilePath = path.join('./assets/Product.Images/', existingFile) ;
                    await unlink(existingFilePath) ;
                }
            }
        }catch(err){
            console.log(err) ;
        }

        return res.status(200).end("Successfully deleted") ;
    }
    
    async getForCustomer(req, res){
        const response = await this.productRepository.CustomerView() ;
        return res.status(200).json(response) ;
    }

    async getForVendor(req, res){
        const userId = req.userId ;
        const response = await this.productRepository.VendorView(userId) ;
        return res.status(200).json(response) ;
    }
} ;