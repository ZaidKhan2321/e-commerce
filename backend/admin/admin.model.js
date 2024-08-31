export default class AdminModel{
    id ;
    constructor(uname, umail, upass, utype){
        this.userName = uname ;
        this.userEmail = umail ;
        this.userPassword = upass ;
        this.userType = utype ;
    }
    // set(uname, uemail, upass, utype){
    //     const newUser = new AdminModel(uname, uemail, upass, utype) ;
    //     return newUser ;
    // }
}