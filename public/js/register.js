// Get references to elements
const openModalBtn = document.getElementById('openModalBtn');
const dayModal = document.getElementById('dayModal');
const dayButtons = document.querySelectorAll('.day-button');
const selectAllBtn = document.getElementById('selectAllBtn');
const clearSelectionBtn = document.getElementById('clearSelectionBtn');
const saveDaysBtn = document.getElementById('saveDaysBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const selectedDaysDisplay = document.getElementById('selectedDaysDisplay');

// Create an array to store selected days
const selectedDays = [];

// Function to update the selected days display
function updateSelectedDaysDisplay() {
    if (selectedDays.length > 0) {
        selectedDaysDisplay.textContent = 'Selected Days: ' + selectedDays.join(', ');
    } else {
        selectedDaysDisplay.textContent = '';
    }
}

// Function to open the modal
function openModal() {
    dayModal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    dayModal.style.display = 'none';
}

// Function to handle a day button click
function handleDayButtonClick(button) {
    button.classList.toggle('selected-button');
    const day = button.dataset.day;

    if (button.classList.contains('selected-button')) {
        selectedDays.push(day);
    } else {
        const index = selectedDays.indexOf(day);
        if (index !== -1) {
            selectedDays.splice(index, 1);
        }
    }

    updateSelectedDaysDisplay();
}

// Event listeners

document.addEventListener('DOMContentLoaded', () => {
    dayButtons.forEach((button) => {
        button.addEventListener('click', () => {
            handleDayButtonClick(button);
        });
    });
});

openModalBtn.addEventListener('click', () => {
    openModal();
});

closeModalBtn.addEventListener('click', () => {
    closeModal();
});


saveDaysBtn.addEventListener('click', () => {
    alert('Selected Days: ' + selectedDays.join(', '));
    closeModal();
});


// Event listener for the "Clear Selection" button inside the modal
document.getElementById('clearSelectionBtn').addEventListener('click', () => {
    // Clear the selected days array
    selectedDays.length = 0;

    // Update the display to reflect the cleared selection
    updateSelectedDaysDisplay();

    // Deselect all day buttons
    dayButtons.forEach((button) => {
        button.classList.remove('selected-button');
    });
});

// Initialize the selected days display
updateSelectedDaysDisplay();
