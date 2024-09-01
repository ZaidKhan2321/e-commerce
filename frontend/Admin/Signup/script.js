const userName = document.getElementById('form1Example1') ;
const userEmail = document.getElementById('form2Example2') ;
const userPassword  = document.getElementById('form3Example3') ;
const userType = document.getElementById('form4example4') ;
const form = document.getElementById('formSignupX') ;

form.addEventListener('submit',async (event)=>{
    event.preventDefault() ;
    const formData = {
        userName: userName.value ,
        userEmail: userEmail.value ,
        userPassword: userPassword.value ,
        userType: userType.value ,
    }
    console.log("inside fn, formdata: ", formData) ;
    try{
        const response = await fetch('http://localhost:3000/api/admin/signup',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(formData)
        }) ;
        const message = await response.text() ;
        if(response.status == 201){
            window.location.href = '../Login/index.html' ;
        }else if(response.status == 200){
            alert(message) ;
            userName.value = "" ;
            userEmail.value = "" ;
            userPassword.value = "" ;
            userType.value = "" ;
       }else{
            alert(message) ;
       }
        
    }catch(err){
        console.log(err) ;
        alert("some error occurred" ) ;
    }
}) ;