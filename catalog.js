class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.date = new Date().toLocaleString(); 
    }

    addItem(product) {
        this.items.push(product);
        this.date = new Date().toLocaleString(); 
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.date = new Date().toLocaleString();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    getCartDisplay() {
        return this.items.map(item => `
            <div class="cart-item">
                <p>${item.name} - $${item.price}</p>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </div>
        `).join('');
    }

    getCartDate() {
        return this.date;
    }
}

const products = [
    new Product(1, 'Sports Car', 20000000, 'https://wallpapers.com/images/featured/cool-cars-cipxrabgpci91ils.jpg'),
    new Product(2, 'Keychain', 25, 'https://rukminim3.flixcart.com/image/850/1000/xif0q/key-chain/z/7/l/gojo-satoru-anime-keychain-steel-for-man-and-woman-skycart-1-original-imaghtsah8gjqsrz.jpeg?q=20&crop=false'),
    new Product(3, 'Book', 30, 'https://m.media-amazon.com/images/I/81R2N4PRuUL.jpg'),
    new Product(4, 'Lenovo Legion', 350000, 'https://p1-ofp.static.pub/ShareResource/ww/landing-pages/legion-brand-2024/Agnostic-version/img/lenovo-legion-agnostic-ai-blade-mobile-img.png'),
    new Product(5, 'Resident Evil PS5', 200, 'https://preview.redd.it/capcom-recently-released-ps5-physical-versions-of-older-v0-alt75kqa9r5e1.jpeg?auto=webp&s=e874e46fe972e5bc718b9049a452ffe2e95347ae'),
    new Product(6, 'PC setup', 500000, 'https://i.pinimg.com/736x/bd/f2/ec/bdf2ec5b6e89933199a7927c11e7342d.jpg')
];

const cart = new Cart();

function displayProducts() {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productsSection.appendChild(productDiv);
    });
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartDate = document.getElementById('cart-date');

    cartItemsDiv.innerHTML = cart.getCartDisplay();
    cartTotal.textContent = cart.getTotal().toFixed(2);
    cartDate.textContent = `Cart Date: ${cart.getCartDate()}`;
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productId = parseInt(event.target.dataset.id);
        const product = products.find(p => p.id === productId);

        cart.addItem(product);

        updateCartDisplay();
    }

    if (event.target.classList.contains('remove-from-cart')) {
        const productId = parseInt(event.target.dataset.id);

        cart.removeItem(productId);

        updateCartDisplay();
    }
});

displayProducts();
