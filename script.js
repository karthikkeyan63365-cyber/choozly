/* ================================================================
   CHOOZLY — script.js
   Sections:
   1. Product Data
   2. Shutter Animation
   3. Render Products
   4. Search & Filter
   5. Cart System
   6. Checkout
   7. Order Placement (calls firebase.js)
   8. Utility helpers
================================================================ */


/* ----------------------------------------------------------------
   1. PRODUCT DATA
   Add or remove products here — just follow the same structure
---------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: 1,
    name: "65W GaN Fast Charger",
    desc: "Ultra-fast GaN technology. Charges phone to 50% in 20 min.",
    price: 899,
    emoji: "⚡",
    category: "charger"
  },
  {
    id: 2,
    name: "20W USB-C Charger",
    desc: "Compact wall adapter. Compatible with all USB-C devices.",
    price: 499,
    emoji: "🔌",
    category: "charger"
  },
  {
    id: 3,
    name: "Braided Type-C Cable 1m",
    desc: "Military-grade braiding. 100W fast charging support.",
    price: 299,
    emoji: "🔗",
    category: "cable"
  },
  {
    id: 4,
    name: "Lightning Cable 2m",
    desc: "MFi certified. Extra long for comfortable use.",
    price: 349,
    emoji: "🔗",
    category: "cable"
  },
  {
    id: 5,
    name: "Magnetic 3-in-1 Cable",
    desc: "Type-C, Lightning & Micro USB. Detachable magnetic tips.",
    price: 599,
    emoji: "🧲",
    category: "cable"
  },
  {
    id: 6,
    name: "Transparent Phone Case",
    desc: "Crystal clear with shockproof corners. Anti-yellow coating.",
    price: 199,
    emoji: "📱",
    category: "case"
  },
  {
    id: 7,
    name: "Leather Flip Cover",
    desc: "Premium PU leather. Card slots + magnetic closure.",
    price: 449,
    emoji: "👝",
    category: "case"
  },
  {
    id: 8,
    name: "Rugged Armored Case",
    desc: "Military drop protection. 360° full body coverage.",
    price: 549,
    emoji: "🛡️",
    category: "case"
  },
  {
    id: 9,
    name: "Bass Boost Earphones",
    desc: "Deep bass, crystal clear highs. 14.2mm dynamic driver.",
    price: 699,
    emoji: "🎧",
    category: "earphone"
  },
  {
    id: 10,
    name: "Wireless Earbuds",
    desc: "True wireless. 30hr total battery. IPX5 water resistant.",
    price: 1299,
    emoji: "🎵",
    category: "earphone"
  },
  {
    id: 11,
    name: "10000mAh Power Bank",
    desc: "Slim design. Dual output. Fast charging with LED indicator.",
    price: 999,
    emoji: "🔋",
    category: "powerbank"
  },
  {
    id: 12,
    name: "20000mAh Power Bank Pro",
    desc: "Massive capacity. 65W PD fast charging. Powers laptops too.",
    price: 1799,
    emoji: "⚡",
    category: "powerbank"
  }
];


/* ----------------------------------------------------------------
   2. SHUTTER ANIMATION
   Tracks mouse wheel / touch scroll to move the shutter up.
   Once the shutter moves up enough, it fully opens.
---------------------------------------------------------------- */

const shutterOverlay = document.getElementById('shutterOverlay');
const shutterBody    = document.getElementById('shutterBody');
const storeWrapper   = document.getElementById('storeWrapper');

let shutterY       = 0;          // Current Y position of shutter (0 = closed)
let shutterOpen    = false;       // Has shutter fully opened?
const SHUTTER_SPEED = 1.5;        // How fast shutter moves per scroll unit
const OPEN_THRESHOLD = window.innerHeight * 0.95; // How far to scroll to open

// Add shutter-active class to lock page scroll
document.body.classList.add('shutter-active');

// Desktop: wheel scroll
window.addEventListener('wheel', handleShutterScroll, { passive: false });

