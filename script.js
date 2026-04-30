/* ============================================
   LUMIÈRE JEWELS - Main JavaScript
   Cart, Popups, Filters, UI Interactions
   ============================================ */

// ============ CART SYSTEM ============

const Cart = {
  items: [],

  init() {
    const saved = localStorage.getItem('lumiere_cart');
    this.items = saved ? JSON.parse(saved) : [];
    this.updateCount();
  },

  save() {
    localStorage.setItem('lumiere_cart', JSON.stringify(this.items));
    this.updateCount();
  },

  add(product) {
    const existing = this.items.find(i => i.id === product.id && i.size === product.size);
    if (existing) {
      existing.qty = Math.min(existing.qty + (product.qty || 1), 10);
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        size: product.size || null,
        qty: product.qty || 1
      });
    }
    this.save();
    showCartToast(product.name);
  },

  remove(id, size) {
    this.items = this.items.filter(i => !(i.id === id && i.size === size));
    this.save();
  },

  updateQty(id, size, qty) {
    const item = this.items.find(i => i.id === id && i.size === size);
    if (item) {
      item.qty = Math.max(1, Math.min(10, qty));
      if (item.qty === 0) this.remove(id, size);
    }
    this.save();
  },

  getTotal() {
    return this.items.reduce((sum, i) => sum + (i.price * i.qty), 0);
  },

  getCount() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  clear() {
    this.items = [];
    this.save();
  },

  updateCount() {
    const count = this.getCount();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};

// ============ CART TOAST ============
function showCartToast(productName) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;
  const nameEl = toast.querySelector('.toast-product-name');
  if (nameEl) nameEl.textContent = productName;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// ============ ADD TO CART BUTTON HANDLER ============
function handleAddToCart(btn) {
  const card = btn.closest('[data-product-id]') || btn.closest('.product-card') || btn.closest('.product-detail');
  if (!card) return;

  const product = {
    id: card.dataset.productId || btn.dataset.productId,
    name: card.dataset.productName || btn.dataset.productName,
    price: parseFloat(card.dataset.productPrice || btn.dataset.productPrice),
    image: card.dataset.productImage || btn.dataset.productImage,
    category: card.dataset.productCategory || btn.dataset.productCategory || 'Jewellery',
    size: card.querySelector('.size-btn.active')?.dataset.size || null,
    qty: parseInt(card.querySelector('.qty-num')?.value || 1)
  };

  Cart.add(product);

  // Button animation
  const originalText = btn.textContent;
  btn.textContent = '✓ Added!';
  btn.style.background = 'var(--gold)';
  btn.style.color = 'var(--dark)';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.style.color = '';
  }, 1800);
}

// ============ SEARCH OVERLAY ============
function initSearch() {
  const overlay = document.querySelector('.search-overlay');
  const openBtns = document.querySelectorAll('.search-open-btn');
  const closeBtn = document.querySelector('.search-close');
  const input = overlay?.querySelector('input');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.add('active');
      setTimeout(() => input?.focus(), 100);
    });
  });

  closeBtn?.addEventListener('click', () => overlay.classList.remove('active'));

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('active')) {
      overlay.classList.remove('active');
    }
  });
}

// ============ WELCOME POPUP ============
function initWelcomePopup() {
  const overlay = document.getElementById('welcomePopup');
  if (!overlay) return;

  const seen = sessionStorage.getItem('lumiere_welcomed');
  if (!seen) {
    setTimeout(() => {
      overlay.classList.add('active');
      sessionStorage.setItem('lumiere_welcomed', '1');
    }, 1800);
  }

  document.querySelectorAll('.popup-close, .popup-dismiss').forEach(btn => {
    btn.addEventListener('click', () => overlay.classList.remove('active'));
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

// ============ DISCOUNT POPUP ============
function initDiscountPopup() {
  const overlay = document.getElementById('discountPopup');
  if (!overlay) return;

  const dismissed = localStorage.getItem('lumiere_discount_dismissed');
  if (!dismissed) {
    setTimeout(() => {
      overlay.classList.add('active');
    }, 5000);
  }

  document.querySelectorAll('.discount-popup-close').forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.classList.remove('active');
      localStorage.setItem('lumiere_discount_dismissed', '1');
    });
  });
}

// ============ COUNTDOWN TIMER ============
function initCountdown(targetHours = 12) {
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');
  if (!hoursEl) return;

  let savedEnd = localStorage.getItem('lumiere_timer_end');
  let endTime;

  if (savedEnd) {
    endTime = parseInt(savedEnd);
    if (endTime < Date.now()) {
      endTime = Date.now() + targetHours * 3600000;
      localStorage.setItem('lumiere_timer_end', endTime);
    }
  } else {
    endTime = Date.now() + targetHours * 3600000;
    localStorage.setItem('lumiere_timer_end', endTime);
  }

  function update() {
    const remaining = Math.max(0, endTime - Date.now());
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');

    if (remaining > 0) setTimeout(update, 1000);
  }
  update();
}

// ============ NEWSLETTER FORM ============
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button');
      if (!input?.value) return;

      const orig = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      input.value = '';
      setTimeout(() => btn.textContent = orig, 2500);
    });
  });
}

// ============ ACTIVE NAV LINK ============
function setActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-luxury .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(current)) {
      link.classList.add('active');
    }
  });
}

// ============ CONTACT FORM ============
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--dark)';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  });
}

