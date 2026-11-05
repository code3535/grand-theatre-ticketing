
const cart = JSON.parse(localStorage.getItem("theatreCart")) || [];

function saveCart() {
    localStorage.setItem("theatreCart", JSON.stringify(cart));
}

function addToCart() {
    if (selectedSeat === null) {
        return;
    }

    const alreadyAdded = cart.some(
        item => item.id === selectedSeat.id
    );

    if (alreadyAdded) {
        alert("This seat is already in your cart!");
        return;
    }

    cart.push(selectedSeat);
    updateSeatAvailability();

    saveCart();
    displayCart();

    selectedSeat = null;

    document.querySelectorAll(".seat.selected").forEach(element => {
        element.classList.remove("selected");
    });

    seatDetails.innerHTML = "<p>Select a seat to see its details.</p>";
    addToCartButton.disabled = true;
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <span>${item.id} - ${item.price} AZN</span>
            <button class="remove-button">Remove</button>
        `;

        const removeButton = cartItem.querySelector(".remove-button");

        removeButton.addEventListener("click", () => {
            removeFromCart(item.id);
        });

        cartItems.appendChild(cartItem);

        total += item.price;
    });

    totalPrice.textContent = `${total} AZN`;
}

function removeFromCart(seatId) {
    const index = cart.findIndex(item => item.id === seatId);

    if (index !== -1) {
        cart.splice(index, 1);
        updateSeatAvailability();
    }

    saveCart();
    displayCart();
}

addToCartButton.addEventListener("click", addToCart);

displayCart();


function updateSeatAvailability() {
    document.querySelectorAll(".seat").forEach(seatElement => {
        const seatId = seatElement.dataset.seatId;

        const isInCart = cart.some(item => item.id === seatId);

        const isUnavailable = seatElement.classList.contains("unavailable");

        if (isInCart) {
            seatElement.classList.add("in-cart");
        } else {
            seatElement.classList.remove("in-cart");
        }

        // Keep originally unavailable seats disabled
        seatElement.disabled = isInCart || isUnavailable;
    });
}


updateSeatAvailability();
