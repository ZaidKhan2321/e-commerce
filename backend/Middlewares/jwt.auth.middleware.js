import jwt from 'jsonwebtoken' ;

const auth = (req, res, next)=>{
    const token = req.session.token ;
    if(!token){
        return res.status(401).end('User does not exist') ;
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET) ;
        req.userId = payload.userId ;
        req.email = payload.email ;
        req.type = payload.userType ;
    }catch(err){
        return res.status(401).end('Unauthorized access') ;
    }
    next() ;
} ;

export default auth ;