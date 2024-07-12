// lên đầu trang
let mybutton = document.getElementById("BackToTopBtn");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let cart = {
    items: 0,
    total: 0.0,
    products: [],
  };

  const cartDisplay = document.querySelector("#item");
  const cartItemsList = document.getElementById("cartItemsList");
  const cartTotal = document.getElementById("cartTotal");
  const cartModal = document.getElementById("cartModal");
  const closeModal = document.getElementsByClassName("close")[0];
  const cartIcon = document.getElementById("cartIcon");

  function updateCartDisplay() {
    cartDisplay.innerHTML = `${cart.items} Items - (${formatCurrency(
      cart.total
    )})`;
  }

  function updateCartModal() {
    cartItemsList.innerHTML = "";
    cart.products.forEach((product, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${product.name} - ${formatCurrency(
        product.price
      )}`;
      listItem.appendChild(createRemoveButton(index));
      cartItemsList.appendChild(listItem);
    });
    cartTotal.textContent = formatCurrency(cart.total);
  }

  function formatCurrency(amount) {
    return (
      amount
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .replace(".00", "") + " VND"
    );
  }
  function createRemoveButton(index) {
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn"); // Add class for styling
    removeButton.onclick = function () {
      removeFromCart(index);
    };
    return removeButton;
  }
  // Event listener for remove buttons inside the cart modal
  document.querySelectorAll(".cart-item .remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = Array.from(button.parentNode.parentNode.children).indexOf(
        button.parentNode
      );
      removeFromCart(index);
    });
  });

  function removeFromCart(index) {
    const product = cart.products[index];
    cart.items -= 1;
    cart.total -= product.price;
    cart.products.splice(index, 1);
    updateCartDisplay();
    updateCartModal();
  }

  function addToCart(product) {
    cart.items += 1;
    cart.total += product.price;
    cart.products.push(product);
    updateCartDisplay();
  }

  document.querySelectorAll(".btn-book").forEach((button, index) => {
    button.addEventListener("click", function () {
      const courseItem = button.closest(".course-item");
      const productName = courseItem.querySelector(".title a").textContent;
      const productPrice = parseFloat(
        courseItem
          .querySelector(".price")
          .textContent.replace(" VND", "")
          .replace(/\./g, "")
          .replace(",", ".")
      );

      const product = {
        name: productName,
        price: productPrice,
      };
      addToCart(product);
    });
  });

  cartIcon.addEventListener("click", function () {
    cartModal.style.display = "block";
    updateCartModal();
  });

  closeModal.onclick = function () {
    cartModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == cartModal) {
      cartModal.style.display = "none";
    }
  };
});