document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTableBody = document.querySelector("#cart-table tbody");
    const subtotalDisplay = document.getElementById("subtotal");
    const discountDisplay = document.getElementById("discount");
    const taxDisplay = document.getElementById("tax");
    const grandTotalDisplay = document.getElementById("grand-total");
  
    // Function to render cart items and overall summary
    function renderCart() {
      cartTableBody.innerHTML = "";
      let overallSubTotal = 0;
      cart.forEach((item, index) => {
        const itemSubTotal = item.price * item.quantity;
        overallSubTotal += itemSubTotal;
        cartTableBody.innerHTML += `
          <tr data-index="${index}">
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
              <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}">
            </td>
            <td>$${itemSubTotal.toFixed(2)}</td>
            <td><button class="remove-item" data-index="${index}">Remove</button></td>
          </tr>
        `;
      });
  
      // Calculate overall discount and tax
      const discount = overallSubTotal * 0.10; // 10% discount
      const tax = overallSubTotal * 0.06; // 6% tax
      const grandTotal = overallSubTotal - discount + tax;
  
      // Update the summary section
      subtotalDisplay.textContent = overallSubTotal.toFixed(2);
      discountDisplay.textContent = discount.toFixed(2);
      taxDisplay.textContent = tax.toFixed(2);
      grandTotalDisplay.textContent = grandTotal.toFixed(2);
  
      // Update localStorage with the current cart state
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    renderCart();
  
    // Update quantity
    document.querySelector("#cart-table").addEventListener("change", (e) => {
      if (e.target.classList.contains("quantity-input")) {
        const index = e.target.getAttribute("data-index");
        const newQuantity = parseInt(e.target.value);
        if (newQuantity < 1) {
          alert("Quantity must be at least 1");
          e.target.value = cart[index].quantity;
          return;
        }
        cart[index].quantity = newQuantity;
        renderCart();
      }
    });
  
    // Remove individual item
    document.querySelector("#cart-table").addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        renderCart();
      }
    });
  
    // Clear All button
    document.getElementById("clear-all").addEventListener("click", () => {
      cart = [];
      renderCart();
      alert("All items have been removed from the cart.");
    });
  
    // Check Out button - redirect to invoice page (or a dedicated checkout page)
    document.getElementById("checkout").addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.href = "checkout.html";
    });
  
    // Close button - go back to products page
    document.getElementById("close-cart").addEventListener("click", () => {
      window.location.href = "product.html";
    });
  });
  