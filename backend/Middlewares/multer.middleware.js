import multer from "multer";
import fs, { readdir } from 'fs' ;
import path from "path";
import { promisify } from "util";

const readdirec = promisify(fs.readdir) ;
const unlink = promisify(fs.unlink) ;

const storageConfig = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './assets/Product.Images/') ;
    },
    filename: async (req, file, cb)=>{
        const uniqueName = Date.now() + "-" + file.originalname ;
        // Check duplicates
        try{
            const files = await readdirec('./assets/Product.Images/') ;
            for(const existingFile of files){
                const [timeStampPart, existingOriginaName] = existingFile.split('-', 2) ;
                if(existingOriginaName === file.originalname){
                    const existingFilePath = path.join('./assets/Product.Images/', existingFile) ;
                    await unlink(existingFilePath) ;
                }
            }
        }catch(err){
            console.log(err) ;
        }
        // Add new file
        cb(null, uniqueName) ;
    }
}) ;

const uploadFile = multer({
    storage: storageConfig ,
}) ;

export default uploadFile ;