// Get references to HTML elements
var form = document.getElementById("addRecord"); // Reference to the form element
var itemList = document.getElementById("list"); // Reference to the list element
var filter = document.getElementById("filter"); // Reference to the filter input element

// Retrieve items from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  var storedRecords = JSON.parse(localStorage.getItem("records")) || [];
  // Populate the list with stored records
  storedRecords.forEach(function (storedRecord) {
    addRecordToList(storedRecord);
  });
});

// Form submit event
form.addEventListener("submit", addRecord);
// Delete event
itemList.addEventListener("click", removeRecord);
// Filter event
filter.addEventListener("keyup", filterRecords);

// Add record
function addRecord(e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get input values
  var cowName = document.getElementById("cow").value;
  var liters = document.querySelector(".Liters").value;
  var date = document.getElementById("date").value;
  var time = document.getElementById("time").value;

  // Add record to the list
  addRecordToList({ cowName, liters, date, time });

  // Clear form inputs after adding record
  document.getElementById("cow").value = "Kairetu"; // You may set a default value
  document.querySelector(".Liters").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";

  // Save the updated list to local storage
  saveToLocalStorage();
}

// Function to add record to the list
function addRecordToList(record) {
  // Create new li element
  var li = document.createElement("li");
  // Add class
  li.className = "list-group-item";
  // Add text node with record details
  li.appendChild(
    document.createTextNode(
      `${record.cowName} - ${record.liters} Liters on ${record.date} at ${record.time}`
    )
  );

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
}

// Remove record
function removeRecord(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);

      // Save the updated list to local storage after removing a record
      saveToLocalStorage();
    }
  }
}

// Filter Records
function filterRecords(e) {
  // Convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get list items
  var records = itemList.getElementsByTagName("li");

  // Convert to an array and iterate through each record
  Array.from(records).forEach(function (record) {
    var recordDetails = record.firstChild.textContent;
    // Check if the record details contain the filter text
    if (recordDetails.toLowerCase().indexOf(text) !== -1) {
      record.style.display = "block"; // Display the record
    } else {
      record.style.display = "none"; // Hide the record
    }
  });
}

// Function to save the current list to local storage
function saveToLocalStorage() {
  var records = Array.from(itemList.getElementsByTagName("li")).map(function (
    record
  ) {
    return record.firstChild.textContent;
  });

  // Save the records to local storage as a JSON string
  localStorage.setItem("records", JSON.stringify(records));
}

// Call updateRecordList on page load to populate the list from local storage
updateRecordList();