// Mobile: touch swipe
let touchStartY = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  if (shutterOpen) return;
  const deltaY = touchStartY - e.touches[0].clientY;  // Positive = swipe up
  if (deltaY > 0) {
    e.preventDefault();
    moveShutter(deltaY * SHUTTER_SPEED);
  }
}, { passive: false });

function handleShutterScroll(e) {
  if (shutterOpen) return;
  e.preventDefault();

  // Only respond to scroll UP (negative deltaY in wheel = scroll up)
  // But deltaY > 0 means scrolling down which visually means we want shutter to go up
  if (e.deltaY > 0) {
    moveShutter(e.deltaY * SHUTTER_SPEED);
  }
}

function moveShutter(delta) {
  shutterY += delta;

  // Clamp between 0 and screen height
  shutterY = Math.max(0, Math.min(shutterY, window.innerHeight * 1.1));

  // Apply transform — move shutter upward
  shutterBody.style.transform = `translateY(-${shutterY}px)`;

  // Check if opened enough
  if (shutterY >= OPEN_THRESHOLD) {
    openStore();
  }
}

function openStore() {
  if (shutterOpen) return;
  shutterOpen = true;

  // Snap shutter fully off screen
  shutterBody.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  shutterBody.style.transform = `translateY(-110vh)`;

  // Fade out overlay and show store
  setTimeout(() => {
    shutterOverlay.classList.add('hidden');
    document.body.classList.remove('shutter-active');
    storeWrapper.classList.add('visible');

    // Remove scroll listeners
    window.removeEventListener('wheel', handleShutterScroll);
  }, 500);
}


/* ----------------------------------------------------------------
   3. RENDER PRODUCTS
   Builds product cards from the PRODUCTS array and injects into DOM
---------------------------------------------------------------- */

let currentFilter   = 'all';
let currentSearch   = '';

function renderProducts() {
  const grid      = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');

  // Filter by category and search
  const filtered = PRODUCTS.filter(p => {
    const matchCat    = currentFilter === 'all' || p.category === currentFilter;
    const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        p.desc.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  grid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  // Build each product card
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img">
        ${product.emoji}
        <span class="product-badge">${product.category}</span>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-desc">${product.desc}</div>
        <div class="product-footer">
          <span class="product-price">₹${product.price}</span>
          <button class="add-btn" onclick="addToCart(${product.id})">+ Add</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Run on page load
renderProducts();


/* ----------------------------------------------------------------
   4. SEARCH & FILTER
---------------------------------------------------------------- */

function searchProducts() {
  currentSearch = document.getElementById('searchInput').value;
  renderProducts();
}

function filterCategory(category, btn) {
  currentFilter = category;

  // Update active pill style
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  renderProducts();
}


/* ----------------------------------------------------------------
   5. CART SYSTEM
   Cart is stored as an array of { product, qty } objects
---------------------------------------------------------------- */

let cart = [];   // Array of { product, qty }

// Add item to cart
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.product.id === productId);

  if (existing) {
    existing.qty += 1;           // If already in cart, increase qty
  } else {
    cart.push({ product, qty: 1 });  // New item
  }

  updateCartUI();
  showToast(`${product.emoji} ${product.name} added to cart!`);
}

// Change quantity in cart (+1 or -1)
function changeQty(productId, delta) {
  const item = cart.find(i => i.product.id === productId);
  if (!item) return;

  item.qty += delta;

  // Remove item if qty drops to 0
  if (item.qty <= 0) {
    cart = cart.filter(i => i.product.id !== productId);
  }

  updateCartUI();
}

// Recalculate total price
function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
}

// Update cart count badge and sidebar UI
function updateCartUI() {
  const total = getCartTotal();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  // Update count badge
  document.getElementById('cartCount').textContent = count;

  // Render cart items
  const cartItemsEl = document.getElementById('cartItems');

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty</p>
      </div>
    `;
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span class="cart-item-emoji">${item.product.emoji}</span>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.product.name}</div>
          <div class="cart-item-price">₹${item.product.price} × ${item.qty} = ₹${item.product.price * item.qty}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.product.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.product.id}, +1)">+</button>
        </div>
      </div>
    `).join('');
  }

  // Update total in cart footer
  document.getElementById('cartTotal').textContent = `₹${total}`;
}

