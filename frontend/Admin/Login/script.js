const userEmail = document.getElementById('typeEmailX') ;
const userPassword  = document.getElementById('typePasswordX') ;
const form = document.getElementById('formLoginX') ;

form.addEventListener('submit',async (event)=>{
    event.preventDefault() ;
    const formData = {
        userEmail: userEmail.value ,
        userPassword: userPassword.value ,
    }
    console.log("inside fn, formdata: ", formData) ;
    try{
        const response = await fetch('http://localhost:3000/api/admin/login',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(formData)
        }) ;
        console.log(response) ;
        if(response.status == 400){
            const message = await response.text() ;
            alert(message) ;
            return ;
        }
        const message = await response.json() ;
        window.location.href = '../Signup/index.html' ;// need to change it 
    }catch(err){
        console.log(err) ;
        alert("some error occurred" ) ;
    }
}) ;