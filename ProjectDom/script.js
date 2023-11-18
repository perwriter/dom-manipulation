// Get references to HTML elements
var form = document.getElementById("addForm"); // Reference to the form element
var itemList = document.getElementById("items"); // Reference to the list element
var filter = document.getElementById("filter"); // Reference to the filter input element

// Retrieve items from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  var storedItems = JSON.parse(localStorage.getItem("items")) || [];
  // Populate the list with stored items
  storedItems.forEach(function (storedItem) {
    addItemToList(storedItem);
  });
});

// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);
// Filter event
filter.addEventListener("keyup", filterItems);

// Add item
function addItem(e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get input value
  var newItem = document.getElementById("item").value;

  // Add item to the list
  addItemToList(newItem);

  // Clear input field after adding item
  document.getElementById("item").value = "";
}

// Function to add item to the list
function addItemToList(newItem) {
  // Create new li element
  var li = document.createElement("li");
  // Add class
  li.className = "list-group-item";
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));

  // Create delete button element
  var deleteBtn = document.createElement("button");

  // Add classes to delete button
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";

  // Append text node to delete button
  deleteBtn.appendChild(document.createTextNode("X"));

  // Append delete button to li
  li.appendChild(deleteBtn);

  // Append li to list
  itemList.appendChild(li);

  // Save the updated list to local storage
  saveToLocalStorage();
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);

      // Save the updated list to local storage after removing an item
      saveToLocalStorage();
    }
  }
}

// Filter Items
function filterItems(e) {
  // Convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get list items
  var items = itemList.getElementsByTagName("li");

  // Convert to an array and iterate through each item
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    // Check if the item's name contains the filter text
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block"; // Display the item
    } else {
      item.style.display = "none"; // Hide the item
    }
  });
}

// Function to save the current list to local storage
function saveToLocalStorage() {
  var items = Array.from(itemList.getElementsByTagName("li")).map(function (
    item
  ) {
    return item.firstChild.textContent;
  });

  // Save the items to local storage as a JSON string
  localStorage.setItem("items", JSON.stringify(items));
}