// ============ SIZE SELECTOR (Product Detail) ============
function initSizeSelector() {
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.size-selector').querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// ============ QUANTITY SELECTOR ============
function initQtySelector() {
  document.querySelectorAll('.qty-selector').forEach(sel => {
    const minus = sel.querySelector('.qty-minus');
    const plus = sel.querySelector('.qty-plus');
    const num = sel.querySelector('.qty-num');

    minus?.addEventListener('click', () => {
      const val = Math.max(1, parseInt(num.value) - 1);
      num.value = val;
    });

    plus?.addEventListener('click', () => {
      const val = Math.min(10, parseInt(num.value) + 1);
      num.value = val;
    });
  });
}

// ============ GALLERY THUMBNAILS (Product Detail) ============
function initGallery() {
  const mainImg = document.querySelector('.product-main-img');
  document.querySelectorAll('.product-gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = thumb.src;
          mainImg.style.opacity = '1';
        }, 200);
      }
      document.querySelectorAll('.product-gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

// ============ CART PAGE RENDER ============
function renderCartPage() {
  const cartContainer = document.getElementById('cartItems');
  if (!cartContainer) return;

  const items = Cart.items;

  if (items.length === 0) {
    cartContainer.innerHTML = `
      <div class="cart-empty">
        <i class="bi bi-bag"></i>
        <h3 class="font-display mb-3">Your cart is empty</h3>
        <p class="text-muted mb-4">Discover our exquisite collection of luxury jewellery</p>
        <a href="shop.html" class="btn-gold">Continue Shopping</a>
      </div>
    `;
    updateCartSummary();
    return;
  }

  cartContainer.innerHTML = items.map(item => `
    <div class="cart-item" data-id="${item.id}" data-size="${item.size || ''}">
      <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200'">
      <div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-cat">${item.category}${item.size ? ' · Size ' + item.size : ''}</div>
      </div>
      <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
      <div class="cart-qty">
        <button class="cart-qty-btn" onclick="cartQty('${item.id}','${item.size || ''}', ${item.qty - 1})">−</button>
        <input class="cart-qty-num" type="number" value="${item.qty}" min="1" max="10"
          onchange="cartQty('${item.id}','${item.size || ''}', this.value)">
        <button class="cart-qty-btn" onclick="cartQty('${item.id}','${item.size || ''}', ${item.qty + 1})">+</button>
      </div>
      <div class="cart-item-total">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
      <button class="remove-btn" onclick="cartRemove('${item.id}','${item.size || ''}')"><i class="bi bi-x-lg"></i></button>
    </div>
  `).join('');

  updateCartSummary();
}

function cartQty(id, size, qty) {
  Cart.updateQty(id, size || null, parseInt(qty));
  renderCartPage();
}

function cartRemove(id, size) {
  Cart.remove(id, size || null);
  renderCartPage();
}

function updateCartSummary() {
  const subtotal = Cart.getTotal();
  const shipping = subtotal > 5000 ? 0 : 299;
  const total = subtotal + shipping;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('cartSubtotal', `₹${subtotal.toLocaleString('en-IN')}`);
  set('cartShipping', shipping === 0 ? 'FREE' : `₹${shipping}`);
  set('cartTotal', `₹${total.toLocaleString('en-IN')}`);
  set('cartItemCount', Cart.getCount() + ' item(s)');
}

// ============ SHOP FILTER ============
function initShopFilter() {
  const filterCheckboxes = document.querySelectorAll('.category-filter');
  const priceRange = document.getElementById('priceRange');
  const priceVal = document.getElementById('priceValue');
  const sortSelect = document.getElementById('sortSelect');
  const productGrid = document.getElementById('productGrid');

  if (!productGrid) return;

  function filterProducts() {
    const selected = [...filterCheckboxes]
      .filter(c => c.checked)
      .map(c => c.value.toLowerCase());

    const maxPrice = priceRange ? parseInt(priceRange.value) : 99999;
    const sortBy = sortSelect?.value || 'default';

    let cards = [...productGrid.querySelectorAll('[data-category]')];

    cards.forEach(card => {
      const cat = card.dataset.category?.toLowerCase() || '';
      const price = parseFloat(card.dataset.price) || 0;
      const catMatch = selected.length === 0 || selected.includes(cat);
      const priceMatch = price <= maxPrice;
      card.style.display = catMatch && priceMatch ? '' : 'none';
    });

    // Sort
    const visible = cards.filter(c => c.style.display !== 'none');
    visible.sort((a, b) => {
      if (sortBy === 'price-asc') return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
      if (sortBy === 'price-desc') return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
      if (sortBy === 'name-asc') return a.dataset.name?.localeCompare(b.dataset.name);
      return 0;
    });

    visible.forEach(card => productGrid.appendChild(card));
  }

  filterCheckboxes.forEach(c => c.addEventListener('change', filterProducts));
  sortSelect?.addEventListener('change', filterProducts);

  if (priceRange && priceVal) {
    priceRange.addEventListener('input', () => {
      priceVal.textContent = `₹${parseInt(priceRange.value).toLocaleString('en-IN')}`;
      filterProducts();
    });
  }
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ============ INIT ON LOAD ============
document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  initSearch();
  initWelcomePopup();
  initDiscountPopup();
  initCountdown(12);
  initNewsletter();
  setActiveNav();
  initContactForm();
  initSizeSelector();
  initQtySelector();
  initGallery();
  renderCartPage();
  initShopFilter();
  initSmoothScroll();

  // Add to cart global click handler
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-cart');
    if (btn) handleAddToCart(btn);
  });

  // Checkout button
  document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (Cart.items.length === 0) return;
    alert('Thank you for your order! This is a demo store – checkout is UI only.');
  });
});