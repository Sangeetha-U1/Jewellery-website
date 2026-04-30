/* ============================================
   LUMIÈRE JEWELS - Shared Components
   Navbar, Footer, Popups (injected via JS)
   ============================================ */

function injectComponents() {
  // ============ TOP BAR ============
  const topBarHTML = `
  <div class="top-bar d-none d-md-block">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <span>✦ Free shipping on orders above ₹5000 &nbsp;|&nbsp; Use code <a href="#">LUMIERE15</a> for 15% off</span>
        <span>Mon–Sat 10AM–7PM &nbsp;|&nbsp; <a href="tel:+919876543210">+91 98765 43210</a></span>
      </div>
    </div>
  </div>`;

  // ============ NAVBAR ============
  const navHTML = `
  <nav class="navbar navbar-expand-lg navbar-luxury">
    <div class="container">
      <a class="navbar-brand" href="index.html">LUMIÈRE <span>Jewels</span></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav mx-auto gap-1">
          <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="about.html">About Us</a></li>
          <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Pages</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="product.html">Product Detail</a></li>
              <li><a class="dropdown-item" href="cart.html">Cart</a></li>
              <li><a class="dropdown-item" href="account.html">My Account</a></li>
              <li><hr class="dropdown-divider" style="border-color:rgba(201,168,76,0.2)"></li>
              <li><a class="dropdown-item" href="faq.html">FAQ</a></li>
              <li><a class="dropdown-item" href="contact.html">Contact</a></li>
            </ul>
          </li>
        </ul>
        <div class="navbar-icons">
          <button class="nav-icon-btn search-open-btn" title="Search"><i class="bi bi-search"></i></button>
          <a href="account.html" class="nav-icon-btn" title="Account"><i class="bi bi-person"></i></a>
          <a href="cart.html" class="nav-icon-btn" title="Cart" style="position:relative">
            <i class="bi bi-bag"></i>
            <span class="cart-count">0</span>
          </a>
        </div>
      </div>
    </div>
  </nav>`;

  // ============ SEARCH OVERLAY ============
  const searchHTML = `
  <div class="search-overlay">
    <div class="search-input-wrapper">
      <input type="text" placeholder="Search jewellery...">
    </div>
    <button class="search-close"><i class="bi bi-x"></i></button>
  </div>`;

  // ============ FOOTER ============
  const footerHTML = `
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="footer-brand">LUMIÈRE <span>Jewels</span></div>
            <p class="footer-desc">Crafting timeless luxury jewellery with unmatched artistry since 2005. Each piece tells a story of elegance, passion, and precision.</p>
            <div class="social-links">
              <a href="#" class="social-link"><i class="bi bi-instagram"></i></a>
              <a href="#" class="social-link"><i class="bi bi-facebook"></i></a>
              <a href="#" class="social-link"><i class="bi bi-twitter-x"></i></a>
              <a href="#" class="social-link"><i class="bi bi-pinterest"></i></a>
              <a href="#" class="social-link"><i class="bi bi-youtube"></i></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-6">
            <div class="footer-heading">Quick Links</div>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="shop.html">Shop</a></li>
              <li><a href="cart.html">Cart</a></li>
              <li><a href="account.html">My Account</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-3 col-6">
            <div class="footer-heading">Collections</div>
            <ul class="footer-links">
              <li><a href="shop.html">Rings</a></li>
              <li><a href="shop.html">Necklaces</a></li>
              <li><a href="shop.html">Earrings</a></li>
              <li><a href="shop.html">Bracelets</a></li>
              <li><a href="shop.html">Pendants</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-3 col-6">
            <div class="footer-heading">Help</div>
            <ul class="footer-links">
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-3 col-6">
            <div class="footer-heading">Contact</div>
            <div class="footer-contact-item">
              <i class="bi bi-geo-alt"></i>
              <span>12 Jewellers Lane, Hyderabad, Telangana 500001</span>
            </div>
            <div class="footer-contact-item">
              <i class="bi bi-telephone"></i>
              <span>+91 98765 43210</span>
            </div>
            <div class="footer-contact-item">
              <i class="bi bi-envelope"></i>
              <span>hello@lumierejewels.in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        © 2025 <span>LUMIÈRE Jewels</span>. All Rights Reserved. Crafted with ♥ in India.
      </div>
    </div>
  </footer>`;

  // ============ WELCOME POPUP ============
  const welcomePopupHTML = `
  <div class="welcome-popup-overlay" id="welcomePopup">
    <div class="welcome-popup">
      <button class="popup-close popup-dismiss"><i class="bi bi-x"></i></button>
      <img class="popup-img" src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80" alt="Welcome">
      <div class="popup-body">
        <div style="color:var(--gold);font-size:0.72rem;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px">Welcome to</div>
        <h3 style="font-family:var(--font-display);font-size:1.8rem;margin-bottom:12px">LUMIÈRE Jewels</h3>
        <p style="color:var(--mid-gray);font-size:0.9rem;margin-bottom:20px">Discover timeless luxury jewellery crafted for the modern connoisseur.</p>
        <a href="shop.html" class="btn-gold popup-dismiss" style="display:inline-block">Explore Collection</a>
        <div style="margin-top:14px"><button class="popup-dismiss" style="background:none;border:none;color:var(--mid-gray);font-size:0.8rem;cursor:pointer;text-decoration:underline">No thanks, maybe later</button></div>
      </div>
    </div>
  </div>`;

  // ============ DISCOUNT POPUP ============
  const discountPopupHTML = `
  <div class="welcome-popup-overlay" id="discountPopup">
    <div class="welcome-popup">
      <button class="popup-close discount-popup-close"><i class="bi bi-x"></i></button>
      <div style="background:var(--dark);padding:32px;text-align:center;border-bottom:3px solid var(--gold)">
        <div style="font-size:3.5rem;color:var(--gold);font-family:var(--font-display);line-height:1">15%</div>
        <div style="color:var(--white);font-size:0.8rem;letter-spacing:3px;text-transform:uppercase;margin-top:4px">OFF YOUR FIRST ORDER</div>
      </div>
      <div class="popup-body">
        <h4 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:10px">Exclusive Welcome Offer</h4>
        <p style="color:var(--mid-gray);font-size:0.85rem;margin-bottom:20px">Use code <strong style="color:var(--gold)">LUMIERE15</strong> at checkout to save 15% on your entire order.</p>
        <a href="shop.html" class="btn-gold discount-popup-close" style="display:inline-block">Shop Now</a>
      </div>
    </div>
  </div>`;

  // ============ CART TOAST ============
  const cartToastHTML = `
  <div class="cart-toast" id="cartToast">
    <i class="bi bi-check-circle-fill"></i>
    <div>
      <div style="font-size:0.75rem;color:var(--gold);letter-spacing:1px;text-transform:uppercase;margin-bottom:2px">Added to Cart</div>
      <div class="toast-product-name" style="font-family:var(--font-display);font-size:0.95rem"></div>
    </div>
    <a href="cart.html" style="margin-left:auto;color:var(--gold);font-size:0.75rem;letter-spacing:1px;text-transform:uppercase;white-space:nowrap">View Cart →</a>
  </div>`;

  // Inject into page
  const header = document.getElementById('site-header');
  if (header) {
    header.innerHTML = topBarHTML + navHTML;
  }

  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.innerHTML = footerHTML;

  document.body.insertAdjacentHTML('beforeend', searchHTML + welcomePopupHTML + discountPopupHTML + cartToastHTML);
}

// Auto-inject when DOM is ready
document.addEventListener('DOMContentLoaded', injectComponents);