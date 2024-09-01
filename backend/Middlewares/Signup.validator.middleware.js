import {body, validationResult} from 'express-validator' ;

const rules = [
    body('userName').notEmpty().withMessage("Name is required") ,
    body('userEmail').isEmail().withMessage("Not a valid Email id") ,
    body('userPassword').isStrongPassword().withMessage("Password is weak") 
] ;

const validator = async (req,res,next)=>{
    await Promise.all(rules.map((rule)=> rule.run(req))) ;
    
    var ValidationErrors = validationResult(req) ;
    if(!ValidationErrors.isEmpty()){
        return res.status(400).end(ValidationErrors.array()[0].msg) ;
    }
    next() ;
}

export default validator ;
