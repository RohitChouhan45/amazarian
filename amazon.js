const products = [
  {
    name: "NextGen SmartWatch",
    price: 299.99,
    rating: 5,
    reviews: 2451,
    category: "Electronics",
    description:
      "Experience the future of wearable technology with our most advanced smartwatch yet. Features include health monitoring, voice control, and seamless integration with your digital life.",
    specs: ["5G connectivity", "7-day battery life", "Water resistant", "Heart rate monitor"],
  },
]
const categories = ["Electronics", "Home & Garden", "Fashion", "Sports"]
const adjectives = ["Smart", "Premium", "Ultra", "Pro", "Elite", "Advanced", "Digital", "Connected"]
const nouns = ["Device", "System", "Hub", "Controller", "Assistant", "Monitor", "Tracker", "Console"]
const features = [
  "AI-powered technology",
  "Smart home integration",
  "Voice control",
  "Touch interface",
  "Wireless connectivity",
  "Energy efficient",
  "Premium design",
  "Advanced sensors",
]
const ads = [
  {
    text: "Checkout my LinkedIn",
    link: "https://www.linkedin.com/in/rohit-chouhan-391739254/",
  },
  {
    text: "checkout my Github",
    link: "https://github.com/RohitChouhan45",
  },
]
const orderHistory = []
for (let i = 0; i < 92; i++) {
  const randomCategory = categories[Math.floor(Math.random() * categories.length)]
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  const randomSpecs = []
  for (let j = 0; j < 4; j++) {
    randomSpecs.push(features[Math.floor(Math.random() * features.length)])
  }
  products.push({
    name: `${randomAdj} ${randomNoun}`,
    price: Math.round(Math.random() * 900 + 99.99),
    rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
    reviews: Math.floor(Math.random() * 5000),
    category: randomCategory,
    description: `Experience the next generation of ${randomCategory.toLowerCase()} with our innovative ${randomAdj.toLowerCase()} ${randomNoun.toLowerCase()}. Designed for maximum performance and user satisfaction.`,
    specs: randomSpecs,
  })
}
let currentPage = 1
const productsPerPage = 20

function loadMoreProducts() {
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const newProducts = products.slice(startIndex, endIndex)
  renderProducts(newProducts, true)
  currentPage++
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadMoreProducts()
  }
})

