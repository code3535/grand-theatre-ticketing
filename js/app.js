
const venueMap = document.getElementById("venue-map");
const seatDetails = document.getElementById("seat-details");
const addToCartButton = document.getElementById("add-to-cart");

let selectedSeat = null;

function displaySeats() {
    sections.forEach(section => {
        const sectionElement = document.createElement("div");
        sectionElement.classList.add("seat-section");
        sectionElement.dataset.section = section.name;

        const title = document.createElement("h3");
        title.textContent = `${section.name} - ${section.price} AZN`;
        sectionElement.appendChild(title);

        const sectionSeats = seats.filter(
            seat => seat.section === section.name
        );

        for (let row = 0; row < section.rows; row++) {
            const rowElement = document.createElement("div");
            rowElement.classList.add("seat-row");

            const rowSeats = sectionSeats.filter(
                seat => seat.row === String.fromCharCode(65 + row)
            );

            rowSeats.forEach(seat => {
                const seatElement = document.createElement("button");

                seatElement.classList.add("seat", section.color);
                seatElement.textContent = seat.number;
                seatElement.dataset.seatId = seat.id;
                seatElement.title = `${seat.id} - ${seat.price} AZN`;

                if (seat.status === "unavailable") {
                    seatElement.classList.add("unavailable");
                    seatElement.disabled = true;
                }

                seatElement.addEventListener("click", () => {
                    selectSeat(seat, seatElement);
                });

                rowElement.appendChild(seatElement);
            });

            sectionElement.appendChild(rowElement);
        }

        venueMap.appendChild(sectionElement);
    });
}

function selectSeat(seat, seatElement) {
    document.querySelectorAll(".seat.selected").forEach(element => {
        element.classList.remove("selected");
    });

    selectedSeat = seat;
    seatElement.classList.add("selected");

    seatDetails.innerHTML = `
        <p><strong>Seat:</strong> ${seat.id}</p>
        <p><strong>Section:</strong> ${seat.section}</p>
        <p><strong>Row:</strong> ${seat.row}</p>
        <p><strong>Seat number:</strong> ${seat.number}</p>
        <p><strong>Price:</strong> ${seat.price} AZN</p>
    `;

    addToCartButton.disabled = false;
}

displaySeats();



let zoomLevel = 1;
let panX = 0;
let panY = 0;

const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");
const zoomResetButton = document.getElementById("zoom-reset");

function updateZoom() {
    venueMap.style.transform =
        `translate(${panX}px, ${panY}px) scale(${zoomLevel})`;
}

zoomInButton.addEventListener("click", () => {
    if (zoomLevel < 1.5) {
        zoomLevel += 0.1;
        updateZoom();
    }
});


zoomOutButton.addEventListener("click", () => {
    if (zoomLevel > 0.6) {
        zoomLevel -= 0.1;
        updateZoom();
    }
});

zoomResetButton.addEventListener("click", () => {
    zoomLevel = 1;
    panX = 0;
    panY = 0;
    updateZoom();
});



document.getElementById("pan-up").addEventListener("click", () => {
    panY -= 30;
    updateZoom();
});

document.getElementById("pan-down").addEventListener("click", () => {
    panY += 30;
    updateZoom();
});

document.getElementById("pan-left").addEventListener("click", () => {
    panX -= 30;
    updateZoom();
});

document.getElementById("pan-right").addEventListener("click", () => {
    panX += 30;
    updateZoom();
});
