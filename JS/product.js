document.addEventListener("DOMContentLoaded", () => {
    // Define an array of product objects
    const allProducts = [
      {
        name: "Qaed Al Fursan",
        price: 13.49,
        description: "A luxurious fragrance with rich aroma.",
        image: "../assets/products/al-fursan.png"
      },
      {
        name: "Al Haramain Amber Oud Gold Edition",
        price: 44.99,
        description: "A sophisticated blend with amber and oud.",
        image: "../assets/products/amber-oud.png"
      },
      {
        name: "Angham",
        price: 36.99,
        description: "A melodious scent with a touch of elegance.",
        image: "../assets/products/angham.png"
      },
      {
        name: "Al Haramain Aqua Dubai",
        price: 49.99,
        description: "Fresh aquatic fragrance with vibrant notes.",
        image: "../assets/products/aqua-dubai.png"
      },
      {
        name: "Bade'e Al Oud Amethyst",
        price: 22.99,
        description: "A unique fragrance blending oud and modern notes.",
        image: "../assets/products/badee-al-oud.png"
      },
      {
        name: "Club De Nuit Woman",
        price: 21.99,
        description: "An alluring scent for the modern woman.",
        image: "../assets/products/club-de-nuit-woman.png"
      },
      {
        name: "Emeer",
        price: 32.99,
        description: "A fragrance that exudes confidence and style.",
        image: "../assets/products/emeer.png"
      },
      {
        name: "Lattafa Fakhar",
        price: 23.99,
        description: "A proud scent with a blend of rich notes.",
        image: "../assets/products/fakhar.png"
      },
      {
        name: "Jimmy Choo Man Ice",
        price: 29.99,
        description: "A cool and refreshing scent for men.",
        image: "../assets/products/jimmy-choo.png"
      }
    ];
  
    // Save the updated product list in localStorage as AllProducts
    localStorage.setItem("AllProducts", JSON.stringify(allProducts));
  
    // Retrieve product container
    const productContainer = document.querySelector(".product-container");
  
    // Function to create product card HTML
    function createProductCard(product) {
      return `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" class="product-img">
          <p class="product-name">${product.name}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <p class="product-description">${product.description}</p>
          <button class="add-to-cart" data-name="${product.name}">Add to Cart</button>
        </div>
      `;
    }
  
    // Render product cards dynamically
    allProducts.forEach(product => {
      productContainer.innerHTML += createProductCard(product);
    });
  
    // Retrieve or initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Add event listener to Add to Cart buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", () => {
        const productName = button.getAttribute("data-name");
        const product = allProducts.find(p => p.name === productName);
        // Check if product already exists in the cart; if so, increment quantity.
        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          // Add product with an initial quantity of 1
          cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
      });
    });
  });
  