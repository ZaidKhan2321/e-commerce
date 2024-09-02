async function loadNavBar() {
  const navEl = await fetch("../../template/navigation/index.html");
  const navElData = await navEl.text();
  const navParentEl = document.getElementById("navBar");
  navParentEl.innerHTML = navElData;
  const firstEl = document.getElementById("first");
  firstEl.innerText = "Home";
  firstEl.setAttribute("href", "../Vendor/index.html");
  const secondEl = document.getElementById("second");
  secondEl.innerText = "Add more products";
  secondEl.setAttribute("href", "");
  const thirdEl = document.getElementById("third");
  thirdEl.innerText = "Orders Available !!Need to be linked";
  thirdEl.setAttribute("href", "");
  const fourthEl = document.getElementById("fourth");
  fourthEl.innerText = "Logout";
  // LOGOUT
  fourthEl.addEventListener("click", async (event) => {
    const res = await fetch("http://localhost:3000/api/admin/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const resData = await res.text();
    console.log(resData);
    showView();
  });
}
loadNavBar();


async function loadForm(){
  const formsEl = document.getElementById('forms') ;
  const formElem = await fetch("../../template/forms/index.html");
  const formElemData = await formElem.text() ;
  formsEl.innerHTML = formElemData ;



  async function viewForm(){
    try {
      const formEl = document.getElementById("form12");
      formEl.addEventListener("submit", async (event) => {
        event.preventDefault();
        const productNameEl = document.getElementById("form1Example1");
        const productPriceEl = document.getElementById("form2Example2");
        const productDescriptionEl = document.getElementById("form3Example3");
        const productImagePathEl = document.getElementById("form4Example4");
        const pname = productNameEl.value;
        const price = productPriceEl.value;
        const desc = productDescriptionEl.value;
        const productImagePath = productImagePathEl.files[0];
    
        const formData = new FormData();
        formData.append("productName", `${pname}`);
        formData.append("productPrice", price);
        formData.append("productDescription", `${desc}`);
        formData.append("productImagePath", productImagePath);
        const res = await fetch("http://localhost:3000/api/products/add", {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        if(res.status == 401){
          return window.location.href = "../../Admin/Login/index.html" ;
        }
        const resData = await res.text();
        alert(resData) ;
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  viewForm() ;




}

loadForm() ;