// Open / close cart sidebar
function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

// Initial render
updateCartUI();


/* ----------------------------------------------------------------
   6. CHECKOUT
---------------------------------------------------------------- */

function openCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  // Close cart sidebar first
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');

  // Populate order summary
  const summaryEl = document.getElementById('orderSummary');
  summaryEl.innerHTML = cart.map(item => `
    <div class="summary-item">
      <span>${item.product.emoji} ${item.product.name} × ${item.qty}</span>
      <strong>₹${item.product.price * item.qty}</strong>
    </div>
  `).join('') + `
    <div class="summary-item" style="border-top:1px solid #2a2a2a; padding-top:0.5rem; margin-top:0.5rem;">
      <span>Total</span>
      <strong style="color:var(--accent)">₹${getCartTotal()}</strong>
    </div>
  `;

  // Update checkout total
  document.getElementById('checkoutTotal').textContent = `₹${getCartTotal()}`;

  // Open checkout modal
  document.getElementById('checkoutModal').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
}


/* ----------------------------------------------------------------
   7. PLACE ORDER
   Validates form, then calls saveOrder() from firebase.js
   firebase.js is loaded as a module and exposes saveOrder globally
---------------------------------------------------------------- */

async function placeOrder() {
  // Get form values
  const name    = document.getElementById('custName').value.trim();
  const phone   = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked').value;

  // Validate
  if (!name)    { highlight('custName',    'Please enter your name');    return; }
  if (!phone)   { highlight('custPhone',   'Please enter phone number'); return; }
  if (phone.length < 10) { highlight('custPhone', 'Enter valid phone number'); return; }
  if (!address) { highlight('custAddress', 'Please enter your address'); return; }

  // Build order object
  const order = {
    customerName: name,
    phone:        phone,
    address:      address,
    paymentMethod: payment,
    items: cart.map(item => ({
      id:       item.product.id,
      name:     item.product.name,
      emoji:    item.product.emoji,
      price:    item.product.price,
      qty:      item.qty,
      subtotal: item.product.price * item.qty
    })),
    totalPrice: getCartTotal(),
    timestamp:  new Date().toISOString(),
    status:     'pending'
  };

  // Disable button while saving
  const btn = document.querySelector('.place-order-btn');
  btn.textContent = 'Placing order...';
  btn.disabled = true;

  try {
    // saveOrder is defined in firebase.js
    const orderId = await window.saveOrder(order);

    // Close checkout
    closeCheckout();

    // Show success
    document.getElementById('displayOrderId').textContent = orderId;
    document.getElementById('successMessage').textContent =
      `Thank you ${name}! Your order of ₹${getCartTotal()} has been placed via ${payment}.`;
    document.getElementById('successModal').classList.add('open');

    // Clear cart
    cart = [];
    updateCartUI();

  } catch (err) {
    console.error('Order save failed:', err);
    alert('Something went wrong. Please try again.');
  }

  btn.textContent = '✅ Place Order';
  btn.disabled = false;
}

function closeSuccess() {
  document.getElementById('successModal').classList.remove('open');
}

// Highlight invalid input with red border
function highlight(fieldId, message) {
  const el = document.getElementById(fieldId);
  el.style.borderColor = '#ff4444';
  el.focus();
  el.placeholder = message;
  setTimeout(() => {
    el.style.borderColor = '';
    el.placeholder = '';
  }, 2000);
}


/* ----------------------------------------------------------------
   8. TOAST NOTIFICATION
   Small popup message that fades in and out
---------------------------------------------------------------- */

function showToast(message) {
  // Remove existing toast if any
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #1a1a1a;
    color: #f0f0f0;
    border: 1px solid #2a2a2a;
    padding: 0.75rem 1.5rem;
    border-radius: 99px;
    font-size: 0.9rem;
    z-index: 9000;
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
  `;

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);

  // Animate out and remove
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}