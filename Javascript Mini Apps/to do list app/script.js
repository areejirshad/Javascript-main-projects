const item = document.querySelector('#item');
const toDoBox = document.querySelector("#to-do-box");
let data = [];

// Function to save to-do items in local storage
const saveList = () => {
    const listItems = document.querySelectorAll('#to-do-box li');
    data = [];
    
    // Add each li's text content and its completed state to the data array
    listItems.forEach((li) => {
        data.push({
            text: li.textContent.replace('×', '').trim(),
            completed: li.classList.contains('do')
        });
    });

    // Save data to local storage or remove it if empty
    if (data.length === 0) {
        localStorage.removeItem('listValues');
    } else {
        localStorage.setItem('listValues', JSON.stringify(data));
    }
};

// Function to create and display a new to-do item
const toDo = (text = '', completed = false) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${text}
                    <i class="fa-solid fa-xmark"></i>
                `;
    if (completed) {
        listItem.classList.add('do');
    }
    toDoBox.appendChild(listItem);

    // Toggle the "completed" state on click
    listItem.addEventListener("click", function () {
        listItem.classList.toggle('do');
        saveList();  // Save the state after toggling
    });

    // Remove item from both DOM and local storage when delete icon is clicked
    listItem.querySelector('i').addEventListener('click', function () {
        listItem.remove();
        saveList();  // Save the state after deletion
    });

    saveList();  // Save the updated list to local storage
};

// IIFE to load to-do items from local storage on page load
(function () {
    const listItemsFromStorage = JSON.parse(localStorage.getItem('listValues'));
    if (listItemsFromStorage) {
        listItemsFromStorage.forEach((item) => {
            toDo(item.text, item.completed);  // Pass the completed state
        });
    }
})();

// Add new to-do on pressing Enter
item.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && this.value.trim()) {
        toDo(this.value);
        this.value = '';  // Clear the input field
    }
});
