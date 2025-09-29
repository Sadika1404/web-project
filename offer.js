// ---- Simple cart with offer-aware totals + alert feature ----
(() => {
    // DOM targets
    const shopCountEl = document.getElementById('shop-count');
    const cartTotalEl = document.getElementById('cart-total');
  
    // State
    let itemCount = 0;
    let cartTotal = 0;
  
    // Utils
    function parsePriceAndOffer(text) {
      // Example text: "50 USD (60% offer)" or "20 USD (no offer)"
      const priceMatch = text.match(/(\d+(\.\d+)?)/);
      const basePrice = priceMatch ? parseFloat(priceMatch[0]) : 0;
  
      const offerMatch = text.match(/(\d+)\s*%\s*offer/i);
      const offerPct = offerMatch ? parseFloat(offerMatch[1]) : 0;
  
      const discounted = +(basePrice * (1 - offerPct / 100)).toFixed(2);
      return { basePrice, offerPct, discounted };
    }
  
    function updateHeader() {
      if (shopCountEl) shopCountEl.textContent = `${itemCount}`;
      if (cartTotalEl) cartTotalEl.textContent = cartTotal.toFixed(2);
    }
  
    // Attach listeners to all product cards
    document.querySelectorAll('.flower-image').forEach(card => {
      const btn = card.querySelector('.cart');
      const priceEl = card.querySelector('.image-price');
      const nameEl = card.querySelector('.image-name');
  
      if (!btn || !priceEl) return;
  
      btn.addEventListener('click', () => {
        const { basePrice, offerPct, discounted } = parsePriceAndOffer(priceEl.textContent || '');
        itemCount += 1;
        cartTotal = +(cartTotal + discounted).toFixed(2);
        updateHeader();
  
        // ---- Show alert with details ----
        const productName = nameEl ? nameEl.textContent.trim() : "Product";
        if (offerPct > 0) {
          alert(`${productName}: Original price $${basePrice}, Discount ${offerPct}% → You pay $${discounted}`);
        } else {
          alert(`${productName}: No discount, Price $${basePrice}`);
        }
  
        // Optional tiny feedback
        btn.disabled = true;
        const old = btn.textContent;
        btn.textContent = 'ADDED ✓';
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = old;
        }, 700);
      });
    });
  
    // initial paint
    updateHeader();
  })();
  