function renderProducts(productsToRender = products, append = false) {
  const productGrid = document.getElementById("productGrid")
  if (!append) {
    productGrid.innerHTML = ""
  }
  productsToRender.forEach((product, index) => {
    const stars = "⭐".repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? "½" : "")
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
      <div class="product-image">${product.name}</div>
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>${stars} (${product.reviews.toLocaleString()})</p>
      <button class="buy-btn">Buy Now</button>
    `
    productCard.addEventListener("click", (e) => {
      if (!e.target.classList.contains("buy-btn") && !e.target.classList.contains("wishlist-btn")) {
        showProductDetails(product)
      }
    })
    productGrid.appendChild(productCard)
    if ((index + 1) % 8 === 0) {
      const randomAd = ads[Math.floor(Math.random() * ads.length)]
      const adBanner = document.createElement("a")
      adBanner.href = randomAd.link
      adBanner.className = "ad-banner"
      adBanner.style.gridColumn = "1 / -1"
      adBanner.textContent = randomAd.text
      productGrid.appendChild(adBanner)
    }
  })
  document.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", handleBuyClick)
  })
}
function showProductDetails(product) {
  const modal = document.getElementById("productModal")
  const modalContent = document.getElementById("modalContent")
  const stars = "⭐".repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? "½" : "")
  modalContent.innerHTML = `
    <div class="modal-image">${product.name}</div>
    <h2>${product.name}</h2>
    <div class="product-details">
      <p><strong>Price:</strong> ₹${product.price}</p>
      <p><strong>Rating:</strong> ${stars} (${product.reviews.toLocaleString()} reviews)</p>
      <p><strong>Category:</strong> ${product.category}</p>
    </div>
    <div class="product-description">
      <h3>Description</h3>
      <p>${product.description}</p>
    </div>
    <div class="product-specs">
      <h3>Features</h3>
      <ul>
        ${product.specs.map((spec) => `<li>${spec}</li>`).join("")}
      </ul>
    </div>
    <button class="buy-btn">Add to Cart</button>
    <div id="recommendations">
    </div>
  `
  showRecommendations(product)
  document.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", handleBuyClick)
  })
  modal.style.display = "flex"
  gsap.from(modal.querySelector(".modal-content"), {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
  })
}
document.querySelector(".close-modal").addEventListener("click", () => {
  const modal = document.getElementById("productModal")
  gsap.to(modal.querySelector(".modal-content"), {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      modal.style.display = "none"
      modal.querySelector(".modal-content").style.opacity = 1
      modal.querySelector(".modal-content").style.scale = 1
    },
  })
})
document.getElementById("productModal").addEventListener("click", (e) => {
  if (e.target.id === "productModal") {
    document.querySelector(".close-modal").click()
  }
})
function handleBuyClick(e) {
  e.stopPropagation()
  gsap.to(this, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  })
  const cartCount = document.querySelector(".cart-count")
  gsap.to(cartCount, {
    scale: 1.2,
    duration: 0.2,
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      cartCount.textContent = Number.parseInt(cartCount.textContent) + 1
    },
  })
  const productCard = this.closest(".product-card")
  const productName = productCard.querySelector("h3").textContent
  const productPrice = Number.parseFloat(productCard.querySelector("p").textContent.replace("₹", ""))
  cartItems.push({
    name: productName,
    price: productPrice,
  })
}
const searchInput = document.querySelector(".search-bar input")
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase()
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm))
  renderProducts(filteredProducts)
})
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.textContent
    const filteredProducts = category === "All" ? products : products.filter((product) => product.category === category)
    renderProducts(filteredProducts)
  })
})
renderProducts()
searchInput.addEventListener("focus", () => {
  gsap.to(searchInput, {
    scale: 1.02,
    duration: 0.3,
    ease: "power2.out",
  })
})
searchInput.addEventListener("blur", () => {
  gsap.to(searchInput, {
    scale: 1,
    duration: 0.3,
    ease: "power2.in",
  })
})
const cartItems = []
function showCart() {
  const modal = document.getElementById("cartModal")
  const cartItemsContainer = document.getElementById("cartItems")
  const cartTotalElement = document.getElementById("cartTotal")
  cartItemsContainer.innerHTML = ""
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>"
    cartTotalElement.textContent = "0"
    modal.style.display = "flex"
    return
  }
  let total = 0
  cartItems.forEach((item, index) => {
    total += item.price
    const itemElement = document.createElement("div")
    itemElement.className = "cart-item"
    itemElement.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.name}</h4>
      </div>
      <div class="cart-item-price">₹${item.price}</div>
      <button class="remove-item" >&times;</button>
    `
    cartItemsContainer.appendChild(itemElement)
  })
  cartTotalElement.textContent = "₹" + total.toFixed(2)
  modal.style.display = "flex"
  gsap.from(modal.querySelector(".modal-content"), {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
  })
}
document.querySelector(".header svg").addEventListener("click", showCart)
document.getElementById("cartItems").addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const index = Number.parseInt(e.target.dataset.index)
    cartItems.splice(index, 1)
    document.querySelector(".cart-count").textContent = cartItems.length
    showCart()
  }
})
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty!")
    return
  }
  const deliveryTime = Math.floor(Math.random() * 3) + 1
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)
  alert(
    `Thank you for your order of ₹${total.toFixed(2)}!\n\nYour items are on their way to your house and will arrive in ${deliveryTime} day${deliveryTime > 1 ? "s" : ""}!`,
  )
  const order = {
    items: [...cartItems],
    total: total,
    date: new Date(),
    deliveryTime: deliveryTime,
  }
  orderHistory.push(order)
  cartItems.length = 0
  document.querySelector(".cart-count").textContent = "0"
  const modal = document.getElementById("cartModal")
  gsap.to(modal.querySelector(".modal-content"), {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      modal.style.display = "none"
      modal.querySelector(".modal-content").style.opacity = 1
      modal.querySelector(".modal-content").style.scale = 1
    },
  })
})
document.getElementById("cartModal").addEventListener("click", (e) => {
  if (e.target.id === "cartModal") {
    const modal = document.getElementById("cartModal")
    gsap.to(modal.querySelector(".modal-content"), {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        modal.style.display = "none"
        modal.querySelector(".modal-content").style.opacity = 1
        modal.querySelector(".modal-content").style.scale = 1
      },
    })
  }
})
document.querySelector(".header svg").style.cursor = "pointer"
function showOrderHistory() {
  const modal = document.getElementById("historyModal")
  const historyContainer = document.getElementById("orderHistory")
  historyContainer.innerHTML = ""
  if (orderHistory.length === 0) {
    historyContainer.innerHTML = "<p>No order history available</p>"
    modal.style.display = "flex"
    return
  }
  orderHistory.forEach((order) => {
    const orderElement = document.createElement("div")
    orderElement.className = "order-history-item"
    orderElement.innerHTML = `
      <h4>Order from ${order.date.toLocaleDateString()}</h4>
      <div class="order-details">
        <p>Items:</p>
        <ul>
          ${order.items.map((item) => `<li>${item.name} - ₹${item.price}</li>`).join("")}
        </ul>
        <p>Total: ₹${order.total.toFixed(2)}</p>
        <p>Delivery Time: ${order.deliveryTime} day${order.deliveryTime > 1 ? "s" : ""}</p>
      </div>
    `
    historyContainer.appendChild(orderElement)
  })
  modal.style.display = "flex"
  gsap.from(modal.querySelector(".modal-content"), {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
  })
}
document.querySelector(".history-btn").addEventListener("click", showOrderHistory)
document.getElementById("historyModal").addEventListener("click", (e) => {
  if (e.target.id === "historyModal") {
    const modal = document.getElementById("historyModal")
    gsap.to(modal.querySelector(".modal-content"), {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        modal.style.display = "none"
        modal.querySelector(".modal-content").style.opacity = 1
        modal.querySelector(".modal-content").style.scale = 1
      },
    })
  }
})
const menuIcon = document.querySelector(".menu-icon")
const mobileNav = document.querySelector(".mobile-nav")

