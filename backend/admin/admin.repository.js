import connection from "../config/mysql.js";


export default class AdminRepository{
    async signup(newUser){

        const result = await new Promise((response, rej)=>{
            connection.query(` select * from users_db where userEmail = '${newUser.userEmail}' `, (err, results)=>{
                if(err){
                    console.log(err) ;
                }
                response(results) ;
            }) ;
        }) ;
        if(result.length > 0){
            return "User already exists!!!" ;
        }

        connection.query(`insert into users_db(userName, userEmail, userPassword, userType, time_created) values('${newUser.userName}', '${newUser.userEmail}', '${newUser.userPassword}', '${newUser.userType}', '${new Date().toString()}') `, (err, results)=>{
            if(err){
                console.log("err: ",err) ;
            }
        }) ;
        return "SignUp successfully done" ;
    }
    async login(email){
        const result = await new Promise((res, rej)=>{
            connection.query(` select * from users_db where userEmail = '${email}' `, (err, results)=>{
                if(err){
                    console.log(err) ;
                }
                res(results) ;
            }) ;
        }) ;
        return result ;
    }
}