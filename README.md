# Cart-Menu Web App

## Features

### Menu Display

- The app displays a list of menu items, each with an image, name, ingredients, and price.
- Users can click on an item to add it to their cart.

### Cart Management

- Users can add items to their cart by clicking on them.
- Items in the cart display their name and price.
- Users can remove items from their cart by clicking on a delete icon next to each item.
- The total price of the items in the cart is displayed and updated in real-time as items are added or removed.

### Order Completion

- Users can complete their order by clicking a "Complete Order" button.
- If the cart is empty, an alert prompts the user to add items before completing the order.
- Upon completing the order, a payment form is displayed for the user to enter their payment details.

### Payment Form

- The payment form includes fields for the user's name, card number, and CVV.
- The form validates the input to ensure the name starts with an uppercase letter and contains at least 5 alphabetical letters, the card number contains exactly 10 digits, and the CVV contains exactly 3 digits.
- Upon successful form submission, the order is confirmed, and a success message is displayed.

### Order Confirmation

- After completing the order, a confirmation message is displayed, thanking the user and indicating that their order is on its way.
- The cart is cleared, and the user is prompted to check their email for a tracking number.

### Animations and Visual Feedback

- The app includes CSS animations for visual feedback, such as moving an emoji to indicate a successful order.
- The "Complete Order" button's visibility and enabled state are dynamically updated based on whether there are items in the cart.

## Technical Details

- The app uses JavaScript for DOM manipulation and event handling.
- It imports menu items from a `data.js` file.
- The app uses the `fetch` API to retrieve menu items and dynamically updates the DOM to display them.
- It uses regular expressions for input validation in the payment form.
- CSS is used for styling, including animations for visual feedback.

## Getting Started

To run this app, ensure you have a modern web browser and clone the repository. Open the `index.html` file in your browser to start using the cart-menu web app.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Video Demo

[Watch the Video Demo](https://youtu.be/QjqM2UsSfU0)