menuIcon.addEventListener("click", () => {
  mobileNav.style.display = mobileNav.style.display === "block" ? "none" : "block"
})

const wishlist = []

function addToWishlist(product) {
  if (!wishlist.some((item) => item.name === product.name)) {
    wishlist.push(product)
    updateWishlistUI()
  }
}

function updateWishlistUI() {
  const wishlistCount = document.querySelector(".wishlist-count")
  wishlistCount.textContent = wishlist.length
}

function rateProduct(productName, rating) {
  const product = products.find((p) => p.name === productName)
  if (product) {
    product.rating = (product.rating * product.reviews + rating) / (product.reviews + 1)
    product.reviews++
    updateProductUI(product)
  }
}

function updateProductUI(product) {
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card) => {
    if (card.querySelector("h3").textContent === product.name) {
      const stars = "⭐".repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? "½" : "")
      card.querySelector("p:nth-child(3)").textContent = `${stars} (${product.reviews.toLocaleString()})`
    }
  })
  const modal = document.getElementById("productModal")
  if (modal.style.display === "flex" && modal.querySelector("h2").textContent === product.name) {
    const stars = "⭐".repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? "½" : "")
    modal.querySelector(".product-details p:nth-child(2)").textContent =
      `<strong>Rating:</strong> ${stars} (${product.reviews.toLocaleString()} reviews)`
  }
}

function getRecommendations(product) {
  return products
    .filter((p) => p.category === product.category && p.name !== product.name)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
}

function showRecommendations(product) {
  const recommendations = getRecommendations(product)
  const recommendationsContainer = document.getElementById("recommendations")
  recommendationsContainer.innerHTML = ""
  recommendations.forEach((recommendation) => {
    const recommendationElement = document.createElement("div")
    recommendationElement.className = "recommendation-item"
    recommendationElement.innerHTML = `
      <h3>${recommendation.name}</h3>
      <p>₹${recommendation.price}</p>
    `
    recommendationsContainer.appendChild(recommendationElement)
  })
}

