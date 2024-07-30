document.addEventListener("DOMContentLoaded", function() {
    // Retrieve and display the total amount
    let totalAmount = localStorage.getItem('totalAmount');
    document.getElementById('totalAmount').innerText = totalAmount ? totalAmount : "Rs.0.00";

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
