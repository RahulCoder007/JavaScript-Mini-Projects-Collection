document.addEventListener("DOMContentLoaded", () => {
  //always first create product structure
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 39.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  let cart = JSON.parse(localStorage.getItem("carts")) || [];
  console.log("cart", cart);

  let cartValue = 0;
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  renderCart();

  products.map((product) => {
    const prodDiv = document.createElement("div");
    prodDiv.classList.add("product");
    prodDiv.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <button data-id="${product.id}">Add To Cart</button>
    `;
    productList.appendChild(prodDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.getAttribute("data-id"));
      const addCartProd = products.find((p) => p.id === id);
      addToCart(addCartProd);
    }
  });

  function addToCart(prod) {
    cart.push(prod);
    localStorage.setItem("carts", JSON.stringify(cart));
    // console.log(cart);

    renderCart();
  }

  function renderCart() {
    console.log("ren", cart);
    if (cart.length > 0) {
      cartTotal.classList.remove("hidden");
      cartItems.innerHTML = ""; // basically its re-written as empy string || display:none could be done
      //   emptyCartMsg.innerText = "";
    } else {
      cartTotal.classList.add("hidden");
      cartItems.innerText = "Your cart is empty";
    }

    let priceTotal = 0;
    cartValue = cart.reduce((priceTotal, cartItem) => {
      const elementDiv = document.createElement("div");
      elementDiv.classList.add("rem-div");
      elementDiv.innerHTML = `
        <span>${cartItem.name} - $${cartItem.price}</span>
        <button data-id=${cartItem.id} class="remove-btn">Remove</button>
        `;
      cartItems.appendChild(elementDiv);
      elementDiv.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = cart.findIndex((item) => item.id === cartItem.id);
        console.log("idx", idx);
        if (idx != -1) {
          elementDiv.remove();
          cart.splice(idx, 1);
          //   console.log(cartItem);
          localStorage.setItem("carts", JSON.stringify(cart));
          renderCart();
        }
      });
      return priceTotal + cartItem.price;
    }, priceTotal);
    totalPrice.innerText = cartValue.toFixed(2);
  }

  checkoutBtn.addEventListener("click", () => {
    alert(`Total cart Value: ${cartValue}`);
    console.log("cartchevk", cart);
    if (cart.length > 0) cartItems.innerHTML = "";
    totalPrice.innerHTML = "";
    cartTotal.classList.add("hidden");
    localStorage.removeItem("carts");
    cart = [];
    renderCart();
  });
});
