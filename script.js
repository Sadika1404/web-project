// Get all "Add to Cart" buttons
const cartButtons = document.querySelectorAll('.cart');

// Navbar counters
const cartTotal = document.getElementById('cart-total');
const shopCount = document.getElementById('shop-count');

let total = 0;
let count = 0;

cartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Find the flower name related to the clicked button
    const flowerName = button.parentElement.querySelector('.image-name').textContent.trim();
    alert(`${flowerName} has been added to your cart!`);

    // Get price
    const priceText = button.parentElement.querySelector('.image-price').textContent;
    const flowerPrice = parseFloat(priceText);

    // Update total & count
    total += isNaN(flowerPrice) ? 0 : flowerPrice;
    count++;

    // Update navbar
    cartTotal.textContent = total.toFixed(2);
    shopCount.textContent = `${count}`;
  });
});
