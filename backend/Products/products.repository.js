import connection from "../config/mysql.js";

export default class ProductRepository{

    async add(newProduct){
        const result = await new Promise((response, rej)=>{
            connection.query(`insert into products_db(productName, productPrice, productDescription, productImagePath, productOwner, created_date) values('${newProduct.productName}', ${newProduct.productPrice}, '${newProduct.productDescription}', '${newProduct.productImagePath}', '${newProduct.productOwner}', '${new Date().toString()}')`, (err, results)=>{
                if(err){
                    return console.log(err) ;
                }
                response(results) ;
            }) ;
        }) ;
        newProduct.id = result.insertId ;
        return newProduct ;
    }
    
    async update(pId, newProduct){
        const result = await new Promise((response, rej)=>{
            connection.query(` update products_db 
                                set productName = '${newProduct.productName}',
                                    productPrice = ${newProduct.productPrice} ,
                                    productDescription = '${newProduct.productDescription}' ,
                                    productImagePath = '${newProduct.productImagePath}' ,
                                    productOwner = '${newProduct.productOwner}' ,
                                    created_date = '${new Date().toString()}' 
                                where id = ${pId}`, (err, results)=>{
                if(err){
                    return console.log(err) ;
                }
                response(results) ;
            }) ;
        }) ;
        newProduct.id = pId ;
        return newProduct ;
    }
    
    async delete(pId){
        const prDeleted = await new Promise((response, rej)=>{
            connection.query(`select * from products_db where id = ${pId}`, (err, results)=>{
                if(err){
                    return console.log(err) ;
                }
                response(results) ;
            }) ;
        }) ;
        const result = await new Promise((response, rej)=>{
            connection.query(`delete from products_db where id = ${pId}`, (err, results)=>{
                if(err){
                    return console.log(err) ;
                }
                response(results) ;
            }) ;
        }) ;
        return prDeleted ;
    }

    async CustomerView(){
        const result = await new Promise((response, rej)=>{
            connection.query(` select * from products_db `, (err, results)=>{
                if(err){
                    return console.log(err) ;
                }
                response(results) ;
            }) ;
        }) ;
        return result ;
    }

    async VendorView(userId){
        const result = await new Promise((response, rej)=>{
            connection.query(` select * from products_db where productOwner = ${userId} `, (err, results)=>{
                if(err){
                    return console.log(err) ;
                }
                response(results) ;
            }) ;
        }) ;
        return result ;
    }

}