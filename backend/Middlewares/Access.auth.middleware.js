export const accessAuthVendor = (req, res, next)=>{
    if(req.type == 'Vendor'){
        return next() ;
    }
    return res.end('/api/admin/signup') ;
} ;

export const accessAuthCustomer = (req, res, next)=>{
    if(req.type == 'Customer'){
        return next() ;
    }
    return res.end('/api/admin/signup') ;
}
