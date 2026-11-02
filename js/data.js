const sections = [
    {
        name: "VIP",
        rows: 4,
        seatsPerRow: 10,
        price: 80,
        color: "vip"
    },
    {
        name: "Premium",
        rows: 6,
        seatsPerRow: 12,
        price: 50,
        color: "premium"
    },
    {
        name: "Standard",
        rows: 8,
        seatsPerRow: 14,
        price: 30,
        color: "standard"
    }
];

const seats = [];


sections.forEach(section => {

    for (let row = 0; row < section.rows; row++) {

        for (let number = 1; number <= section.seatsPerRow; number++) {

            const seat = {
                id: `${section.name}-${String.fromCharCode(65 + row)}-${String(number).padStart(2, "0")}`,
                section: section.name,
                row: String.fromCharCode(65 + row),
                number: number,
                price: section.price,
                status: "available"
            };

            seats.push(seat);
        }
    }
});


seats.find(seat => seat.id === "VIP-A-03").status = "unavailable";
seats.find(seat => seat.id === "Premium-B-05").status = "unavailable";
seats.find(seat => seat.id === "Standard-C-08").status = "unavailable";

console.log("Sections:", sections);
console.log("Total seats:", seats.length);
console.log("All seats:", seats);
