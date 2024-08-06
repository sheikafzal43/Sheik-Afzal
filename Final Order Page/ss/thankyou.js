document.addEventListener("DOMContentLoaded", function() {
    // Set delivery date from localStorage
    const deliveryDate = localStorage.getItem('deliveryDate');
    document.getElementById('deliveryDate').innerText = deliveryDate ? `Your order will be delivered on ${deliveryDate}.` : 'Your order will be delivered soon.';
});
