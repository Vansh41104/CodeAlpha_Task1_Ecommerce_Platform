// navbar responsive
document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }
    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }
    // cart open close
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.getElementById('cart-test');
    const closeCart = document.getElementById('close-test');
    if(cartIcon) {
        cartIcon.onclick=() => {
            cart.classList.add('active');
        }
    }  
    if(closeCart) {
        closeCart.onclick=() => {
            cart.classList.remove('active');
        }
    }
    const cartIcon1 = document.getElementById('cart-icon1');
    const cart1 = document.getElementById('cart-test');
    const closeCart1 = document.getElementById('close-test');
    if(cartIcon1) {
        cartIcon1.onclick=() => {
            cart1.classList.add('active');
        }
    }  
    if(closeCart1) {
        closeCart1.onclick=() => {
            cart1.classList.remove('active');
        }
    }
    const cartIcon2 = document.getElementById('cart-icon2');
    const cart2 = document.getElementById('cart-test');
    const closeCart2 = document.getElementById('close-test');
    if(cartIcon2) {
        cartIcon2.onclick=() => {
            cart1.classList.add('active');
        }
    }  
    if(closeCart2) {
        closeCart2.onclick=() => {
            cart1.classList.remove('active');
        }
    }
    
});

// cart
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}
function ready() {
    // remove element
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // quantity change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // add element
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked );
    }
    var addCart1 = document.getElementsByClassName('add-cart1');
    for (var i = 0; i < addCart1.length; i++) {
        var button = addCart1[i];
        button.addEventListener('click', addCartClicked1 );
    }
    loadCartItems();
    
}
// REMOVE CART box
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
    saveCartItems();
    updateCartIcon()
    
}
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    console.log(Boolean(updateCartTotal()));
    updateCartTotal();
    saveCartItems();
    updateCartIcon();
}
// UPDATE CART TOTAL
function updateCartTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++) {
        var cartbox = cartBoxes[i];
        var priceElement = cartbox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartbox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total+=(price * quantity);
    }
    total-Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;

    localStorage.setItem('cartTotal', total);
}
function addCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement;
    var title = shopItem.getElementsByClassName('product-title')[0].innerText;
    var price = shopItem.getElementsByClassName('price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('product-img')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
    saveCartItems();
    updateCartIcon();   
}
function addCartClicked1(event) {
    var button1 = event.target;
    var shopItem1 = button1.parentElement;
    
    var titleElement1 = shopItem1.getElementsByClassName('product-title1')[0];
    var priceElement1 = shopItem1.getElementsByClassName('price1')[0];
    var imageElement1 = document.querySelector('.single-pro-image .product-img1');
    var sizeElement1 = shopItem1.getElementsByClassName('product-size1')[0];
    
    var title1 = titleElement1.innerText;
    var price1 = priceElement1.innerText;
    var imageSrc1 = imageElement1.src;
    var size1 = sizeElement1.innerText;

    addItemToCart(title1, price1, imageSrc1, size1);
    updateCartTotal();
    saveCartItems();
    updateCartIcon();   
}
function addItemToCart(title, price, imageSrc, size){
    var cartBox = document.createElement('div');
    cartBox.classList.add('cart-box');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartContent.getElementsByClassName('cart-product-title'); 
    for(var i = 0; i<cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert('This item is already added to the cart');
            return;
        }
    }
    var cartBoxContent = `
    <img src="${imageSrc}" alt=""class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" name="" id="" value="1" class="cart-quantity">
        <input type="text" name="" id="" value="M" class="cart-size">
        
    </div>
    <i class="fa-solid fa-trash cart-remove"></i>
    `
    cartBox.innerHTML = cartBoxContent;
    cartContent.append(cartBox);
    cartBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    saveCartItems();
    updateCartIcon();

}
function saveCartItems(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];
    for(var i = 0; i < cartBoxes.length; i++){
        var cartbox = cartBoxes[i];
        var title = cartbox.getElementsByClassName('cart-product-title')[0];
        var price = cartbox.getElementsByClassName('cart-price')[0];
        var quantity = cartbox.getElementsByClassName('cart-quantity')[0];
        var imageSrc = cartbox.getElementsByClassName('cart-img')[0].src;
        var size = cartbox.getElementsByClassName('cart-size')[0];
        var Items={
            title: title.innerText,
            price: price.innerText,
            quantity: quantity.value,
            imageSrc: imageSrc,
            size: size.innerText
        };
        cartItems.push(Items);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartItems(){
    var cartItems = localStorage.getItem('cartItems');
    if(cartItems){
        cartItems = JSON.parse(cartItems);
        for(var i = 0; i < cartItems.length; i++){
            var item = cartItems[i];
            addItemToCart(item.title, item.price,  item.imageSrc, item.size);

            var cartBoxes = document.getElementsByClassName('cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];

            var quantity = cartBox.getElementsByClassName('cart-quantity')[0];
            quantity.value = item.quantity;
         }
    }
    var cartTotal = localStorage.getItem('cartTotal');
    if(cartTotal){
        document.getElementsByClassName('total-price')[0].innerText = '$' + cartTotal;
    }
    updateCartIcon();
}

function updateCartIcon(){
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;

    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity += parseInt(quantityElement.value);
    }
    var cartIcon = document.getElementById('cart-icon');   
    if (cartIcon) {
        cartIcon.setAttribute('data-quantity', quantity);
    }
    var cartIcon1 = document.getElementById('cart-icon1');   
    if (cartIcon1) {
        cartIcon1.setAttribute('data-quantity1', quantity);
        console.log(cartIcon1);
    }
}
function clearcart(){
    var cartcontent=document.getElementsByClassName('cart-content')[0];
    cartcontent.innerHTML='';
    updateCartTotal();
    localStorage.removeItem('cartItems');
 }
