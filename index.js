import { menuArray } from "./data.js";

const sectionEl = document.getElementById("item");
const orderedItemsContainer = document.getElementById("ordered-items");
const totalPriceContainer = document.getElementById("total-price");
const completeOrderBtn = document.getElementById("complete-order-btn");
const carddetailsEl = document.getElementById("card-details");
const confirmOrderMsg = document.getElementById("items-ordered");
// form elements
const cardFormEl = document.getElementById("card-form");
const formInputNameEl = document.getElementById("name");
const formInputNumberEl = document.getElementById("card-number");
const formInputCVVEl = document.getElementById("card-cvv");

function displayMenuItems(items) {
  items.forEach((item) => {
    const divEl = document.createElement("div");
    divEl.classList.add("item");
    divEl.classList.add("border-bottom");

    // Get item unique identifier
    const datasetId = (divEl.dataset.itemId = item.id);

    divEl.innerHTML = `
            <img class="item-image" src="${item.image}" alt="pizza" />
            <div class="item-description">
                <h3>${item.name}</h3>
                <p>${item.ingredients.join(", ")}</p>
                <h4>Ksh ${item.price}</h4>
            </div>
            <img class="item-add-icon" src="assets/add.png" alt="add icon" />
        `;

    divEl.addEventListener("click", (e) => {
      addOrderedItem(item);
    });

    sectionEl.appendChild(divEl);
  });

  updateCompleteOrderBtnVisibility();
}

function addOrderedItem(item) {
  // Create a new div for the ordered item
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("ordered-item");
  itemDiv.innerHTML = `
      <h3 class="item-name">${item.name}</h3>
      <h4 class="item-price">Ksh ${item.price}</h4>
      <img class="item-delete-icon" src="assets/delete.png" alt="delete icon" style='width: 30px;' />
 `;

  // Append the new item to the ordered items container
  orderedItemsContainer.appendChild(itemDiv);

  // Attach an event listener to the remove button
  itemDiv
    .querySelector(".item-delete-icon")
    .addEventListener("click", function () {
      // Remove the ordered item from the container
      orderedItemsContainer.removeChild(itemDiv);

      // Recalculate and update the total price
      const totalPrice = calculateTotalPrice();
      // totalPriceContainer.innerHTML = `<h4>Total Price: Ksh ${totalPrice}</h4>`;
      totalPriceContainer.innerHTML = ''
      updateCompleteOrderBtnVisibility();
    });

  // Calculate and update the total price
  const totalPrice = calculateTotalPrice();
  totalPriceContainer.innerHTML = `<h4>Total Price: Ksh ${totalPrice}</h4>`;

  updateCompleteOrderBtnVisibility();
}

function calculateTotalPrice() {
  let total = 0;
  const orderedItems =
    orderedItemsContainer.getElementsByClassName("ordered-item");
  for (let i = 0; i < orderedItems.length; i++) {
    const price = parseFloat(
      orderedItems[i].querySelector("h4").textContent.replace("Ksh ", "")
    );
    total += price;
  }
  return total;
}

displayMenuItems(menuArray);

// Opening Payment Wallent
completeOrderBtn.addEventListener("click", () => {
  if (orderedItemsContainer.hasChildNodes()) {
    carddetailsEl.classList.add("card-details-display");
  } else {
    alert("Please add items to your order before completing it.");
  }
});

// form functionality
// validate form inputs
function validateInputs() {
  // Name validation
  const name = formInputNameEl.value;
  if (!/^[A-Z][a-z]{4,}$/.test(name)) {
    alert(
      "Name must start with an uppercase letter and contain at least 5 alphabetical letters."
    );
    return false;
  }

  // Number validation
  const number = formInputNumberEl.value;
  if (!/^\d{10}$/.test(number)) {
    alert("Card number must contain exactly 10 digits.");
    return false;
  }

  // CVV validation
  const cvv = formInputCVVEl.value;
  if (!/^\d{3}$/.test(cvv)) {
    alert("CVV must contain exactly 3 digits.");
    return false;
  }

  return true;
}
// always remember to listen for submit button events in form elements
cardFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  // Assuming form validation is handled elsewhere or by HTML5 validation attributes
  // Validate inputs
  if (!validateInputs()) {
    return; // Exit if validation fails
  }
  // Clear the ordered items container
  while (orderedItemsContainer.firstChild) {
    orderedItemsContainer.removeChild(orderedItemsContainer.firstChild);
  }

  // Reset the total price
  // totalPriceContainer.innerHTML = `<h4>Total Price: Ksh 0</h4>`;
  totalPriceContainer.innerHTML = "";
  completeOrderBtn.style.color = "#ffffff";
  completeOrderBtn.style.backgroundColor = "#0e0a09";
  completeOrderBtn.textContent = "Order Confirmed";
  // emoji test
  const emoji = document.createElement("span");
  emoji.textContent = "Confirmed, check you email for a tracking number."; // Success emoji
  emoji.style.position = "absolute";
  emoji.style.top = "0";
  emoji.style.left = "50%";
  emoji.style.transform = "translateX(-50%)";
  emoji.style.fontSize = "20px";
  emoji.style.color = "green";
  completeOrderBtn.appendChild(emoji);

  // Step 2: Apply CSS animation to move the emoji
  emoji.style.animation = "moveEmoji 3s forwards";
  emoji.style.animationFillMode = "forwards";

  // Define the @keyframes for the animation
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes moveEmoji {
      from { top: 0; }
      to { top: 80%; }
    }
 `;
  document.head.appendChild(style);

  // Step 3: Remove the emoji element after the animation
  setTimeout(() => {
    completeOrderBtn.removeChild(emoji);
  }, 3000); // Remove after 1 second

  // Display the message "Your order is on its way"
  orderedItemsContainer.innerHTML = `<h4 class='order-confirmation'>Thanks ${formInputNameEl.value} Your order is on its way!</h4>`;

  // Clear form inputs
  formInputNameEl.value = "";
  formInputNumberEl.value = "";
  formInputCVVEl.value = "";
  carddetailsEl.classList.remove("card-details-display");

  updateCompleteOrderBtnVisibility();

  setTimeout(function () {
    location.reload();
  }, 4000);
});


// control the order button
function updateCompleteOrderBtnVisibility() {
  // Check if there are any ordered items
  const hasOrderedItems = orderedItemsContainer.hasChildNodes();

  // Update the visibility and enabled state of the completeOrderBtn based on whether there are ordered items
  if (hasOrderedItems) {
    completeOrderBtn.style.display = "block";
    completeOrderBtn.disabled = false;
    // If there are ordered items, ensure the card details form is not displayed
    carddetailsEl.classList.remove("card-details-display");
  } else {
    completeOrderBtn.style.display = "none";
    completeOrderBtn.disabled = true;
    // If there are no ordered items, ensure the card details form is not displayed
    carddetailsEl.classList.remove("card-details-display");
  }
}
