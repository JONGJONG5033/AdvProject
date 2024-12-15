// script.js for sidebar menu
document.getElementById('toggleButton').addEventListener('click', function () {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.right = sidebar.style.right === "-250px" ? "0" : "-250px";
});

// Close sidebar when clicking the close button
document.getElementById('closeButton').addEventListener('click', function () {
    var sidebar = document.getElementById('sidebar');
    sidebar.style.right = "-250px";
});

// Close sidebar when clicking outside of it
document.addEventListener('click', function (event) {
    var sidebar = document.getElementById('sidebar');
    var toggleButton = document.getElementById('toggleButton');
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
        sidebar.style.right = "-250px";
    }
});

// Add to Cart and Add to Favorite Icon
const cartIcons = document.querySelectorAll('.cart-icon');
const favoritesIcons = document.querySelectorAll('.favorites-icon');
cartIcons.forEach(cartIcon => {
    cartIcon.addEventListener('click', function () {
        cartIcon.src = cartIcon.src.includes('Cart.png') ? 'Cart2.png' : 'Cart.png';
    });
});

favoritesIcons.forEach(favoritesIcon => {
    favoritesIcon.addEventListener('click', function () {
        favoritesIcon.src = favoritesIcon.src.includes('Favorite.png') ? 'Favorite2.png' : 'Favorite.png';
    });
});

// Add to Favorites Functionality
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to update localStorage
function updateFavoritesStorage() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Restore favorites icon state on page load
favoritesIcons.forEach((favoritesIcon, index) => {
    const productName = document.querySelectorAll('.card-title')[index].innerText; // Use product name as identifier

    // Check if the product is in the favorites list
    const isFavorited = favorites.some(item => item.name === productName);

    // Update the icon state
    favoritesIcon.src = isFavorited ? 'Favorite2.png' : 'Favorite.png';

    // Add click event listener
    favoritesIcon.addEventListener('click', function () {
        const productImage = document.querySelectorAll('.card-img-top')[index].src;
        const productPrice = document.querySelectorAll('.price-box')[index].innerText;

        // Check if the product is already in the favorites list
        const existingItemIndex = favorites.findIndex(item => item.name === productName);

        if (existingItemIndex !== -1) {
            // Product exists, remove it from favorites
            favorites.splice(existingItemIndex, 1);
            favoritesIcon.src = 'Favorite.png'; // Update icon
            alert(`${productName} has been removed from your favorites!`);
        } else {
            // Product does not exist, add it to favorites
            favorites.push({ name: productName, image: productImage, price: productPrice });
            favoritesIcon.src = 'Favorite2.png'; // Update icon
            alert(`${productName} has been added to your favorites!`);
        }

        updateFavoritesStorage(); // Save updated list to localStorage
    });
});

// Initialize cart, totalItems, and totalCost from localStorage if available
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalItems = parseInt(localStorage.getItem("totalItems")) || 0;
let totalCost = parseFloat(localStorage.getItem("totalCost")) || 0;

// Fetch the address from localStorage
let address = localStorage.getItem("address") || "[Address not set]";

function showCheckoutAlert() {
    // Fetch the updated address from localStorage (in case it was updated)
    const address = localStorage.getItem("userAddress") || "[Address not set]";

    // Check if the address exists in localStorage
    if (address !== "[Address not set]") {
        alert(
            `Thank you for shopping! Your ${totalItems} items will be delivered to ${address} by tomorrow.\n` +
            `Please prepare ${totalCost.toLocaleString('en-US', { style: 'currency', currency: 'PHP' })}.`
        );
    } else {
        alert("Please provide a delivery address to proceed with the checkout.");
    }
}



// Update cart display on page load
updateCartDisplay();

// Function to update the cart display and save to localStorage
function updateCartDisplay() {
    cartItems.innerHTML = ''; // Clear the current items
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `${item.name} - ${item.price.toLocaleString()} PHP`; // Format price with commas
        cartItems.appendChild(itemDiv);
    });
    totalProducts.innerText = totalItems;
    totalPrice.innerText = totalCost.toLocaleString(); // Format total cost with commas

    // Save updated cart data to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalItems", totalItems);
    localStorage.setItem("totalCost", totalCost);
}

