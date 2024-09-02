import {body, validationResult} from 'express-validator' ;

const rules = [
    body('productImagePath').custom((value, {req})=>{
        if(!req.file){
            throw new Error('Image not found') ;
        }
        return true ;
    }) 
] ;

const fileValidator = async (req,res,next)=>{
    await Promise.all(rules.map((rule)=> rule.run(req))) ;
    
    var ValidationErrors = validationResult(req) ;
    if(!ValidationErrors.isEmpty()){
        return res.status(400).end(ValidationErrors.array()[0].msg) ;
    }
    next() ;
}

export default fileValidator ;
