let activityId = null;

document.addEventListener("DOMContentLoaded", function () {
    // Initially, show only the task container
    const taskContainer = document.querySelector(".activity-container:first-child"); // First activity container (Task)
    const ongoingActivitiesContainer = document.getElementById("ongoingActivitiesContainer");
    const addQuotationModal = document.getElementById("addQuotation-modal");

    // Hide the second and third containers initially
    ongoingActivitiesContainer.style.display = "none";
    addQuotationModal.style.display = "none";

    // Handle click on the task table row to show second container
    document.querySelectorAll(".clickable-row").forEach(row => {
        row.addEventListener("click", function () {
            // Show second container and hide first
            taskContainer.style.display = "none";
            ongoingActivitiesContainer.style.display = "block";
            activityId = this.getAttribute('data-id');
            fetchActivityStatus(activityId);
        });
    });

    // When the click on the back button in the second container it goes back to the first container 'backBtn'
    function addBackButton(currentContainer, previousContainer) {
        // Check if a back button already exists in the current container
        if (!currentContainer.querySelector(".backBtn")) {
            const backButton = document.createElement("button");
            backButton.innerText = "Back";
            backButton.classList.add("backBtn");
            backButton.addEventListener("click", function () {
                currentContainer.style.display = "none";
                previousContainer.style.display = "block";
            });
            currentContainer.appendChild(backButton);
        }
    }

    // Handle click on the Back button in the second container
    document.getElementById("backBtn").addEventListener("click", function () {
        // Show first container and hide second
        taskContainer.style.display = "block";
        ongoingActivitiesContainer.style.display = "none";
    });


    // Handle click on the Add Quotation button to show third container
    document.getElementById("quotationBtn").addEventListener("click", function () {
        // Show third container and hide second
        ongoingActivitiesContainer.style.display = "none";
        addQuotationModal.style.display = "block";

        // Add Back button to return to second container
        addBackButton(addQuotationModal, ongoingActivitiesContainer);

        // Update the UI with the activity status
        document.querySelector('#taskId').innerText = ` Task ID - ${activityId}`;
    });

    // Increment and Decrement Function
    document.querySelectorAll(".qty-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");
            if (this.innerText === "-") {
                input.value = Math.max(0, parseInt(input.value) - 1);
            } else {
                input.value = parseInt(input.value) + 1;
            }
        });
    });

});

function fetchActivityStatus(activityId) {
    // Perform AJAX call to fetch bill details
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/AutoMobile Project/Mechanic/functions/task_actions.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                
                // Validate that the response contains the required fields
                if (response && response.activity_id && response.message && response.status) {
                    // Update the UI with the activity status
                    document.querySelector('.container-h2').innerText = ` Task ID - ${response.activity_id}`;
                    document.querySelector('.description').innerText = `${response.message}`;
                    
                    // Handle the status (you can add more timeline items dynamically if needed)
                    const timelineItems = document.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        item.classList.remove('active'); // Clear previous active classes
                        if (index === 0 && response.status === 'Started') {
                            item.classList.add('active');
                        } else if (index === 1 && response.status === 'Preparing Quotation') {
                            item.classList.add('active');
                        } else if (index === 2 && response.status === 'Quotation Sent') {
                            item.classList.add('active');
                        } else if (index === 3 && response.status === 'Service Scheduled') {
                            item.classList.add('active');
                        } else if (index === 4 && response.status === 'Service Completed') {
                            item.classList.add('active');
                        }
                    });
                } else {
                    console.error("Missing data in the response", response);
                }
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        }
    };
    xhr.send("activity_id=" + activityId);
}



// Search Suggestions and Row creation
document.querySelector('.search-bar input').addEventListener('input', function() {
    const query = this.value;
    clearSuggestions();

    if (query.length > 1) {
        fetch('functions/search_items.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `query=${encodeURIComponent(query)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                displaySuggestions(data);
            }
        });
    }
});

function displaySuggestions(suggestions) {
    const suggestionsBox = document.querySelector('.suggestions-box');
    suggestionsBox.innerHTML = ''; // Clear previous suggestions

    // Populate the suggestions box with new data
    suggestions.forEach(suggestion => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.textContent = suggestion.item_name;
        suggestionDiv.addEventListener('click', () => {
            document.querySelector('#searchBox').value = suggestion.item_name;
            suggestionsBox.style.display = 'none';
            // Call the add items to table function
            addItemToTable(suggestion.item_id, suggestion.item_name, suggestion.unit_price);
        });
        suggestionsBox.appendChild(suggestionDiv);
    });

    suggestionsBox.style.display = 'block'; // Show the suggestions box
}

function clearSuggestions() {
    const suggestionsBox = document.querySelector('.suggestions');
    if (suggestionsBox) suggestionsBox.remove();
}


function addItemToTable(itemId, itemName, itemPrice) {

    if (!itemId || !itemName || !itemPrice) {
        console.error("Error: Missing item data.");
        return;
    }

    // Ensure the table exists
    const tableBody = document.querySelector('.quotationstable tbody');
    if (!tableBody) {
        console.error("Table body not found");
        return;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${itemId}</td>
        <td>${itemName}</td>
        <td>
            <button class="qty-btn">-</button>
            <input type="number" value="1">
            <button class="qty-btn">+</button>
        </td>
        <td>${itemPrice}</td>
        <td><button class="delete-btn"><i class="fas fa-trash"></i></button></td>
    `;

    // Event listener to the delete button
    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        row.remove();
    });

    // Event listeners to the qty buttons for each row
    const qtyBtns = row.querySelectorAll(".qty-btn");
    qtyBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");
            if (this.innerText === "-") {
                input.value = Math.max(1, parseInt(input.value) - 1);
            } else {
                input.value = parseInt(input.value) + 1;
            }
        });
    });

    // Append the new row
    tableBody.appendChild(row);
    console.log("Row added to table");

    clearSuggestions();

}

// send quotations
document.getElementById("sendQuotationBtn").addEventListener("click", function () {
    const tableRows = document.querySelectorAll('.quotationstable tbody tr');
    const invoices = [];

    tableRows.forEach(row => {
        const itemId = row.children[0].innerText;
        const quantity = row.querySelector("input[type='number']").value;
        const unitPrice = row.children[3].innerText;

        invoices.push({
            item_id: itemId,
            quantity: quantity,
            unit_price: unitPrice
        });
    });

    // Prepare data for AJAX
    const data = {
        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        invoices: invoices,
        activity_id: activityId
    };

    // Send data to the server
    fetch('functions/send_invoice.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert("Quotation sent successfully!");
            // Optionally clear the table or perform other actions
        } else {
            alert("Error sending quotation: " + result.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
});