// Function to add item to the cart
function addToCart(image, name, price) {
    cart.push({ image, name, price });
    totalItems += 1;
    totalCost += price;
    updateCartDisplay();
}

// Event listeners for opening and closing the sidebar
openRightbar.addEventListener("click", function (event) {
    event.preventDefault();
    rightbar.style.width = "250px";
});

closeRightbar.addEventListener("click", function () {
    rightbar.style.width = "0";
});

// Remove all items from the cart
removeAll.addEventListener("click", function () {
    cart = [];
    totalItems = 0;
    totalCost = 0;
    updateCartDisplay();
});

// Add/Remove item on cart-icon click
const cartIcon = document.querySelectorAll('.cart-icon');

cartIcon.forEach((icon, index) => {
    icon.addEventListener("click", function () {
        const productName = document.querySelectorAll('.card-title')[index].innerText; // Get product name
        const productPrice = parseFloat(
            document.querySelectorAll('.price-box')[index].innerText.replace(/,/g, '').replace(" PHP", "") // Remove commas and " PHP"
        );

        // Check if the item is already in the cart
        const existingItemIndex = cart.findIndex(item => item.name === productName);

        if (existingItemIndex !== -1) {
            // Item exists, remove it from the cart
            cart.splice(existingItemIndex, 1);
            totalItems -= 1;
            totalCost -= productPrice;
            updateCartDisplay();
            alert(`${productName} has been removed from the cart!`); // Alert message for removal
        } else {
            // Item does not exist, add it to the cart
            addToCart(icon.src, productName, productPrice);
            alert(`${productName} has been added to the cart!`); // Alert message for addition
        }
    });
});

// Search bar functionality
const searchInput = document.getElementById('searchInput');
const suggestionsContainer = document.getElementById('suggestionsContainer');

const productData = {
    Backtab: {
        products: ['Lat Pulldown Machine', 'T Bar Row', 'Hyperextension Bench', 'Cable Row Machine', 'Seated Row Machine', 'Pullover Machine'],
        page: 'Backtab.html' // payts nani
    },
    Armstab: {
        products: ['Hexagonal Dumbbell', 'Trax Strengh Pull-up', 'Cable Stations', 'Barbell 45-Pound Set', 'Kettlebell', 'Wall Mounted Chin-up Bar'],
        page: 'Armstab.html'// payts nani
    },
    Chesttab: {
        products: ['Push-up Bracket Board Portable', 'Chest Smith', 'Power Twister Bar Chest Builder', 'Weight Bench Barbell Rack Adjustable', 'Kettlebell', 'Push Up Bars Stand Grip (Paralletes)'],
        page: 'Chesttab.html' // payts nani
    },
    Coretab: {
        products: ['Exercise Mat', 'Yoga Ball', 'Ab Wheel Roller', 'ABS Workout Equipment', 'Jump Rope Cable', 'Core Hammer'],
        page: 'Coretab.html' // payts nani
    },
    Legstab: {
        products: ['Leg Press Machine', 'Leg Extension Machine', 'Plyometric Box', 'Squat Machine', 'Jump Rope Cable', 'Calf Raise Machine'],
        page: 'Legstab.html' // payts nani
    }
};

const allProducts = Object.entries(productData).flatMap(([tab, { products, page }]) =>
    products.map(product => ({ title: product, page }))
);

searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase().trim();
    suggestionsContainer.innerHTML = ''; 

    if (query) {
        const filteredProducts = allProducts.filter(({ title }) => title.toLowerCase().includes(query));

        filteredProducts.forEach(({ title, page }) => {
            const suggestion = document.createElement('div');
            suggestion.classList.add('suggestion');
            suggestion.textContent = title;
            suggestionsContainer.appendChild(suggestion);

            suggestion.addEventListener('click', function () {
                window.location.href = page; 
            });
        });
    }
});

