
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
    updateAvailableCount();

    document.getElementById("booking-message").textContent =
    `${selectedSeat.id} has been successfully added to your cart! Price: ${selectedSeat.price} AZN.`;
    
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

    if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

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
    updateAvailableCount();
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

        seatElement.disabled = isInCart || isUnavailable;
    });
}


updateSeatAvailability();

function updateAvailableCount() {
    const availableCount = seats.filter(seat => {
        return seat.status !== "unavailable" &&
            !cart.some(item => item.id === seat.id);
    }).length;

    document.getElementById("available-count").textContent =
        `Available seats: ${availableCount}`;
}

updateAvailableCount();

function clearCart() {
    if (cart.length === 0) {
        return;
    }

    const confirmation = confirm("Are you sure you want to clear your cart?");

    if (!confirmation) {
        return;
    }

    cart.length = 0;
    document.getElementById("booking-message").textContent = "";

    updateSeatAvailability();
    saveCart();
    displayCart();
    updateAvailableCount();
}

document.getElementById("clear-cart").addEventListener("click", clearCart);
