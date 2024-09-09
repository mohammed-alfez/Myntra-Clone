let bagItems = [];
let wishItems = [];
onLoad();

function onLoad() {
    let bagItemsStr = localStorage.getItem('bagItems');
    let wishItemsStr = localStorage.getItem('wishItems');

    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    wishItems = wishItemsStr ? JSON.parse(wishItemsStr) : [];
    
    displayItemsOnHomePage();
    displayBagIcon();
    displayWishIcon();
}

function addToBag(itemID){
    if (!bagItems.includes(itemID)) {
        bagItems.push(itemID);
        localStorage.setItem('bagItems', JSON.stringify(bagItems));
        displayBagIcon();
        console.log("Item added to bag");
    } else {
        console.log("Item already in bag");
    }
}

function addToWish(itemID){
    if (!wishItems.includes(itemID)) {
        wishItems.push(itemID);
        localStorage.setItem('wishItems', JSON.stringify(wishItems));
        displayWishIcon();
        console.log("Item added to wishlist");
    } else {
        console.log("Item already in wishlist");
    }
}

function displayBagIcon(){
    let bagItemCountElement = document.querySelector('.bag-item-count');

    if(bagItems.length > 0){
        bagItemCountElement.innerText = bagItems.length;
        bagItemCountElement.style.visibility = 'visible';
    } else {
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayWishIcon(){
    let wishItemCountElement = document.querySelector('.wish-item-count');

    if(wishItems.length > 0){
        wishItemCountElement.innerText = wishItems.length;
        wishItemCountElement.style.visibility = 'visible';
    } else {
        wishItemCountElement.style.visibility = 'hidden';
    }
    
}

function displayItemsOnHomePage(){
    let itemsContainerElement = document.querySelector('.items-container');
    if(!itemsContainerElement){
        return;
    }

    let innerHTML = ``;
    items.forEach(item => {
        innerHTML += `
        <div class="item-container">
            <img class="item-image" src="${item.image}" alt="image">
            <div class="rating">
                ${item.rating.stars} ⭐ | ${item.rating.count}
            </div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
                <span class="current-price">${item.current_price}</span>
                <span class="original-price">${item.original_price}</span>
                <span class="discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="btn-container">
                <button class="btn-add-tag" onclick="addToBag(${item.id})">Add to Bag</button>
                <button class="btn-add-tag" onclick="addToWish(${item.id})">Add to Wish</button>
            </div>
        </div>`;
    });
    
    itemsContainerElement.innerHTML = innerHTML;
}
