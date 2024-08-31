import jwt from 'jsonwebtoken' ;

const auth = (req, res, next)=>{
    const token = req.session.token ;
    if(!token){
        return res.status(401).redirect('/api/admin/signup') ;
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET) ;
        req.userId = payload.userId ;
        req.email = payload.email ;
    }catch(err){
        return res.status(401).redirect('/api/admin/signup') ;
    }
    next() ;
} ;

export default auth ;