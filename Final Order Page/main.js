document.addEventListener("DOMContentLoaded", () => {
    const addCartButtons = document.querySelectorAll(".add-cart");
    const orderItemsContainer = document.getElementById("order-items");
    const totalPriceElement = document.getElementById("total-price");
    const addFavoritesBtn = document.getElementById("add-favorites-btn");
    const applyFavoritesBtn = document.getElementById("apply-favorites-btn");

    let cart = [];
    let total = 0;

    addCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const productBox = button.closest(".product-box");
            const title = productBox.querySelector(".product-title").innerText;
            const price = parseFloat(productBox.querySelector(".price").innerText.replace("Rs", ""));
            const imgSrc = productBox.querySelector(".product-img").src;

            const existingItem = cart.find(item => item.title === title);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ title, price, imgSrc, quantity: 1 });
            }

            updateOrderSummary();
        });
    });

    function updateOrderSummary() {
        orderItemsContainer.innerHTML = "";
        total = 0;

        cart.forEach(item => {
            const row = document.createElement("tr");

            const imgCell = document.createElement("td");
            const img = document.createElement("img");
            img.src = item.imgSrc;
            img.alt = item.title;
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

        totalPriceElement.innerText = `Rs. ${total}`;
    }

    addFavoritesBtn.addEventListener("click", () => {
        localStorage.setItem("favouriteOrder", JSON.stringify(cart));
        alert("Order saved as favourite.");
    });

    applyFavoritesBtn.addEventListener("click", () => {
        const favouriteOrder = JSON.parse(localStorage.getItem("favouriteOrder"));
        if (favouriteOrder) {
            cart = favouriteOrder;
            updateOrderSummary();
        } else {
            alert("No favourite order found.");
        }
    });

    document.querySelector(".btn").addEventListener("click", () => {
        localStorage.setItem("currentOrder", JSON.stringify(cart));
        localStorage.setItem("totalAmount", `Rs. ${total}`);
        window.location.href = "./ss/payment.html";
    });
});
