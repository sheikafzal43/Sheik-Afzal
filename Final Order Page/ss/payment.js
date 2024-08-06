document.addEventListener("DOMContentLoaded", function() {
    // Retrieve and display the total amount
    let totalAmount = localStorage.getItem('totalAmount');
    let totalAmountElement = document.getElementById('totalAmount');
    if (totalAmountElement) {
        totalAmountElement.innerText = totalAmount ? totalAmount : "Rs.0.00";
    }

    // Retrieve and display the order items
    let cart = JSON.parse(localStorage.getItem('currentOrder'));
    const orderItemsContainer = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");
    let total = 0;

    if (cart && orderItemsContainer) {
        cart.forEach(item => {
            const row = document.createElement("tr");

            const imgCell = document.createElement("td");
            const img = document.createElement("img");
            img.src = item.imgSrc;
            img.alt = item.title;
            img.style.maxWidth = "50px"; // Adjust the size as needed
            imgCell.appendChild(img);
            row.appendChild(imgCell);

            const titleCell = document.createElement("td");
            titleCell.innerText = `${item.quantity} x ${item.title}`;
            row.appendChild(titleCell);

            const priceCell = document.createElement("td");
            priceCell.innerText = `Rs ${item.price * item.quantity}`;
            row.appendChild(priceCell);

            orderItemsContainer.appendChild(row);

            total += item.price * item.quantity;
        });

        if (totalPriceElement) {
            totalPriceElement.innerText = `Rs. ${total}`;
        }
    }

    // Add submit event listener to the payment form
    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Check if all fields are filled
        const fields = document.querySelectorAll('#paymentForm input');
        let allFilled = true;
        fields.forEach(field => {
            if (!field.value) {
                allFilled = false;
            }
        });

        if (allFilled) {
            // Calculate delivery date (e.g., add 7 days)
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 7);
            const formattedDate = deliveryDate.toDateString();

            // Save delivery date to localStorage and redirect to confirmation page
            localStorage.setItem('deliveryDate', formattedDate);
            window.location.href = 'thankyou.html';
        } else {
            alert("Please fill in all fields.");
        }
    });
});