// Close the suggestions container when clicking outside of it
document.addEventListener('click', function (event) {
    if (!searchInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        suggestionsContainer.innerHTML = ''; 
    }
});

    // Check if a user is logged in (username stored in localStorage)
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData && storedData.username) {
        // Update the Profile-Name in the sidebar
        const profileNameElement = document.getElementById("profileName");
        profileNameElement.textContent = storedData.username;
    }

    // Select all dropdown elements
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
        const menu = dropdown.querySelector('.dropdown-menu');
    
        // Add event listener for dropdown opening
        dropdown.addEventListener('show.bs.dropdown', () => {
            menu.classList.add('show'); // Trigger the animation
        });
    
        // Add event listener for dropdown closing
        dropdown.addEventListener('hide.bs.dropdown', () => {
            menu.classList.remove('show'); // Reset animation state
        });
    });

// Get elements
const profileContainer = document.getElementById('profileContainer');
const popover = document.getElementById('popover');
const popoverUsername = document.getElementById('popoverUsername');
const popoverSex = document.getElementById('popoverSex');
const popoverAddress = document.getElementById('popoverAddress');
const editableFields = document.getElementById('editableFields');
const editButton = document.getElementById('editButton');
const saveEditsButton = document.getElementById('saveEdits');
const editSex = document.getElementById('editSex');
const editAddress = document.getElementById('editAddress');

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedSex = localStorage.getItem('userSex');
    const storedAddress = localStorage.getItem('userAddress');

    popoverSex.textContent = storedSex ? storedSex : '[Not Set]';
    popoverAddress.textContent = storedAddress ? storedAddress : '[Not Set]';
});

// Prompt the user to set their sex
popoverSex.addEventListener('click', () => {
    let input = '';
    const validOptions = ['Male', 'Female', 'Others'];

    // Loop until the user provides valid input or cancels
    while (true) {
        input = prompt('Please enter your sex (Male, Female, Others):');

        // Break if the user cancels the prompt
        if (input === null) break;

        // Check if the input is valid
        if (validOptions.includes(input.trim())) {
            popoverSex.textContent = input.trim();
            localStorage.setItem('userSex', input.trim()); // Save to localStorage
            break;
        } else {
            alert('Invalid input. Please enter Male, Female, or Others.');
        }
    }
});


// Store the address in localStorage when updated
popoverAddress.addEventListener('click', () => {
    const input = prompt('Please enter your address:');
    if (input !== null && input.trim() !== '') {
        // Store the address in localStorage under "userAddress"
        localStorage.setItem("userAddress", input.trim());
        popoverAddress.textContent = input.trim();
    }
});


// Hide the popover when clicking outside it
document.addEventListener('click', (event) => {
    if (!profileContainer.contains(event.target) && !popover.contains(event.target)) {
        popover.style.display = 'none';
    }
});
// Add a click event to the profile container
profileContainer.addEventListener('click', () => {
    // Get user data dynamically (replace with actual data fetching if needed)
    const username = document.getElementById('profileName').textContent;

    // Set the popover fields
    popoverUsername.textContent = username;

    // Show the popover
    popover.style.display = 'block';
});

// Show editable fields when "Edit" is clicked
editButton.addEventListener('click', () => {
    editableFields.style.display = 'block'; // Show editable fields
    editButton.style.display = 'none'; // Hide edit button

    // Prepopulate the fields with current values
    editSex.value = popoverSex.textContent !== "[Not Set]" ? popoverSex.textContent : "Male";
    editAddress.value = popoverAddress.textContent !== "[Not Set]" ? popoverAddress.textContent : "";
});
// Save changes and update displayed values
saveEditsButton.addEventListener('click', () => {
    // Update "Sex" and "Address" values
    const sexValue = editSex.value;
    const addressValue = editAddress.value;

    popoverSex.textContent = sexValue;
    popoverAddress.textContent = addressValue !== "" ? addressValue : "[Not Set]";

    // Save updated values to localStorage
    localStorage.setItem('userSex', sexValue);
    localStorage.setItem('userAddress', addressValue);

    // Hide editable fields and show the edit button again
    editableFields.style.display = 'none';
    editButton.style.display = 'inline-block';
});

// Ensure the popover is hidden on page load
document.addEventListener('DOMContentLoaded', () => {
    const popover = document.getElementById('popover');
    popover.style.display = 'none';
});

