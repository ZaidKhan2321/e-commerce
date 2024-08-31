import server from "../backend/index.js";
import connection from "./config/mysql.js";

server.listen(3000, ()=>{
    connection.connect((err)=>{
        if(err){
            console.log(err) ;
        }else{
            console.log("MySQL database is connected successfully") ;
        }
    })
    console.log("Server is listening at port 3000") ;
})