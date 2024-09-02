async function loadNavBar() {
  const navEl = await fetch("../../template/navigation/index.html");
  const navElData = await navEl.text();
  const navParentEl = document.getElementById("navBar");
  navParentEl.innerHTML = navElData;
  const firstEl = document.getElementById("first");
  firstEl.innerText = "Home";
  firstEl.setAttribute("href", "");
  const secondEl = document.getElementById("second");
  secondEl.innerText = "Cart !!Need to be linked";
  secondEl.setAttribute("href", "");
  const thirdEl = document.getElementById("third");
  thirdEl.innerText = "Orders !!Need to be linked";
  thirdEl.setAttribute("href", "");
  const fourthEl = document.getElementById("fourth");
  fourthEl.innerText = "Logout";
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
      "http://localhost:3000/api/products/cust/view",
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
    const cardsEl = document.createElement("div");
    cardsEl.id = "cards-container";
    data.forEach((product) => {
      const cardEl = document.createElement("div");
      const name = document.createElement("div");
      const price = document.createElement("div");
      const desc = document.createElement("div");
      const imageCont = document.createElement("div");
      const image = document.createElement("img");
      const addCartEl = document.createElement("div");
      const add = document.createElement("button");

      name.innerText = `${product.productName} `;
      price.innerText += `Rs.${product.productPrice} `;
      desc.innerText += `${product.productDescription} `;
      image.src = `../../../backend/assets/Product.Images/${product.productImagePath} `;
      image.alt = `image of ${product.productName}`;
      add.innerText = "Add to Cart";

      cardEl.classList.add(
        "card",
        "m-3",
        "p-2",
        "d-flex",
        "justify-content-center",
        "align-items-center",
        "card-custom"
      );
      cardsEl.classList.add(
        "d-flex",
        "flex-column",
        "justify-content-center",
        "align-items-center",
        "m-2",
        "p-2"
      );
      name.classList.add(
        "text-secondary",
        "font-weight-bolder",
        "fs-3",
        "mt-5"
      );
      name.style.fontFamily = "Roboto";
      price.classList.add("text-black-50", "fs-6");
      price.style.fontFamily = "Roboto";
      desc.classList.add("text-tertiary", "text-wrap", "fs-6", "m-2");
      desc.style.fontFamily = "Roboto";
      imageCont.className = "imgCont";
      image.className = "imgt";
      add.classList.add("btn", "btn-success", "mb-4", "p-1");

      addCartEl.appendChild(add);
      imageCont.appendChild(image);
      cardEl.append(name, price, imageCont, desc, addCartEl);
      cardsEl.appendChild(cardEl);

      add.addEventListener("click", (event) => {
        // Need to be implemented
      });
    });
    mainEl.appendChild(cardsEl);
  } catch (err) {
    console.log(err);
    window.location.href = "../../Admin/Login/index.html";
    // alert("some error occurred");
  }
}
loadNavBar();
showView();
