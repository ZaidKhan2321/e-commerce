async function loadNavBar() {
    const navEl = await fetch('../../template/navigation/index.html') ;
    const navElData = await navEl.text() ;
    const navParentEl = document.getElementById('navBar') ;
    navParentEl.innerHTML = navElData ;
    const firstEl = document.getElementById('first') ;
    firstEl.innerText = 'Home' ;
    firstEl.setAttribute('href',"") ;
    const secondEl = document.getElementById('second') ;
    secondEl.innerText = 'Add more products' ;
    secondEl.setAttribute('href',"../Forms/index.html") ;
    const thirdEl = document.getElementById('third') ;
    thirdEl.innerText = 'Orders Available !!Need to be linked' ;
    thirdEl.setAttribute('href',"") ;
    const fourthEl = document.getElementById('fourth') ;
    fourthEl.innerText = 'Logout' ;
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
  
  
  
  
  
  
  async function showView() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/vend/view",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      const mainEl = document.getElementById("main-container");
      mainEl.innerText = '' ;
      const cardsEl = document.createElement("div");
      cardsEl.id = "cards-container";
      data.forEach((product) => {
        const cardEl = document.createElement("div");
        const name = document.createElement("div");
        const price = document.createElement("div");
        const desc = document.createElement("div");
        const imageCont = document.createElement("div");
        const image = document.createElement("img");
        const btnsEl = document.createElement('div') ;
        const editCartEl = document.createElement('div') ;
        const edit = document.createElement('button') ;
        const deleteCartEl = document.createElement('div') ;
        const delet = document.createElement('button') ;
  
  
        name.innerText = `${product.productName} `;
        price.innerText += `Rs.${product.productPrice} `;
        desc.innerText += `${product.productDescription} `;
        image.src = `../../../backend/assets/Product.Images/${product.productImagePath} ` ;
        image.alt = `image of ${product.productName}` ;
        edit.innerText = 'Edit' ;
        delet.innerText = 'Delete' ;
  
        cardEl.classList.add('card', 'm-3', 'p-2', 'd-flex','justify-content-center', 'align-items-center', 'card-custom') ;
        cardsEl.classList.add('d-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'm-2', 'p-2') ;  
        name.classList.add('text-secondary', 'font-weight-bolder', 'fs-3', 'mt-5') ;
        name.style.fontFamily = 'Roboto' ;
        price.classList.add('text-black-50', 'fs-6') ;
        price.style.fontFamily = 'Roboto' ;
        desc.classList.add('text-tertiary', 'text-wrap', 'fs-6', 'm-2') ;
        desc.style.fontFamily = 'Roboto' ;
        imageCont.className = 'imgCont' ;
        image.className = 'imgt' ;
        btnsEl.classList.add('d-flex') ;
        edit.classList.add('btn', 'btn-warning', 'm-1') ;
        delet.classList.add('btn', 'btn-danger', 'm-1') ;
        
        
        editCartEl.appendChild(edit) ;
        deleteCartEl.appendChild(delet) ;
        btnsEl.append(editCartEl, deleteCartEl) ;
        imageCont.appendChild(image) ;
        cardEl.append(name, price, imageCont, desc, btnsEl) ;  
        cardsEl.appendChild(cardEl);
  
        edit.addEventListener('click', async (event)=>{
          const confirmEdit = confirm("Do you actually want to edit this product") ;
          if(!confirmEdit){
            return showView() ;
          }
          cardsEl.innerHTML = '' ;
          async function loadForm(){
            const formElem = await fetch("../../template/forms/index.html");
            const formElemData = await formElem.text() ;
            cardsEl.innerHTML = formElemData ;
            const pNameEl = document.getElementById('form1Example1') ;
            const priceEl = document.getElementById('form2Example2') ;
            const descEl = document.getElementById('form3Example3') ;
            const imageEl = document.getElementById('form4Example4') ;
            const submitEl = document.getElementById('submitBtn') ;
            submitEl.innerText = 'Update Product' ;
            imageEl.style.display = 'none' ;

            pNameEl.value = `${product.productName}` ;
            priceEl.value = product.productPrice ;
            descEl.value = `${product.productDescription}` ;

            let newFileChosen = false ;
            const newFile = document.createElement('div') ;
            newFile.innerHTML = `<button data-mdb-ripple-init class="btn btn-warning btn-block mb-4">Upload new image</button>` ;
            imageEl.insertAdjacentElement('afterend', newFile) ;
            newFile.addEventListener('click', (event)=>{
              event.preventDefault() ;
              imageEl.click() ;
              newFile.style.display = 'none' ;
              imageEl.style.display = 'block' ;
            })
            
            const formEl = document.getElementById("form12");
            const cancelEl = document.createElement('div') ;
            cancelEl.innerHTML = `<button data-mdb-ripple-init  class="btn btn-danger btn-block mb-4">Cancel</button>` ;
            formEl.appendChild(cancelEl) ;
            cancelEl.addEventListener('click',(event)=>{
              event.preventDefault() ;
              return showView() ;
            }) ;



            try {
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
                formData.append('pId', product.id) ;
                const res = await fetch("http://localhost:3000/api/products/edit", {
                  method: "PUT",
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
          await loadForm() ;
          
        }) ;

        // DELETE PRODUCT
        delet.addEventListener('click', async (event)=>{
          const confirmDelete = confirm("Do you actually want to delete this product") ;
          if(!confirmDelete){
            return showView() ;
          }
          const res = await fetch('http://localhost:3000/api/products/delete',{
          method: "DELETE",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({pId: product.id}) 
        }) ;
        const resData = await res.text() ;
        // console.log(resData) ;
        showView() ;
        }) ;
  
      });
      mainEl.appendChild(cardsEl);
    } catch (err) {
      console.log(err);
      window.location.href = '../../Admin/Login/index.html' ;
      // alert("some error occurred");
    }
  }
  loadNavBar() ;
  showView();
  